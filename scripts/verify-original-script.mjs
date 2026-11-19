import { readFileSync } from 'node:fs';

const expected = readFileSync(new URL('../docs/original-script.txt', import.meta.url), 'utf8')
  .replace(/\s+/g, ' ')
  .replace(/\s+([—.,?!;])/g, '$1')
  .trim();

function decode(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

for (const path of ['public/index.html', 'public/mobile.html']) {
  const html = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const start = html.indexOf('<section class="original-script"');
  const end = html.indexOf('<div class="extended-guide-intro">', start);
  if (start < 0 || end < 0) throw new Error(`${path}: original script boundary missing`);
  const scriptHtml = html.slice(start, end)
    .replace(/<figure[\s\S]*?<\/figure>/g, ' ')
    .replace(/<div class="shopper-collage"[\s\S]*?(?=<div class="stat-box">)/g, ' ')
    .replace(/<div class="last-screen"[\s\S]*?<\/div>/g, ' ');
  const actual = decode(scriptHtml.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .replace(/\s+([—.,?!;])/g, '$1')
    .trim();
  if (actual !== expected) throw new Error(`${path}: original script changed or moved out of order`);
  const title = '<h1 id="guide-title">The Last<br><em>Stop</em></h1>';
  const tagline = "The liquor store is the final errand. They're tired, they're done, and they really need your help.";
  if (!html.includes(title) || !html.includes(tagline)) throw new Error(`${path}: title or opening line changed`);
  if (!html.includes('/logo.png?v=3') || !html.includes('/logo_footer.png?v=3')) throw new Error(`${path}: original logo missing`);
  console.log(`${path}: original script verified word-for-word and in order`);
}
