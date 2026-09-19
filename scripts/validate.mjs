import {readFile, access, readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert(html.startsWith('<!doctype html>'), 'HTML entry point must use standards mode');
assert(html.includes('lang="zh-CN"') && html.includes('name="viewport"'), 'Language and mobile viewport required');
assert(!html.includes('\uFFFD'), 'Invalid UTF-8 replacement character found');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate HTML IDs');
let checked = 0;
for (const [,link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (link.startsWith('#')) assert(ids.includes(link.slice(1)), `Broken anchor: ${link}`);
  else if (link.startsWith('https://')) assert(new URL(link).hostname, `Invalid source URL: ${link}`);
  else {
    assert(link.startsWith('./'), `Asset must use relative path for project Pages: ${link}`);
    await access(path.join(root, link));
  }
  checked++;
}
for (const target of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(target[0].includes('noopener noreferrer'), 'External target needs rel protection');
for (const section of ['direction','team','recruit','weekly','battle','sources']) assert(ids.includes(section), `Missing guide section: ${section}`);
assert(html.includes('进度待对齐'), 'Unconfirmed progress must stay explicit');
assert(html.includes('困难 / 经典'), 'Difficulty context missing');
const files = await readdir(root);
assert.deepEqual(files.sort(), ['.nojekyll','icon.svg','index.html','styles.css'].sort(), 'Unexpected publishing artifact');
console.log(`PASS: ${checked} links/assets, ${ids.length} unique anchors, six guide sections, UTF-8, and publishing directory.`);
