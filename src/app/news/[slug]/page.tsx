import Markdown from 'react-markdown';
import ReadLayout from '@/app/single-page-layout/layout';
import remarkGfm from 'remark-gfm';
import { redirect } from 'next/navigation';

import directus from '@/lib/directus';
import { readItems, readItem } from '@directus/sdk';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const pages = await directus.request(
    readItems('Articles', {
      fields: ['*'],
    })
  );

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  let pages = await directus.request(
    readItems('Articles', {
      fields: ['*'],
      filter: { slug: { _eq: params.slug } },
    })
  );

  const page = pages[0];

  return (
    <ReadLayout>
      <Markdown className='prose prose-tight max-w-none'>
        {`# ${page.title}
        
        ${page.content}
        `}
      </Markdown>
    </ReadLayout>
  );
}

export const dynamic = 'force-static';
