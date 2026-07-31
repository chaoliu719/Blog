import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

interface Subset {
  file: string;
  ranges: Array<[number, number]>;
}

/**
 * Fonts for the OG image renderer.
 *
 * Noto Sans SC ships as ~100 unicode-range subsets, far too much to hand to
 * satori wholesale. Instead we parse the @font-face blocks once, then load only
 * the subsets that actually cover the characters being rendered. A title plus a
 * description usually needs two or three of them.
 */

let subsetCache: Subset[] | null = null;

async function loadSubsets(weight: 400 | 700): Promise<Subset[]> {
  const cssPath = require.resolve(`@fontsource/noto-sans-sc/${weight}.css`);
  const dir = path.dirname(cssPath);
  const css = await readFile(cssPath, 'utf-8');

  const subsets: Subset[] = [];
  // Each @font-face block pairs one woff file with the range it covers.
  const blocks = css.split('@font-face');

  for (const block of blocks) {
    const fileMatch = block.match(/url\(\.\/(files\/[^)]+?\.woff)\)/);
    const rangeMatch = block.match(/unicode-range:\s*([^;]+);/);
    if (!fileMatch || !rangeMatch) continue;

    const ranges: Array<[number, number]> = [];
    for (const part of rangeMatch[1].split(',')) {
      const token = part.trim().replace(/^U\+/i, '');
      if (token.includes('-')) {
        const [start, end] = token.split('-');
        ranges.push([parseInt(start, 16), parseInt(end, 16)]);
      } else if (token.includes('?')) {
        // A wildcard such as 4E??  expands to 4E00-4EFF.
        const start = parseInt(token.replace(/\?/g, '0'), 16);
        const end = parseInt(token.replace(/\?/g, 'F'), 16);
        ranges.push([start, end]);
      } else {
        const code = parseInt(token, 16);
        ranges.push([code, code]);
      }
    }

    subsets.push({ file: path.join(dir, fileMatch[1]), ranges });
  }

  return subsets;
}

function covers(subset: Subset, code: number): boolean {
  return subset.ranges.some(([start, end]) => code >= start && code <= end);
}

export interface SatoriFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: 'normal';
}

export interface OgFonts {
  fonts: SatoriFont[];
  /** Ready-made CSS font-family value listing every loaded family in order. */
  fontFamily: string;
}

/**
 * Return the font set needed to render `text`, plus the font-family string that
 * puts them in the right order. Latin comes from Outfit; anything Outfit lacks
 * falls through to the matching Noto Sans SC subsets.
 *
 * Each subset gets its own family name on purpose: satori keeps only the first
 * font registered under a given name, so reusing one name would silently drop
 * every subset after the first and render the rest as tofu.
 */
export async function getFontsFor(text: string, weight: 400 | 700 = 700): Promise<OgFonts> {
  if (!subsetCache) {
    subsetCache = await loadSubsets(weight);
  }

  const needed = new Set<string>();
  for (const char of text) {
    const code = char.codePointAt(0);
    if (code === undefined || code < 0x2e80) continue; // Latin and punctuation: Outfit covers it.
    const subset = subsetCache.find((s) => covers(s, code));
    if (subset) needed.add(subset.file);
  }

  const latinPath = require.resolve(`@fontsource/outfit/files/outfit-latin-${weight}-normal.woff`);

  const fonts: SatoriFont[] = [
    {
      name: 'Outfit',
      data: (await readFile(latinPath)).buffer as ArrayBuffer,
      weight,
      style: 'normal',
    },
  ];

  let index = 0;
  for (const file of needed) {
    fonts.push({
      name: `NotoSansSC${index}`,
      data: (await readFile(file)).buffer as ArrayBuffer,
      weight,
      style: 'normal',
    });
    index += 1;
  }

  return {
    fonts,
    fontFamily: fonts.map((font) => `'${font.name}'`).join(', '),
  };
}
