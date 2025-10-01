#!/usr/bin/env node
/**
 * liberator_auto.js — Zero-flag, one-shot runner for vNext (flat layout, hard isolation)
 *
 * Goals:
 *  - "Point it at a PDF or a directory, and that's it" — no required flags.
 *  - Auto-detect repo root, owner/repo, branch.
 *  - For each PDF found, emit:
 *      <docId>/<docId>.text.md            (KEY on line 3 + PK fences)
 *      <docId>/<docId>.manifest.json
 *  - Derive docId from the PDF filename (sanitized), ensure uniqueness.
 *  - Compute short SHA (first 8 of sha256) from the PDF bytes.
 *  - Infer page count by scanning for "/Type /Page" tokens in the PDF (no deps).
 *  - Keep the PDF where it is (reference via repo-root-absolute path in KEY/manifest).
 *  - Discover rasters and OCR files if present in the eventual doc folder.
 *
 * Usage:
 *    node liberator_auto.js                 # scans CWD (recursively) for *.pdf
 *    node liberator_auto.js ./papers        # scans ./papers (recursively)
 *    node liberator_auto.js ./papers/a.pdf  # processes a single file
 *
 * Optional env:
 *    KEY_LABEL=true|false   (default true)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

function sh(cmd) {
  return cp.execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
}

function tryGitRepoRoot() {
  try { return sh('git rev-parse --show-toplevel'); } catch { return process.cwd(); }
}
function tryBranch() {
  try { return sh('git rev-parse --abbrev-ref HEAD'); } catch { return 'main'; }
}
function tryOwnerRepo() {
  try {
    const url = sh('git remote get-url origin');
    const m = url.match(/github\.com[:\/]([^\/]+)\/([^\s]+?)(?:\.git)?$/);
    if (m) return { owner: m[1], repo: m[2] };
  } catch {}
  return { owner: process.env.GH_OWNER || 'owner', repo: process.env.GH_REPO || 'repo' };
}

function repoRel(abs, repoRoot) {
  const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
  return '/' + rel;
}

function walkPdfs(root) {
  const out = [];
  function rec(p) {
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      for (const f of fs.readdirSync(p)) rec(path.join(p, f));
    } else if (st.isFile() && p.toLowerCase().endsWith('.pdf')) {
      out.push(p);
    }
  }
  rec(root);
  return out;
}

function sha8(file) {
  const buf = fs.readFileSync(file);
  const h = crypto.createHash('sha256').update(buf).digest('hex');
  return h.slice(0, 8);
}

function countPagesHeuristic(file) {
  // Quick-n-dirty: count '/Type /Page' tokens and subtract any '/Type /Pages'.
  const buf = fs.readFileSync(file);
  const txt = buf.toString('latin1'); // avoid utf8 decoding issues
  const pages = (txt.match(/\/Type\s*\/Page\b/g) || []).length;
  const parent = (txt.match(/\/Type\s*\/Pages\b/g) || []).length;
  const n = Math.max(1, pages - parent); // safety floor at 1
  return n;
}

function sanitizeDocId(stem) {
  const s = stem.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return s || 'doc';
}

function ensureUniqueDocId(base, repoRoot) {
  let id = base, i = 2;
  while (fs.existsSync(path.join(repoRoot, id))) { id = `${base}_${i++}`; }
  return id;
}

function discoverArtifacts(docDir, docId) {
  const out = { rasters: [], ocr: [] };
  if (!fs.existsSync(docDir)) return out;
  for (const f of fs.readdirSync(docDir)) {
    if (f.startsWith(`${docId}.page`) && /\.png$/i.test(f)) out.rasters.push(`/${docId}/${f}`);
    if (/^ocr_page\d+\.txt$/i.test(f)) out.ocr.push(`/${docId}/${f}`);
  }
  out.rasters.sort(); out.ocr.sort();
  return out;
}

function buildKeyLine({ docId, domain, sha, pages, pdfRepoRel }) {
  const keyLabel = (process.env.KEY_LABEL || 'true').toLowerCase() !== 'false';
  const raw = `${docId} | ${domain} |  | ${sha} | ${pages} | ${pdfRepoRel}`;
  return keyLabel ? `KEY: ${raw}` : raw;
}

function emitTextMd({ docId, keyLine, body }) {
  return [
    'PKvNext Document',
    '',
    keyLine, // line 3
    `<!-- PK START doc=${docId} -->`,
    body.trimEnd(),
    `<!-- PK END doc=${docId} -->`,
    ''
  ].join('\n');
}

function emitManifest({ docId, sha, pages, pdfRepoRel, extras }) {
  return JSON.stringify({
    doc: docId,
    sha256: sha,
    pages,
    pdf: pdfRepoRel,
    generated: new Date().toISOString(),
    pk: { doc: docId, sha256: sha, pages },
    rasters: extras.rasters,
    ocr: extras.ocr
  }, null, 2) + '\n';
}

function defaultBodyFromFileName(name) {
  const title = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return `# ${title}\n\n(placeholder body — replace with extracted content)\n`;
}

function validateKeyLine3(text, docId) {
  const lines = text.split(/\r?\n/);
  if (lines[2] == null) throw new Error('KEY line missing');
  const raw = lines[2].replace(/^\s*KEY:\s*/, '');
  const parts = raw.split('|').map(s => s.trim());
  if (parts.length !== 6) throw new Error('KEY must have 6 fields');
  if (parts[0] !== docId) throw new Error(`KEY doc mismatch: ${parts[0]} != ${docId}`);
}

