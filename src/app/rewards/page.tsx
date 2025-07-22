import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import { Paginator } from '@/components/Rewards/Paginator';
import { Providers } from '@/components/Rewards/Providers';
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
  console.log('heres we go?');
  console.log(currentEpoch[0]);
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
        <div className='grid w-full grid-cols-8 lg:grid-cols-1 gap-4'>
          <h1 className='mt-5'>
            Current Epoch{' '}
            <span className='bg-primary text-white p-3 rounded-sm'>
              {epoch}
            </span>
          </h1>
          <Paginator currentPage={epoch} pages={p} />
          <Providers providers={providers} />
        </div>
        <div className='grid w-full grid-cols-8 lg:grid-cols-1 gap-4'>Test</div>
      </MainWrapper>
    </>
  );
}
