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
      <Common title='REWARDS' />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <h1 className='mt-5'>
              Current Epoch{' '}
              <span className='bg-primary text-white p-3 rounded-sm'>
                {epoch}
              </span>
            </h1>
            <Paginator currentPage={epoch} pages={p} />
            <Providers providers={providers} />
          </div>
          <div>
            <SidePanel />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
