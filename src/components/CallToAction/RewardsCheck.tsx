import type { CallToAction } from '@/lib/directus';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function RewardsCheck(props: { data: any }) {
  let target = '_SELF';
  return (
    <div className='bg-primary pt-5 pl-5 pr-5 pb-2 rounded-xl shadow-lg text-center text-white'>
      <h3 className='text-[20px] font-bold'>
        Check the <i className='text-orange-600'>Rewards!</i>
      </h3>
      <div className='bg-white flex flex-row gap-2 p-1 mt-5 mr-5 ml-5 mb-2 justify-between rounded-md shadow-sm'>
        <Link
          key={props.data.delegating.id}
          href='/rewards'
          className='text-white bg-orange-600 w-full font-bold rounded-md p-3'
        >
          Use the Tool!
        </Link>
      </div>
      <p className='text-[12px] font-ultralight'>with us!</p>
    </div>
  );
}
