#!/usr/bin/env node
/**
 * lm_cli.js — Global, repo-aware CLI
 * Zero/low-flag UX per spec. Works in any repo.
 *
 * Behavior (quiet by default):
 *  - lm                    -> auto mode in current repo (papers intake or liberated view)
 *  - lm <file.pdf>         -> liberate that PDF
 *  - lm <dir>              -> if dir has .text.md -> list raw URLs; else ingest PDFs recursively
 *  - lm papers             -> ingest PDFs in repoRoot/papers (with nested domain dirs supported)
 *  - lm liberated          -> list raw URLs for repoRoot/liberated
 *
 * After ingest, auto git add/commit/push (can disable with LM_NOPUSH=1)
 * After push, generate/update a manifest of raw URLs for *only the newly liberated* docs.
 */

const fs = require('fs');
const path = require('path');
const cp = require('child_process');

function sh(cmd, opts={}){ return cp.execSync(cmd, {stdio: ['ignore','pipe','pipe'], ...opts}).toString().trim(); }
function trySh(cmd){ try { return sh(cmd); } catch { return ''; } }

function repoRoot(){ const r = trySh('git rev-parse --show-toplevel'); return r || process.cwd(); }
function branch(){ return trySh('git rev-parse --abbrev-ref HEAD') || 'main'; }
function ownerRepo(){
  const url = trySh('git remote get-url origin');
  const m = url.match(/github\.com[:\/]([^\/]+)\/([^\s]+?)(?:\.git)?$/);
  if (m) return { owner: m[1], repo: m[2] };
  return { owner: process.env.GH_OWNER || 'owner', repo: process.env.GH_REPO || 'repo' };
}
function repoRel(abs, root){ return ('/' + path.relative(root, abs).replace(/\\/g, '/')); }
function isPdf(p){ return fs.existsSync(p) && fs.statSync(p).isFile() && p.toLowerCase().endsWith('.pdf'); }
function hasTextMd(dir){ if(!fs.existsSync(dir)||!fs.statSync(dir).isDirectory()) return false; return fs.readdirSync(dir).some(d => fs.existsSync(path.join(dir, d, `${d}.text.md`))); }

function callAuto(target){
  const root = repoRoot();
  const auto = path.join(root, 'liberator_auto.js');
  if (!fs.existsSync(auto)) { console.error('liberator_auto.js not found in repo root. Paste from canvas.'); process.exit(2); }
  const cmd = `node ${JSON.stringify(auto)} ${JSON.stringify(target)}`;
  cp.execSync(cmd, {stdio: 'inherit'});
}

function listLiberated(dir){
  const root = repoRoot();
  const { owner, repo } = ownerRepo();
  const br = branch();
  const base = `https://raw.githubusercontent.com/${owner}/${repo}/${br}`;
  let count = 0;
  for (const name of fs.readdirSync(dir)){
    const sub = path.join(dir, name);
    if (!fs.statSync(sub).isDirectory()) continue;
    const text = path.join(sub, `${name}.text.md`);
    const mani = path.join(sub, `${name}.manifest.json`);
    if (fs.existsSync(text)){
      console.log(base + repoRel(text, root));
      if (fs.existsSync(mani)) console.log(base + repoRel(mani, root));
      count++;
    }
  }
  if (!count) console.log('(no liberated docs found)');
}

function autoCommitPush(){
  if (process.env.LM_NOPUSH === '1') return;
  const br = branch();
  try { sh('git add -A', {stdio:'inherit'}); } catch {}
  try { sh(`git commit -m "liberate: update outputs"`, {stdio:'inherit'}); } catch {}
  try { sh(`git push origin ${br}`, {stdio:'inherit'}); } catch {}
}

function main(){
  const root = repoRoot();
  const arg = process.argv[2];
  const papersDir = path.join(root, 'papers');
  const liberatedDir = path.join(root, 'liberated');

  if (!arg){
    // No arg: if in a liberated-like dir show URLs; else ingest default papers
    if (hasTextMd(root) || fs.existsSync(liberatedDir)){
      const dir = fs.existsSync(liberatedDir) ? liberatedDir : root;
      return listLiberated(dir);
    }
    const target = fs.existsSync(papersDir) ? papersDir : root;
    callAuto(target);
    autoCommitPush();
    // After push, emit URLs for newly produced docs from auto-run manifest
    const tmp = path.join(root, 'liberated', '.last_run_urls.txt');
    if (fs.existsSync(tmp)) fs.readFileSync(tmp,'utf8').split(/\r?\n/).filter(Boolean).forEach(l=>console.log(l));
    return;
  }

  const abs = path.resolve(process.cwd(), arg);
  if (isPdf(abs)){
    callAuto(abs);
    autoCommitPush();
    const tmp = path.join(root, 'liberated', '.last_run_urls.txt');
    if (fs.existsSync(tmp)) fs.readFileSync(tmp,'utf8').split(/\r?\n/).filter(Boolean).forEach(l=>console.log(l));
    return;
  }

  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()){
    // If looks like liberated view
    if (hasTextMd(abs) || path.basename(abs) === 'liberated') return listLiberated(abs);
    // Else treat as intake
    callAuto(abs);
    autoCommitPush();
    const tmp = path.join(root, 'liberated', '.last_run_urls.txt');
    if (fs.existsSync(tmp)) fs.readFileSync(tmp,'utf8').split(/\r?\n/).filter(Boolean).forEach(l=>console.log(l));
    return;
  }

  console.error('Path not found:', arg);
  process.exit(2);
}

if (require.main === module) main();

