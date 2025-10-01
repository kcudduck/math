// beast_mode_wrapper.js
// vNext liberation wrapper — flat layout, hard isolation, KEY@line3
// Single-file, no external deps. Node >= 16.
//
// Features
// - Emit .text.md with KEY on line 3 (with optional "KEY:" label)
// - Emit .manifest.json with mirrored pk block
// - Auto-detect git repo root and owner/repo (fallbacks provided)
// - Build raw.githubusercontent.com URLs
// - Validate KEY placement, PK fences, and manifest alignment
// - Optional fixer to shift existing files to KEY@line3
// - No OCR/raster generation here (image OCR intentionally disabled for now)
//
// Layout (flat, per-paper):
//   <repo_root>/<docId>/<docId>.text.md
//   <repo_root>/<docId>/<docId>.manifest.json
//   <repo_root>/<docId>/<docId>.pdf          (path recorded in KEY + manifest)
//   (optional) page rasters + OCR text files if present
//
// CLI examples
//   # Create text.md + manifest.json from a body file (already PK-safe content):
//   node beast_mode_wrapper.js init \
//     --doc math_p1 --domain math --pages 6 \
//     --pdf /math_p1/math_p1.pdf \
//     --sha c1b5f27b \
//     --body-file ./body.md \
//     --key-label true
//
//   # Validate files:
//   node beast_mode_wrapper.js validate --doc math_p1
//
//   # Print raw URLs (branch auto = current or --branch main):
//   node beast_mode_wrapper.js urls --doc math_p1 --branch main
//
//   # Fix an existing text.md to ensure KEY is on line 3:
//   node beast_mode_wrapper.js fix-key-line --doc math_p1
//
// Notes
// - KEY line fields (pipe-separated, exactly 6):
//     <docId> | <domain> | <doi or blank> | <sha256> | <pages> | <abs_repo_rel_pdf_path>
// - PK fences used here:
//     <!-- PK START doc=<docId> -->
//     <!-- PK END doc=<docId> -->

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

function sh(cmd) {
  return cp.execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim();
}

function tryGitRepoRoot() {
  try {
    return sh('git rev-parse --show-toplevel');
  } catch (_) {
    return process.cwd();
  }
}

function tryOwnerRepo() {
  try {
    const url = sh('git remote get-url origin');
    // Supports git@github.com:owner/repo.git and https://github.com/owner/repo.git
    const m = url.match(/github\.com[:\/](.+?)\/(.+?)(?:\.git)?$/);
    if (m) return { owner: m[1], repo: m[2] };
  } catch (_) {}
  return { owner: process.env.GH_OWNER || 'owner', repo: process.env.GH_REPO || 'repo' };
}

