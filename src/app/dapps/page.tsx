import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import Dapps from '@/components/Card/Dapps';

export const dynamic = 'force-static';

export default async function Page({ params }: any) {
  const publishedPages = [
    {
      id: '1',
      cover: '/images/background-dalle-a.webp',
      title: 'Pairs Listing',
      content: '',
      slug: '/dapps/pairs',
      author: { name: 'Ftso.eu' },
      published_date: '',
      status: '',
    },
  ];
  return (
    <>
      <Common title='Our Dapps' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-4 gap-4'>
          {publishedPages.map((p) => {
            return (
              <>
                <Dapps key={p.id} data={p} />
              </>
            );
          })}
        </div>
      </MainWrapper>
    </>
  );
}
