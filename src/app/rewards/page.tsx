import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import { Paginator } from '@/components/Rewards/Paginator';
import { Providers } from '@/components/Rewards/Providers';
import SidePanel from '@/components/Rewards/SidePanel';
import directus, { Provider } from '@/lib/directus';
import { readItems } from '@directus/sdk';

export const dynamic = 'force-static';

async function getEpochs() {
  const pages = await directus.request(
    readItems('Rewards', {
      fields: ['*'],
      sort: ['-epoch'],
    })
  );
  return pages;
}

export default async function Page({ params }: any) {
  const currentEpoch = await getEpochs();
  let p = [];
  for (let e = 0; e < currentEpoch.length; e++) {
    p.push(currentEpoch[e].epoch);
  }
  const epoch = currentEpoch[0].epoch;
  const providers = currentEpoch[0].output.providers as Provider[];
  return (
    <>
      <Common title={`REWARDS of ${epoch}`} />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-3 gap-4 mt-8'>
          <div className='col-span-2'>
            <Paginator currentPage={epoch} pages={p} />
            <Providers providers={providers} />
            <Paginator currentPage={epoch} pages={p} />
          </div>
          <div>
            <SidePanel />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
