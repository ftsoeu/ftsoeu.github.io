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

/*export async function generateStaticParams() {
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
}*/

export default async function Page({ params }: any) {
  let chainId = params.network == 'flare' ? 14 : 19;
  let provider_address =
    params.network == 'flare'
      ? '0xb0421af2cffb21d8a0be4087448146e4f9cbd306'
      : '0x010a16c53F33E4d93892f00897965578b55a8CFC';
  let pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
      sort: ['-epoch'],
      filter: {
        chainId: { _eq: chainId },
        epoch: { _eq: params.epoch as number },
      },
    })
  );

  const currentEpoch = pages;
  let pageList = await directus.request(
    readItems('Rewards', {
      fields: ['epoch'],
      sort: ['-epoch'],
      filter: {
        chainId: { _eq: chainId },
      },
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
            <Paginator
              network={params.network}
              currentPage={epoch}
              pages={pList}
            />
            <Providers
              providers={providers}
              providerAddress={provider_address}
            />
            <Paginator
              network={params.network}
              currentPage={epoch}
              pages={pList}
            />
          </div>
          <div>
            <SidePanel providers={topProviders} />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}

export async function generateStaticParams() {
  // Recupero gli epoch da Songbird
  const songbirdPList = await directus.request(
    readItems('Rewards', {
      fields: ['chainId', 'epoch'],
      sort: ['-epoch'],
      filter: { chainId: { _eq: 19 } },
    })
  );

  // Recupero gli epoch da Flare
  const flarePList = await directus.request(
    readItems('Rewards', {
      fields: ['chainId', 'epoch'],
      sort: ['-epoch'],
      filter: { chainId: { _eq: 14 } },
    })
  );

  // Converto i risultati nei parametri richiesti da App Router
  const songbirdParams = songbirdPList.map((item) => ({
    network: 'songbird',
    epoch: String(item.epoch),
  }));

  const flareParams = flarePList.map((item) => ({
    network: 'flare',
    epoch: String(item.epoch),
  }));

  return [...songbirdParams, ...flareParams];
}
