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

type RankedProvider = Provider & {
  avgPerformance: number;
  stability: number;
  score: number;
};

export function rankProviders(providers: Provider[]): RankedProvider[] {
  return providers
    .map((p) => {
      const latest = Number(p.latest_epoch_average);
      const avg2w = Number(p.average_2_weeks);
      const avg4w = Number(p.average_4_weeks);
      const avg2m = Number(p.average_2_months);

      const averages = [avg2w, avg4w, avg2m];
      const checkVariation = (avg: number) =>
        avg !== 0 ? Math.abs(latest - avg) / avg : 1;

      const stability = Math.max(
        checkVariation(avg2w),
        checkVariation(avg4w),
        checkVariation(avg2m)
      );

      const avgPerformance = (latest + avg2w + avg4w + avg2m) / 4;

      // SCORE: penalizza instabilità
      const score = avgPerformance / (1 + stability * 2); // 2 = peso penalità instabilità

      return {
        ...p,
        avgPerformance,
        stability,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);
}

export default async function Page({ params }: any) {
  const currentEpoch = await getEpochs();
  let p = [];
  for (let e = 0; e < currentEpoch.length; e++) {
    p.push(currentEpoch[e].epoch);
  }
  const epoch = currentEpoch[0].epoch;
  const providers = currentEpoch[0].output.providers as Provider[];
  const topProviders = rankProviders(providers);

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
            <SidePanel providers={topProviders} />
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
