import Markdown from 'react-markdown';
import ReadLayout from '@/app/single-page-layout/layout';
import remarkGfm from 'remark-gfm';
import { redirect } from 'next/navigation';
import Canvas from '@/components/Canvas/Canvas';
import directus, { Pair } from '@/lib/directus';
import { readItems, readItem } from '@directus/sdk';

interface PageProps {
  params: {
    pair: string;
  };
}

/*export async function generateStaticParams() {
  const pages = await directus.request(
    readItems('Articles', {
      fields: ['*'],
    })
  );

  return pages.map((page) => ({
    slug: page.slug,
  }));
}*/

export default async function Page({ params }: PageProps) {
  return (
    <ReadLayout>
      <Canvas /> <h2>{params.pair}</h2>
      <b>Please note:</b> this data currently are furnished by CoinmarketCap.
      <br />
      As soon as possible will be replaced and integradetd by our collected
      data.
    </ReadLayout>
  );
}

export const dynamic = 'force-static';