function posixJoin(...segments) {
  // Ensure POSIX-style forward slashes for repo-relative paths
  return path.posix.join(...segments.map(s => s.replace(/\\/g, '/')));
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function computeSha256(filePath) {
  const h = crypto.createHash('sha256');
  const buf = fs.readFileSync(filePath);
  h.update(buf);
  return h.digest('hex').slice(0, 8); // short form like your manifests (e.g., c1b5f27b)
}

function buildKeyLine({ docId, domain, doi = '', sha, pages, pdfRepoRel, keyLabel = true }) {
  const raw = `${docId} | ${domain} | ${doi} | ${sha} | ${pages} | ${pdfRepoRel}`;
  return keyLabel ? `KEY: ${raw}` : raw;
}

function emitTextMd({ docId, body, keyLine }) {
  const lines = [];
  lines.push('PKvNext Document'); // line 1
  lines.push('');                 // line 2 (blank)
  lines.push(keyLine);            // line 3 (KEY)
  lines.push(`<!-- PK START doc=${docId} -->`);
  // Body is expected to be already PK-safe (no PK control comments except actual content)
  // We do not inject per-page anchors here; upstream slice logic may add them.
  lines.push(body.trimEnd());
  lines.push(`<!-- PK END doc=${docId} -->`);
  return lines.join('\n') + '\n';
}

function emitManifestJson({ docId, sha, pages, pdfRepoRel, extra = {} }) {
  const base = {
    doc: docId,
    sha256: sha,
    pages,
    pdf: pdfRepoRel,
    generated: nowIso(),
    pk: { doc: docId, sha256: sha, pages }
  };
  // Optional discovery: rasters + OCR lists if present in doc folder
  if (extra.rasters) base.rasters = extra.rasters;
  if (extra.ocr) base.ocr = extra.ocr;
  return JSON.stringify(base, null, 2) + '\n';
}

function discoverArtifacts(docDir, docId) {
  // Identify rasters and OCR text files by simple patterns
  const files = fs.existsSync(docDir) ? fs.readdirSync(docDir) : [];
  const rasters = [];
  const ocr = [];
  for (const f of files) {
    if (f.startsWith(`${docId}.page`) && f.match(/\.png$/)) rasters.push(posixJoin('/', docId, f));
    if (f.startsWith('ocr_page') && f.match(/\.txt$/)) ocr.push(posixJoin('/', docId, f));
  }
  rasters.sort();
  ocr.sort();
  return { rasters, ocr };
}

function validateKeyLine3(text, { docId }) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) throw new Error('text.md has fewer than 3 lines');
  const keyLine = lines[2];
  // Accept with or without the 'KEY:' prefix
  const m = keyLine.match(/^\s*(?:KEY:\s*)?([^].*)$/);
  if (!m) throw new Error('KEY line 3 not found');
  const raw = keyLine.replace(/^\s*KEY:\s*/, '');
  const parts = raw.split('|').map(s => s.trim());
  if (parts.length !== 6) throw new Error('KEY must have exactly 6 pipe-separated fields');
  if (parts[0] !== docId) throw new Error(`KEY doc mismatch: ${parts[0]} != ${docId}`);
  return { parts, keyLine };
}

function validatePkFences(text, { docId }) {
  const startRe = new RegExp(`^<!--\\s*PK START\\s+doc=${docId}\\s*-->$`, 'm');
  const endRe = new RegExp(`^<!--\\s*PK END\\s+doc=${docId}\\s*-->$`, 'm');
  if (!startRe.test(text)) throw new Error('Missing PK START for doc=' + docId);
  if (!endRe.test(text)) throw new Error('Missing PK END for doc=' + docId);
}

function validateManifest(manifestStr, { docId, sha, pages }) {
  const m = JSON.parse(manifestStr);
  if (m.doc !== docId) throw new Error(`manifest.doc mismatch: ${m.doc} != ${docId}`);
  if (m.pk?.doc !== docId) throw new Error(`manifest.pk.doc mismatch: ${m.pk?.doc} != ${docId}`);
  if (sha && m.sha256 && m.sha256 !== sha) throw new Error(`manifest.sha256 mismatch: ${m.sha256} != ${sha}`);
  if (pages && m.pages && m.pages !== pages) throw new Error(`manifest.pages mismatch: ${m.pages} != ${pages}`);
  return m;
}

function toRepoRel(abs, repoRoot) {
  const rel = path.relative(repoRoot, abs).replace(/\\/g, '/');
  return '/' + rel; // manifest/text.md store a repo-root-absolute POSIX path
}

function loadBody({ bodyFile, stdinOk = true }) {
  if (bodyFile) return fs.readFileSync(bodyFile, 'utf8');
  if (stdinOk && !process.stdin.isTTY) return fs.readFileSync(0, 'utf8');
  // Minimal default body (user should supply a real body)
  return '# Placeholder Body\n\n(Provide --body-file or pipe content via STDIN.)\n';
}

