import type { CallToAction } from '@/lib/directus';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function CallToAction(props: { data: any }) {
  let target = '_SELF';
  return (
    <div className='bg-primary pt-5 pl-5 pr-5 pb-2 rounded-xl shadow-lg'>
      <h3 className='text-[20px] font-bold text-center'>
        {parse(props.data.label)}
      </h3>
      <button className='bg-white flex flex-row gap-2 p-1 mt-5 mr-5 ml-5 mb-2 rounded-md shadow-sm'>
        <Link
          key={props.data.delegating.id}
          href={props.data.delegating.URL}
          target='_BLANK'
          className='text-white bg-primary font-bold rounded-md p-3'
        >
          {props.data.delegating.Label}
        </Link>
        <div key='and' className='font-light text-w4 text-orange-600 py-3'>
          and
        </div>
        <Link
          key={props.data.delegating.id}
          href={props.data.staking.URL}
          target='_BLANK'
          className='text-white bg-primary font-bold rounded-md p-3'
        >
          {props.data.staking.Label}
        </Link>
      </button>
      <p className='text-[12px] font-ultralight text-center'>with us!</p>
    </div>
  );
}
