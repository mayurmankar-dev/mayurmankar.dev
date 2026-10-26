import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Link-preview ("Open Graph") images, rendered once at build time.
// 1200×630 is the size LinkedIn, X, Slack and WhatsApp all display large.
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const root = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(root, p));

// Satori needs .woff/.ttf (not .woff2); Lato matches the site's font.
const fonts = [
  { name: 'Lato', data: read('node_modules/@fontsource/lato/files/lato-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Lato', data: read('node_modules/@fontsource/lato/files/lato-latin-700-normal.woff'), weight: 700 as const },
];
const photo = `data:image/jpeg;base64,${read('public/images/profile-photo-400.jpg').toString('base64')}`;

// Minimal element helper, so this file needs no React/JSX.
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

function titleSize(title: string) {
  if (title.length <= 40) return 76;
  if (title.length <= 70) return 64;
  return 54;
}

export async function renderOgImage({ title, kicker }: { title: string; kicker: string }) {
  const tree = el(
    'div',
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      backgroundColor: '#fbf6ea',
      backgroundImage: 'radial-gradient(circle at center, #d6ccb8 0%, #d6ccb8 8%, transparent 9%)',
      backgroundSize: '30px 30px',
      color: '#1d1b18',
      fontFamily: 'Lato',
    },
    [
      el('div', { display: 'flex', fontSize: 28, color: '#6e685e' }, kicker),
      el('div', { display: 'flex', fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }, title),
      el('div', { display: 'flex', alignItems: 'center', borderTop: '3px solid #1d1b18', paddingTop: 28 }, [
        el('img', { width: 72, height: 72, borderRadius: 36, objectFit: 'cover' }, undefined, { src: photo, width: 72, height: 72 }),
        el('div', { display: 'flex', flexDirection: 'column', marginLeft: 22 }, [
          el('div', { display: 'flex', fontSize: 30, fontWeight: 700 }, 'Mayur Mankar'),
          el('div', { display: 'flex', fontSize: 24, color: '#1772d0' }, 'mayurmankar.dev'),
        ]),
      ]),
    ],
  );

  const svg = await satori(tree as never, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng();
}
