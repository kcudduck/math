#!/usr/bin/env node
/**
 * liberator_auto.js — repo-aware, zero-flag runner
 * TEXT + OCR fallback + PAGE IMAGES (PNG) + rasters[] in manifest
 *
 * Usage (no flags):
 *   node liberator_auto.js                 # scans repoRoot/papers recursively
 *   node liberator_auto.js <pdf|dir>       # process a single PDF or a directory
 *
 * Outputs per paper:
 *   liberated/<domain>/<docId>/<docId>.text.md
 *   liberated/<domain>/<docId>/<docId>.manifest.json (with rasters[])
 *   liberated/<domain>/<docId>/<docId>.pageNN.png
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const cp = require('child_process');

// ---------- shell helpers ----------
function sh(cmd){ return cp.execSync(cmd, {stdio:['ignore','pipe','pipe']}).toString().trim(); }
function trySh(cmd){ try { return sh(cmd); } catch { return ''; } }

// ---------- repo helpers ----------
function repoRoot(){ const r = trySh('git rev-parse --show-toplevel'); return r || process.cwd(); }
function branch(){ return trySh('git rev-parse --abbrev-ref HEAD') || 'main'; }
function ownerRepo(){
  const url = trySh('git remote get-url origin');
  const m = url.match(/github\.com[:\/]([^\/]+)\/([^\s]+?)(?:\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };
  return { owner: process.env.GH_OWNER || 'owner', repo: process.env.GH_REPO || 'repo' };
}
function repoRel(abs, root){ return '/' + path.relative(root, abs).replace(/\\/g,'/'); }

// ---------- fs helpers ----------
function isPdf(p){ return fs.existsSync(p) && fs.statSync(p).isFile() && p.toLowerCase().endsWith('.pdf'); }
function walkPdfs(root){
  const out=[];
  (function rec(p){
    const st = fs.statSync(p);
    if (st.isDirectory()) for (const f of fs.readdirSync(p)) rec(path.join(p,f));
    else if (isPdf(p)) out.push(p);
  })(root);
  return out;
}

// ---------- id + meta helpers ----------
function sha8(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0,8); }
function pagesOf(file){
  const pdfinfo = trySh('command -v pdfinfo');
  if (pdfinfo){
    const out = trySh(`pdfinfo ${JSON.stringify(file)}`);
    const m = out.match(/Pages:\s*(\d+)/i); if (m) return parseInt(m[1],10);
  }
  const txt = fs.readFileSync(file).toString('latin1');
  const n = (txt.match(/\/Type\s*\/Page\b/g)||[]).length - (txt.match(/\/Type\s*\/Pages\b/g)||[]).length;
  return Math.max(1, n);
}
function detectDomain(pdfAbs, root){
  const rel = repoRel(pdfAbs, root);
  const m = rel.match(/^\/papers\/(.+?)_p\d+\//); // papers/<domain>_pX/
  if (m) return m[1];
  return path.basename(root); // default to repo name
}

// ---------- ledger (sha -> docId) ----------
function ledgerPath(root){ return path.join(root, 'ledger.csv'); }
function ledgerLoad(root){
  const p = ledgerPath(root);
  const map = new Map();
  if (!fs.existsSync(p)) return map;
  const rows = fs.readFileSync(p,'utf8').split(/\r?\n/).filter(Boolean);
  for (const line of rows){
    const [sha, docId, domain] = line.split(',');
    if (sha && docId) map.set(sha, {docId, domain});
  }
  return map;
}
function ledgerAppend(root, sha, docId, domain){ fs.appendFileSync(ledgerPath(root), `${sha},${docId},${domain}\n`); }
function nextDocId(root, domain){
  const dir = path.join(root, 'liberated', domain);
  let maxN = 0;
  if (fs.existsSync(dir)){
    for (const name of fs.readdirSync(dir)){
      const m = name.match(new RegExp(`^${domain}_p(\\d+)$`));
      if (m) maxN = Math.max(maxN, parseInt(m[1],10));
    }
  }
  return `${domain}_p${maxN+1}`;
}

// ---------- content helpers ----------
function keyLine(docId, domain, sha, pagesCount, pdfRepoRel){
  return `KEY: ${docId} | ${domain} |  | ${sha} | ${pagesCount} | ${pdfRepoRel}`;
}
function pageHeading(docId, i){ return `\n\n<!-- PK PAGE ${i} doc=${docId} -->\n`; }

// Heuristic: wrap standalone math-like lines with $$ ... $$
function maybeWrapDisplayMath(line){
  const mathy = /[=∈≈≤≥±×÷∞∑∏∂∇∫√→←↦⊂⊆⊇⊃∘∧∨∀∃∴⇒⇔≡≠]+/;
  const looksEq = /\s=\s|\\\(|\\\)|\\\[|\\\]|\balpha\b|\bbeta\b|\bgamma\b|\btheta\b|\\frac|\\sum|\\int|\\partial/i;
  const long   = line.trim().length >= 5;
  if (!long) return line;
  if (mathy.test(line) || looksEq.test(line)) {
    if (/^\$\$[\s\S]*\$\$$/.test(line)) return line;
    return `$$\n${line}\n$$`;
  }
  return line;
}

function ensureTmpDir(){ return fs.mkdtempSync(path.join(os.tmpdir(), 'libauto-')); }
function cleanupDir(dir){ try { fs.rmSync(dir, {recursive:true, force:true}); } catch {} }

function extractPageText(pdfAbs, page){
  const cmd = `pdftotext -f ${page} -l ${page} -layout -enc UTF-8 ${JSON.stringify(pdfAbs)} -`;
  return trySh(cmd).replace(/\r/g,'');
}

function ocrPageText(pdfAbs, page, dpi=300, lang=process.env.OCR_LANG||'eng'){
  const tmp = ensureTmpDir();
  try {
    const prefix = path.join(tmp, `p${page}`);
    const ppmCmd = `pdftoppm -f ${page} -l ${page} -r ${dpi} -png ${JSON.stringify(pdfAbs)} ${JSON.stringify(prefix)}`;
    trySh(ppmCmd);
    const png = fs.readdirSync(tmp).find(f => f.startsWith(`p${page}`) && f.endsWith('.png'));
    if (!png) return '';
    const inPng = path.join(tmp, png);
    const outTxt = path.join(tmp, `p${page}.txt`);
    const tCmd = `tesseract ${JSON.stringify(inPng)} ${JSON.stringify(outTxt.replace(/\.txt$/,''))} -l ${lang} --psm 6`;
    trySh(tCmd);
    const txt = fs.existsSync(outTxt) ? fs.readFileSync(outTxt, 'utf8') : '';
    return txt.replace(/\r/g,'');
  } finally { cleanupDir(tmp); }
}

function extractTextByPageWithOcr(pdfAbs, docId, total){
  const chunks = [];
  let nonEmpty = false;
  let ocredCount = 0;
  for (let i=1;i<=total;i++){
    let page = extractPageText(pdfAbs, i);
    if (!page.trim()) { page = ocrPageText(pdfAbs, i); if (page.trim()) ocredCount++; }
    page = page.replace(/[ \t]+\n/g, '\n');
    page = page.replace(/([A-Za-z0-9])\-\n([A-Za-z0-9])/g, '$1$2');
    const plines = page.split(/\n/).map(s=>s.replace(/\s+$/,'')).filter(s=>s.length);
    const processed = plines.map(maybeWrapDisplayMath).join('\n');
    if (processed.trim()) nonEmpty = true;
    chunks.push(pageHeading(docId, i) + processed);
  }
  return { body: chunks.join('\n'), nonEmpty, ocredCount };
}

function rasterizeAllPages(pdfAbs, outDir, docId, dpi=parseInt(process.env.IMG_DPI||'200',10)){
  fs.mkdirSync(outDir, {recursive:true});
  const tmp = ensureTmpDir();
  try {
    const prefix = path.join(tmp, 'pg');
    const cmd = `pdftoppm -png -r ${dpi} ${JSON.stringify(pdfAbs)} ${JSON.stringify(prefix)}`;
    trySh(cmd);
    const pngs = fs.readdirSync(tmp).filter(f => f.startsWith('pg-') && f.endsWith('.png')).sort((a,b)=>{
      const na = parseInt(a.match(/-(\d+)\.png$/)[1],10);
      const nb = parseInt(b.match(/-(\d+)\.png$/)[1],10);
      return na-nb;
    });
    const outPaths = [];
    for (let idx=0; idx<pngs.length; idx++){
      const src = path.join(tmp, pngs[idx]);
      const pageNum = idx+1;
      const dst = path.join(outDir, `${docId}.page${String(pageNum).padStart(2,'0')}.png`);
      fs.copyFileSync(src, dst);
      outPaths.push(dst);
    }
    return outPaths;
  } finally { cleanupDir(tmp); }
}

function textMd(docId, key, body){
  return [
    'PKvNext Document','',key,
    `<!-- PK START doc=${docId} -->`,
    body.trimEnd(),
    `<!-- PK END doc=${docId} -->`,''
  ].join('\n');
}

function manifest(docId, sha, pagesCount, pdfRepoRel, rasters=[], ocrFiles=[]){
  return JSON.stringify({
    doc: docId,
    sha256: sha,
    pages: pagesCount,
    pdf: pdfRepoRel,
    generated: new Date().toISOString(),
    pk: { doc: docId, sha256: sha, pages: pagesCount },
    rasters: rasters.map(p => p.replace(/\\/g,'/').replace(/^.*\/liberated\//,'')),
    ocr: ocrFiles.map(p => p.replace(/\\/g,'/').replace(/^.*\/liberated\//,''))
  }, null, 2) + '\n';
}

function runOne(pdfAbs, ctx, urls){
  const { root, owner, repo, br } = ctx;
  const domain = detectDomain(pdfAbs, root);
  const sha = sha8(pdfAbs);
  const pagesCount = pagesOf(pdfAbs);
  const pdfRepoRel = repoRel(pdfAbs, root);

  const ledger = ledgerLoad(root);
  let docId = (ledger.get(sha)?.docId) || nextDocId(root, domain);
  const docDir = path.join(root, 'liberated', domain, docId);
  fs.mkdirSync(docDir, {recursive:true});

  const { body, nonEmpty, ocredCount } = extractTextByPageWithOcr(pdfAbs, docId, pagesCount);
  const rasterPaths = rasterizeAllPages(pdfAbs, docDir, docId);

  const key = keyLine(docId, domain, sha, pagesCount, pdfRepoRel);
  const text = textMd(docId, key, body);
  const mani = manifest(docId, sha, pagesCount, pdfRepoRel, rasterPaths, []);

  fs.writeFileSync(path.join(docDir, `${docId}.text.md`), text, 'utf8');
  fs.writeFileSync(path.join(docDir, `${docId}.manifest.json`), mani, 'utf8');
  if (!ledger.get(sha)) ledgerAppend(root, sha, docId, domain);

  const log = [
    `pdf=${repoRel(pdfAbs, root)}`,
    `pages=${pagesCount}`,
    `ocred_pages=${ocredCount}`,
    `rasters=${rasterPaths.length}`,
    `nonEmpty=${nonEmpty}`
  ].join('\n') + '\n';
  fs.writeFileSync(path.join(docDir, '.extract.log'), log, 'utf8');

  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${br}`;
  urls.push(base + repoRel(path.join(docDir, `${docId}.text.md`), root));
  urls.push(base + repoRel(path.join(docDir, `${docId}.manifest.json`), root));
}

function main(){
  const root = repoRoot();
  const { owner, repo } = ownerRepo();
  const br = branch();
  const arg = process.argv[2];
  const target = arg ? path.resolve(process.cwd(), arg) : path.join(root, 'papers');

  const pdfs = (fs.existsSync(target) && fs.statSync(target).isDirectory()) ? walkPdfs(target) : (isPdf(target) ? [target] : []);
  if (!pdfs.length){ console.error('No PDFs found.'); process.exit(1); }

  const urls = [];
  for (const pdf of pdfs) runOne(path.resolve(pdf), {root, owner, repo, br}, urls);

  const out = path.join(root, 'liberated', '.last_run_urls.txt');
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.writeFileSync(out, urls.join('\n') + '\n', 'utf8');
}

if (require.main === module) main();

