import type { APIRoute } from 'astro';
import { getPosts } from '../../utils/posts';
import { renderOgImage } from '../../utils/og';
import { OG_DEFAULT } from '../../consts';

// Builds /og/default.png (site pages) and /og/blog/<post>.png (one per post).
export async function getStaticPaths() {
  const posts = await getPosts();
  return [
    {
      params: { slug: 'default' },
      props: OG_DEFAULT,
    },
    ...posts.map((post) => ({
      params: { slug: `blog/${post.id}` },
      props: { title: post.data.title, kicker: 'mayurmankar.dev / blog' },
    })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as { title: string; kicker: string });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
