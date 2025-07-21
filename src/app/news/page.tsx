import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Article from '@/components/Card/Article';

export const dynamic = 'force-static';

async function getNews() {
  const pages = await directus.request(
    readItems('Articles', {
      fields: ['*'],
    })
  );
  return pages.filter((item) => item.status === 'published');
}

export default async function Page({ params }: any) {
  const publishedPages = await getNews();
  console.log('heres we go?');
  console.log(publishedPages);
  return (
    <>
      <Common title='NEWS' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-4 gap-4'>
          {publishedPages.map((p) => {
            return (
              <>
                <Article key={p.id} data={p} />
              </>
            );
          })}
        </div>
      </MainWrapper>
    </>
  );
}
