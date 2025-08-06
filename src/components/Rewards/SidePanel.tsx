import directus from '@/lib/directus';

import { readSingleton, readItems } from '@directus/sdk';
import RewardsCheck from '../CallToAction/RewardsCheck';
import CallToAction from '../CallToAction/CallToAction';
import Link from 'next/link';
import heroData from '../Hero/heroData';

import { Provider } from '@/lib/directus';
type RankedProvider = Provider & {
  avgPerformance: number;
  stability: number;
  score: number;
};

async function getEpochsNews() {
  const news = await directus.request(
    readItems('Articles', {
      fields: [
        'title',
        'slug',
        'status',
        { Category: ['slug'] },
        'date_created',
      ],
      filter: {
        status: { _eq: 'published' },
        Category: { slug: { _eq: 'epoch-news' } },
      },
      sort: ['-date_created'],
    })
  );
  return news;
}

const getCallToAction = async () => {
  const cta = await directus.request(readSingleton('CallToAction'));
  return cta;
};
export default async function SidePanel(props: {
  providers: RankedProvider[];
}) {
  const news = await getEpochsNews();
  const hero = await heroData();
  const providers = props.providers.slice(0, 5);
  return (
    <>
      <CallToAction data={hero.callToAction} />
      <br />
      <div className='w-full bg-primary p-5 rounded-t-lg'>
        <h3 className='text-white text-[20px] font-bold'>Related News</h3>
      </div>
      <ul className='bg-slate-900 p-5 rounded-b-md'>
        {news.map((i) => {
          const cDate = new Date(i.date_created);
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          return (
            <>
              <li key={i.slug}>
                <Link
                  className='flex flex-row min-h-16 gap-2 py-3'
                  href={`/news/${i.slug}`}
                >
                  <div className='w-16 h-16 bg-white rounded-md'></div>
                  <div>
                    <h4 className='text-white font-bold'>{i.title}</h4>
                    <p className='text-white'>
                      {cDate.toLocaleDateString('en-US', options)}
                    </p>
                  </div>
                </Link>
              </li>
            </>
          );
        })}
      </ul>
      {/*<br />
      <div className='w-full bg-primary p-5 rounded-t-lg'>
        <h3 className='text-white text-[20px] font-bold'>
          Top Provider Epoch Snapshot
        </h3>
      </div>
      <ul className='bg-slate-900 p-5 rounded-b-md'>
        {providers.map((e) => {
          return (
            <>
              <li>
                <span className='text-white font-bold'>{e.provider_name}</span>
              </li>
            </>
          );
        })}
      </ul>*/}
    </>
  );
}
