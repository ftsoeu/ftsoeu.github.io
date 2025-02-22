import type { Article } from '@/lib/directus';
import Link from 'next/link';

export default function Article(props: { data: Article }) {
  return (
    <div key={props.data.id} className='bg-primary rounded-md'>
      <div className='w-full mb-3'>
        <img
          src={props.data.cover}
          alt={props.data.title}
          className='rounded-md'
        />
      </div>
      <div className=' p-3 pb-5'>
        <Link href={`${props.data.slug}`} className='text-white'>
          {props.data.title}
        </Link>
      </div>
    </div>
  );
}