function printUrls({ owner, repo, branch, repoRelText, repoRelManifest, extras = {} }) {
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}`;
  console.log('TEXT_MD', base + repoRelText);
  console.log('MANIFEST', base + repoRelManifest);
  (extras.rasters || []).forEach(p => console.log('PAGE', base + p));
  (extras.ocr || []).forEach(p => console.log('OCR', base + p));
}

function cmdInit(args) {
  const repoRoot = tryGitRepoRoot();
  const { owner, repo } = tryOwnerRepo();
  const branch = args['--branch'] || sh('git rev-parse --abbrev-ref HEAD');

  const docId = req(args, '--doc');
  const domain = req(args, '--domain');
  const pages = parseInt(req(args, '--pages'), 10);
  const keyLabel = (args['--key-label'] || 'true').toLowerCase() !== 'false';
  const doi = args['--doi'] || '';

  const docDir = path.join(repoRoot, docId);
  ensureDir(docDir);

  // PDF path
  const pdfRepoRel = args['--pdf'] || toRepoRel(path.join(docDir, `${docId}.pdf`), repoRoot);

  // SHA
  let sha = args['--sha'] || '';
  if (!sha) {
    const pdfAbs = path.join(repoRoot, pdfRepoRel.replace(/^\//, ''));
    if (fs.existsSync(pdfAbs)) sha = computeSha256(pdfAbs); else sha = '00000000';
  }

  const body = loadBody({ bodyFile: args['--body-file'] });
  const keyLine = buildKeyLine({ docId, domain, doi, sha, pages, pdfRepoRel, keyLabel });
  const textMd = emitTextMd({ docId, body, keyLine });

  // Discover extra artifacts in docDir
  const extras = discoverArtifacts(docDir, docId);
  const manifestJson = emitManifestJson({ docId, sha, pages, pdfRepoRel, extra: extras });

  // Write files
  const textPath = path.join(docDir, `${docId}.text.md`);
  const manifestPath = path.join(docDir, `${docId}.manifest.json`);
  fs.writeFileSync(textPath, textMd, 'utf8');
  fs.writeFileSync(manifestPath, manifestJson, 'utf8');

  // Validate
  validateKeyLine3(textMd, { docId });
  validatePkFences(textMd, { docId });
  validateManifest(manifestJson, { docId, sha, pages });

  // URLs
  const repoRelText = toRepoRel(textPath, repoRoot);
  const repoRelManifest = toRepoRel(manifestPath, repoRoot);
  printUrls({ owner, repo, branch, repoRelText, repoRelManifest, extras });
}

function cmdValidate(args) {
  const repoRoot = tryGitRepoRoot();
  const docId = req(args, '--doc');
  const textPath = path.join(repoRoot, docId, `${docId}.text.md`);
  const manifestPath = path.join(repoRoot, docId, `${docId}.manifest.json`);
  const text = fs.readFileSync(textPath, 'utf8');
  const manifestStr = fs.readFileSync(manifestPath, 'utf8');

  const { parts } = validateKeyLine3(text, { docId });
  validatePkFences(text, { docId });
  const pages = parseInt(parts[4], 10) || undefined;
  const sha = parts[3] || undefined;
  validateManifest(manifestStr, { docId, sha, pages });
  console.log('OK: vNext paper validates.');
}

function cmdUrls(args) {
  const repoRoot = tryGitRepoRoot();
  const { owner, repo } = tryOwnerRepo();
  const branch = args['--branch'] || sh('git rev-parse --abbrev-ref HEAD');
  const docId = req(args, '--doc');
  const textPath = path.join(repoRoot, docId, `${docId}.text.md`);
  const manifestPath = path.join(repoRoot, docId, `${docId}.manifest.json`);

  const extras = discoverArtifacts(path.join(repoRoot, docId), docId);
  printUrls({ owner, repo, branch,
    repoRelText: toRepoRel(textPath, repoRoot),
    repoRelManifest: toRepoRel(manifestPath, repoRoot),
    extras });
}

function cmdFixKeyLine(args) {
  const repoRoot = tryGitRepoRoot();
  const docId = req(args, '--doc');
  const textPath = path.join(repoRoot, docId, `${docId}.text.md`);
  const text = fs.readFileSync(textPath, 'utf8');
  const fixed = ensureKeyAtLine3(text);
  fs.writeFileSync(textPath, fixed, 'utf8');
  console.log('Fixed KEY placement to line 3.');
}

function ensureKeyAtLine3(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length >= 3) {
    // Detect KEY line anywhere and move it to line 3, preserving first line as title and line2 blank
    const keyIdx = lines.findIndex(l => /^\s*(?:KEY:\s*)?[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\s*$/.test(l));
    if (keyIdx >= 0) {
      const key = lines.splice(keyIdx, 1)[0];
      // Ensure heading line 1 exists
      if (!lines[0]) lines[0] = 'PKvNext Document'; else lines[0] = lines[0] || 'PKvNext Document';
      // Ensure line 2 blank
      if (lines[1] !== '') lines.splice(1, 0, '');
      // Insert KEY at index 2
      lines.splice(2, 0, key);
      return lines.join('\n');
    }
  }
  // If not found or too short, rebuild minimal header
  return rebuildWithMinimalHeader(text);
}

function rebuildWithMinimalHeader(text) {
  // Take existing content, strip any PK header block, and rebuild a minimal compliant header
  const body = text.replace(/^PKvNext Document\n?/,'')
                   .replace(/^\n?KEY:.*\n?/, '')
                   .trimStart();
  return ['PKvNext Document', '', 'KEY: <fill-me> | <domain> |  | <sha> | <pages> | /<doc>/<doc>.pdf', body].join('\n');
}

function req(obj, key) {
  const v = obj[key];
  if (v === undefined || v === null || v === '') throw new Error(`Missing required ${key}`);
  return v;
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a;
      const n = argv[i + 1];
      if (n && !n.startsWith('-')) { out[k] = n; i++; } else { out[k] = 'true'; }
    } else if (a.startsWith('-')) {
      // short flags not used; ignore or extend as needed
      out[a] = 'true';
    } else {
      out._.push(a);
    }
  }
  return out;
}

function main() {
  const argv = process.argv.slice(2);
  if (!argv.length) return usage(0);
  const cmd = argv[0];
  const args = parseArgs(argv.slice(1));

  try {
    if (cmd === 'init') return cmdInit(args);
    if (cmd === 'validate') return cmdValidate(args);
    if (cmd === 'urls') return cmdUrls(args);
    if (cmd === 'fix-key-line') return cmdFixKeyLine(args);
    return usage(1);
  } catch (err) {
    console.error('ERROR:', err.message || err);
    process.exit(2);
  }
}

function usage(code) {
  const { owner, repo } = tryOwnerRepo();
  console.log(`\nbeast_mode_wrapper.js — vNext flat layout wrapper\n\n` +
`Usage:\n` +
`  node beast_mode_wrapper.js init \\\n    --doc <docId> --domain <domain> --pages <n> \\\n    [--pdf /<doc>/<doc>.pdf] [--sha <8hex>] [--doi <str>] \\\n    [--body-file <path>] [--key-label true|false] [--branch <name>]\n\n` +
`  node beast_mode_wrapper.js validate --doc <docId>\n` +
`  node beast_mode_wrapper.js urls --doc <docId> [--branch <name>]\n` +
`  node beast_mode_wrapper.js fix-key-line --doc <docId>\n\n` +
`Detected repo: ${owner}/${repo}\n`);
  process.exit(code);
}

if (require.main === module) main();

module.exports = {
  emitTextMd,
  emitManifestJson,
  validateKeyLine3,
  validatePkFences,
  validateManifest,
  ensureKeyAtLine3,
  discoverArtifacts,
  buildKeyLine,
  toRepoRel,
  printUrls
};

