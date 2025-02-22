import type { Article } from '@/lib/directus';
import Link from 'next/link';

export default function Pairs(props: { data: any }) {
  return (
    <div key={props.data.id} className='bg-primary rounded-md'>
      <div className='w-full mb-3'>// Crypto LOGO</div>
      <div className=' p-3 pb-5'>
        <Link href={`/dapps/pairs/${props.data.id}`} className='text-white'>
          {props.data.Title}
        </Link>
      </div>
    </div>
  );
}
