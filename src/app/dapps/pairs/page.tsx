import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Article from '@/components/Card/Article';
import Pairs from '@/components/Card/Pairs';

export const dynamic = 'force-static';

async function getPairs() {
  const pages = await directus.request(
    readItems('Pairs', {
      fields: ['*'],
    })
  );
  console.log(pages);
  return pages.filter((item) => item.status === 'published');
}

export default async function Page({ params }: any) {
  const publishedPages = await getPairs();
  console.log(publishedPages);
  return (
    <>
      <Common title='Our Tokens Pairs' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-4 gap-4'>
          {publishedPages.map((p) => {
            return <Pairs key={p.id} data={p} />;
          })}
        </div>
      </MainWrapper>
    </>
  );
}
