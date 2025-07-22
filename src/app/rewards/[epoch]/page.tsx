import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus, { Provider } from '@/lib/directus';
import { readItems } from '@directus/sdk';

import { Providers } from '@/components/Rewards/Providers';
import { Paginator } from '@/components/Rewards/Paginator';

interface PageProps {
  params: {
    epoch: string;
  };
}

export async function generateStaticParams() {
  const pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
    })
  );
  //console.log(pages);
  let pageList = pages.map((p) => p.epoch);
  return pages.map((page) => ({
    epoch: page.epoch.toString(),
    pages: pageList,
  }));
}

export default async function Page({ params }: any) {
  let pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
      filter: { epoch: { _eq: params.epoch as number } },
    })
  );

  const currentEpoch = pages;
  let pageList = await directus.request(
    readItems('Rewards', {
      fields: ['epoch'],
    })
  );
  let pList = pageList.map((p) => p.epoch);
  const epoch = currentEpoch[0].epoch;
  const providers = currentEpoch[0].output.providers as Provider[];
  return (
    <>
      <Common title='REWARDS' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-1 gap-4'>
          <h2 className='mt-5'>
            Epoch{' '}
            <span className='bg-primary text-white p-3 rounded-sm'>
              {epoch}
            </span>
          </h2>
          <Paginator currentPage={epoch} pages={pList} />
          <Providers providers={providers} />
        </div>
      </MainWrapper>
    </>
  );
}