function runOne(pdfAbs, ctx) {
  const { repoRoot, domain } = ctx;
  const sha = sha8(pdfAbs);
  const pages = countPagesHeuristic(pdfAbs);
  const pdfRepoRel = repoRel(pdfAbs, repoRoot);

  const stem = path.basename(pdfAbs, path.extname(pdfAbs));
  const baseId = sanitizeDocId(stem);
  const docId = ensureUniqueDocId(baseId, repoRoot);
  const docDir = path.join(repoRoot, docId);
  fs.mkdirSync(docDir, { recursive: true });

  const keyLine = buildKeyLine({ docId, domain, sha, pages, pdfRepoRel });
  const body = defaultBodyFromFileName(stem);
  const textMd = emitTextMd({ docId, keyLine, body });
  const extras = discoverArtifacts(docDir, docId);
  const manifest = emitManifest({ docId, sha, pages, pdfRepoRel, extras });

  fs.writeFileSync(path.join(docDir, `${docId}.text.md`), textMd, 'utf8');
  fs.writeFileSync(path.join(docDir, `${docId}.manifest.json`), manifest, 'utf8');

  // Quick validation
  validateKeyLine3(textMd, docId);
  if (!/<!--\s*PK START\s+doc=/.test(textMd) || !/<!--\s*PK END\s+doc=/.test(textMd)) {
    throw new Error('PK fences missing');
  }

  // Print URLs
  const { owner, repo, branch } = ctx;
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  console.log('—', stem);
  console.log('  TEXT_MD   ', base + `/${docId}/${docId}.text.md`);
  console.log('  MANIFEST  ', base + `/${docId}/${docId}.manifest.json`);
  console.log('  PAGES     ', pages);
  console.log('  SHA8      ', sha);
}

function main() {
  const repoRoot = tryGitRepoRoot();
  const { owner, repo } = tryOwnerRepo();
  const branch = tryBranch();
  const domain = path.basename(repoRoot); // pragmatic default (e.g., 'math')

  const input = process.argv[2] || process.cwd();
  const target = path.resolve(process.cwd(), input);
  if (!fs.existsSync(target)) {
    console.error('ERROR: Path not found:', input);
    process.exit(2);
  }

  const pdfs = fs.statSync(target).isDirectory() ? walkPdfs(target) : [target];
  if (!pdfs.length) {
    console.error('No PDFs found at:', input);
    process.exit(1);
  }

  const ctx = { repoRoot, owner, repo, branch, domain };
  for (const pdf of pdfs) runOne(path.resolve(pdf), ctx);

  console.log('\nDone. Commit & push when ready:');
  console.log('  git add -A && git commit -m "auto: init vNext docs" && git push origin', branch);
}

if (require.main === module) main();

