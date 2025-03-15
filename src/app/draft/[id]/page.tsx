import Markdown from 'react-markdown';
import ReadLayout from '@/app/single-page-layout/layout';

import { notFound } from 'next/navigation';

import { draftMode } from 'next/headers';
import directus from '@/lib/directus';
import { readItem, readItems } from '@directus/sdk';

export const dynamic = 'force-static';

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = false;
export async function generateStaticParams() {
  console.log('generateStaticParams called');
  if (process.env.NODE_ENV === 'development') {
    const pages = await directus.request(
      readItems('Articles', {
        fields: ['*'],
      })
    );
    return pages.map((page) => ({
      slug: page.id,
    }));
  }
  // this is working
  return [];
}

export default async function Page({ params }: any) {
  const draft = await draftMode();

  /*if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }*/

  const id = (await params).id;
  console.log('from page:', id);

  /*if (
    (!id || id === 'undefined' || id === '1') &&
    process.env.NODE_ENV !== 'development'
  ) {
    return notFound(); // Mostra una pagina 404
  }*/

  const article = await directus.request(readItem('Articles', id));

  return (
    <ReadLayout>
      <Markdown>{`# ${article.title} \n\n ${article.content}`}</Markdown>
    </ReadLayout>
  );
}
