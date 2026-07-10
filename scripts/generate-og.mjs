// Renders docs/og-image.svg to public/og-image.png (the link-preview image).
// Run with: npm run generate:og
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync(new URL('../docs/og-image.svg', import.meta.url), 'utf8');
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const png = resvg.render().asPng();

const out = new URL('../public/og-image.png', import.meta.url);
writeFileSync(out, png);
console.log(`Wrote ${out.pathname} (${(png.length / 1024).toFixed(0)} KB)`);
