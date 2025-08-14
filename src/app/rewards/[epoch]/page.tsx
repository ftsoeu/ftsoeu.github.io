import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import directus, { Provider } from '@/lib/directus';
import { readItems } from '@directus/sdk';

import { Providers } from '@/components/Rewards/Providers';
import { Paginator } from '@/components/Rewards/Paginator';
import SidePanel from '@/components/Rewards/SidePanel';
import { rankProviders } from '../page';

interface PageProps {
  params: {
    epoch: string;
  };
}

export async function generateStaticParams() {
  const pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
      sort: ['-epoch'],
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
      sort: ['-epoch'],
      filter: { epoch: { _eq: params.epoch as number } },
    })
  );

  const currentEpoch = pages;
  let pageList = await directus.request(
    readItems('Rewards', {
      fields: ['epoch'],
      sort: ['-epoch'],
    })
  );
  let pList = pageList.map((p) => p.epoch);
  const epoch = currentEpoch[0].epoch;
  const providers = currentEpoch[0].output.providers as Provider[];
  const topProviders = rankProviders(providers);
  return (
    <>
      <Common title='REWARDS' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-3 gap-4 mt-8'>
          <div className='col-span-2'>
            <Paginator currentPage={epoch} pages={pList} />
            <Providers providers={providers} />
            <Paginator currentPage={epoch} pages={pList} />
          </div>
          <div>
            <SidePanel providers={topProviders} />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
