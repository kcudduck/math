#!/usr/bin/env node
/**
 * liberator_auto.js — repo-aware, zero-flag runner
 *
 * Inputs (implicit):
 *   - repoRoot/papers           (flat or with domain subdirs)
 *   - or a target path argument (PDF or directory)
 *
 * Outputs:
 *   - repoRoot/liberated/<domain>/<domain>_pN/<domain>_pN.text.md
 *   - repoRoot/liberated/<domain>/<domain>_pN/<domain>_pN.manifest.json
 *   (PDF stays where it is; KEY/manifest hold repo-root-absolute path)
 *
 * Rules:
 *   - domain =
 *       * if PDF is under papers/<domain>_pX/... : use that <domain>
 *       * else default to repo name
 *   - docId increments per domain: <domain>_p1, <domain>_p2, ...
 *   - re-use docId if same sha8 already ingested (ledger.csv)
 *   - page count via pdfinfo if available, else heuristic
 *   - quiet output: only write raw URLs of *newly created* docs to
 *       repoRoot/liberated/.last_run_urls.txt (read by lm_cli.js)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

function sh(cmd){ return cp.execSync(cmd, {stdio:['ignore','pipe','pipe']}).toString().trim(); }
function trySh(cmd){ try { return sh(cmd); } catch { return ''; } }
function repoRoot(){ const r = trySh('git rev-parse --show-toplevel'); return r || process.cwd(); }
function branch(){ return trySh('git rev-parse --abbrev-ref HEAD') || 'main'; }
function ownerRepo(){
  const url = trySh('git remote get-url origin');
  const m = url.match(/github\.com[:\/]([^\/]+)\/([^\s]+?)(?:\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };
  return { owner: process.env.GH_OWNER || 'owner', repo: process.env.GH_REPO || 'repo' };
}
function repoRel(abs, root){ return '/' + path.relative(root, abs).replace(/\\/g,'/'); }
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
function sha8(file){ return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0,8); }
function pages(file){
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
  // If under papers/<domain>_pX/... infer domain; else default to repo name
  const rel = repoRel(pdfAbs, root);
  const m = rel.match(/^\/papers\/(.+?)_p\d+\//);
  if (m) return m[1];
  return path.basename(root);
}
function ledgerPath(root){ return path.join(root, 'ledger.csv'); }
function ledgerLoad(root){
  const p = ledgerPath(root);
  const map = new Map(); // sha8 -> {docId, domain}
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
function keyLine(docId, domain, sha, pagesCount, pdfRepoRel){
  return `KEY: ${docId} | ${domain} |  | ${sha} | ${pagesCount} | ${pdfRepoRel}`;
}
function textMd(docId, key, body){
  return [
    'PKvNext Document',
    '',
    key,
    `<!-- PK START doc=${docId} -->`,
    body.trimEnd(),
    `<!-- PK END doc=${docId} -->`,
    ''
  ].join('\n');
}
function manifest(docId, sha, pagesCount, pdfRepoRel){
  return JSON.stringify({
    doc: docId,
    sha256: sha,
    pages: pagesCount,
    pdf: pdfRepoRel,
    generated: new Date().toISOString(),
    pk: { doc: docId, sha256: sha, pages: pagesCount }
  }, null, 2) + '\n';
}
function defaultBody(stem){ return `# ${stem.replace(/[_-]+/g,' ').trim()}\n\n(placeholder body)\n`; }

function runOne(pdfAbs, ctx, urls){
  const { root, owner, repo, br } = ctx;
  const domain = detectDomain(pdfAbs, root);
  const sha = sha8(pdfAbs);
  const pagesCount = pages(pdfAbs);
  const pdfRepoRel = repoRel(pdfAbs, root);

  // reuse docId if known, else next
  const ledger = ledgerLoad(root);
  let docId = (ledger.get(sha)?.docId) || nextDocId(root, domain);
  const docDir = path.join(root, 'liberated', domain, docId);
  fs.mkdirSync(docDir, {recursive:true});

  const key = keyLine(docId, domain, sha, pagesCount, pdfRepoRel);
  const body = defaultBody(path.basename(pdfAbs, path.extname(pdfAbs)));
  const text = textMd(docId, key, body);
  const mani = manifest(docId, sha, pagesCount, pdfRepoRel);

  fs.writeFileSync(path.join(docDir, `${docId}.text.md`), text, 'utf8');
  fs.writeFileSync(path.join(docDir, `${docId}.manifest.json`), mani, 'utf8');
  if (!ledger.get(sha)) ledgerAppend(root, sha, docId, domain);

  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${br}`;
  urls.push(base + repoRel(path.join(docDir, `${docId}.text.md`), root));
  urls.push(base + repoRel(path.join(docDir, `${docId}.manifest.json`), root));
}

function main(){
  const root = repoRoot();
  const { owner, repo } = ownerRepo();
  const br = branch();
  const target = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : path.join(root, 'papers');

  const pdfs = (fs.existsSync(target) && fs.statSync(target).isDirectory()) ? walkPdfs(target) : (isPdf(target) ? [target] : []);
  if (!pdfs.length){ console.error('No PDFs found.'); process.exit(1); }

  const urls = [];
  for (const pdf of pdfs) runOne(path.resolve(pdf), {root, owner, repo, br}, urls);

  const out = path.join(root, 'liberated', '.last_run_urls.txt');
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.writeFileSync(out, urls.join('\n') + '\n', 'utf8');
}

if (require.main === module) main();

