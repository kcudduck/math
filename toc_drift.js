#!/usr/bin/env node
/**
 * toc_drift_analyzer.js (dir-or-file aware)
 *
 * Purpose
 *   Given a liberated .text.md (with PK PAGE markers) and its sibling manifest,
 *   1) find a Table of Contents block
 *   2) parse entries → {title, printedPage}
 *   3) scan the body to locate the first page where each title appears
 *   4) estimate the PDF page drift: drift ≈ filePage - printedPage (median over matches)
 *   5) emit a concise report + a mapping example for a few entries
 *   6) accepts either a path to <docId>.text.md **or** a directory containing it
 *
 * Usage
 *   node toc_drift_analyzer.js path/to/<docId>.text.md
 *   node toc_drift_analyzer.js path/to/<docId>/
 */

const fs = require('fs');
const path = require('path');

function load(file){ return fs.readFileSync(file, 'utf8'); }
function tryJson(p){ try { return JSON.parse(fs.readFileSync(p,'utf8')); } catch { return null; } }

function resolveMdPath(input){
  const p = path.resolve(process.cwd(), input);
  if (!fs.existsSync(p)) throw new Error(`Path not found: ${p}`);
  const st = fs.statSync(p);
  if (st.isDirectory()){
    // prefer <basename>.text.md
    const base = path.basename(p);
    const candidate = path.join(p, `${base}.text.md`);
    if (fs.existsSync(candidate)) return candidate;
    // else pick the first *.text.md inside
    const any = fs.readdirSync(p).find(f=>f.endsWith('.text.md'));
    if (any) return path.join(p, any);
    throw new Error(`No .text.md found in directory: ${p}`);
  }
  // file
  if (!p.endsWith('.text.md')) throw new Error(`Expected a .text.md file but got: ${p}`);
  return p;
}

function splitPages(md){
  // returns [{index:1, text:"..."}, ...]
  const parts = md.split(/<!--\s*PK PAGE\s*(\d+)\s*doc=.*?-->/g);
  const out=[];
  for (let i=1;i<parts.length;i+=2){
    const n = parseInt(parts[i],10);
    const txt = parts[i+1]||'';
    out.push({index:n, text:txt});
  }
  return out;
}

function findTocPage(pages){
  for (const p of pages.slice(0,20)){
    const lines = p.text.split(/\n/).map(s=>s.trim()).filter(Boolean);
    if (lines.find(l => /^contents\b|^table of contents\b/i.test(l))) return p;
    const numTail = lines.filter(l => /\b\d{1,4}$/.test(l)).length;
    if (numTail >= 6) return p;
  }
  return null;
}

function parseTocEntries(tocText){
  const lines = tocText.split(/\n/).map(s=>s.replace(/\s+/g,' ').trim()).filter(Boolean);
  const entries=[];
  for (const line of lines){
    //  Title ....... 12   |  1.2 Title  37  |  CHAPTER 3 Title ..... 51
    const m = line.match(/^(.*?)\s*[\u2026\.^·•\-\s]*\s(\d{1,4})$/);
    if (m){
      const title = m[1].replace(/\s*\.+\s*$/,'').trim();
      const page  = parseInt(m[2],10);
      if (title && !Number.isNaN(page)) entries.push({title, printedPage:page});
      continue;
    }
    const m2 = line.match(/^(.*?)(?:\s{2,}|\s{1,})(\d{1,4})$/);
    if (m2){
      const title = m2[1].trim();
      const page  = parseInt(m2[2],10);
      if (title && !Number.isNaN(page)) entries.push({title, printedPage:page});
    }
  }
  const seen = new Set();
  return entries.filter(e=>{ const k = e.title.toLowerCase()+"|"+e.printedPage; if (seen.has(k)) return false; seen.add(k); return true; });
}

function locateTitlePage(pages, title){
  const needle = title.toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
  if (!needle) return null;
  for (const p of pages){
    const head = p.text.split(/\n/).slice(0,14).join(' ').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
    if (!head) continue;
    const words = needle.split(' ').filter(w=>w.length>2);
    const hit = words.length && words.filter(w=> head.includes(w)).length/words.length >= 0.6;
    if (hit) return p.index;
  }
  return null;
}

function median(xs){ if (!xs.length) return null; const a = xs.slice().sort((x,y)=>x-y); const mid = Math.floor(a.length/2); return a.length%2? a[mid] : Math.round((a[mid-1]+a[mid])/2); }

function main(){
  const arg = process.argv[2];
  if (!arg){
    console.error('Usage: node toc_drift_analyzer.js <docId>.text.md  OR  node toc_drift_analyzer.js <docDir>/');
    process.exit(1);
  }
  let mdPath;
  try { mdPath = resolveMdPath(arg); }
  catch (e){ console.error(e.message); process.exit(1); }

  const dir = path.dirname(mdPath);
  const docId = path.basename(mdPath).replace(/\.text\.md$/, '');
  const manifestPath = path.join(dir, `${docId}.manifest.json`);

  const md = load(mdPath);
  const pages = splitPages(md);
  const tocPage = findTocPage(pages);
  if (!tocPage){
    console.log('# TOC not found');
    console.log(`docId: ${docId}`);
    console.log(`pages: ${pages.length}`);
    process.exit(0);
  }
  const entries = parseTocEntries(tocPage.text);
  const sample = entries.slice(0, 12);
  const pairs = [];
  for (const e of sample){
    const filePage = locateTitlePage(pages, e.title);
    if (filePage!=null) pairs.push({title:e.title, printed:e.printedPage, file:filePage, drift:filePage - e.printedPage});
  }
  const drift = median(pairs.map(p=>p.drift));
  console.log(`# TOC + Drift Report for ${docId}`);
  console.log(`pages_total: ${pages.length}`);
  console.log(`toc_page_index: ${tocPage.index}`);
  console.log(`toc_entries_parsed: ${entries.length}`);
  console.log(`matched_entries: ${pairs.length}`);
  console.log(`estimated_drift: ${drift==null? 'n/a' : drift}  (filePage - printedPage)`);
  console.log('\n## sample mapping (up to 12)');
  for (const p of pairs){
    console.log(`- title: ${p.title}`);
    console.log(`  printed_page: ${p.printed}`);
    console.log(`  file_page: ${p.file}`);
    console.log(`  drift: ${p.drift}`);
  }
  const mani = tryJson(manifestPath);
  if (mani && mani.rasters && mani.rasters.length){
    const three = [pairs[0]?.file, pairs[1]?.file, pairs[2]?.file].filter(Boolean).slice(0,3);
    console.log('\n## example rasters');
    for (const f of three){
      const idx = Math.max(1, Math.min(f, mani.rasters.length));
      const rel = mani.rasters[idx-1];
      console.log(`- page ${idx}: ${rel}`);
    }
  }
}

if (require.main === module) main();

