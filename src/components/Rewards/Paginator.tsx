import Link from 'next/link';
import { Button } from '../ui/button';

export function Paginator(props: { currentPage: number; pages: number[] }) {
  let p = props.pages;
  return (
    <>
      <div className='flex flex-row-reverse'>
        {p.map((b) => {
          if (b == props.currentPage) {
            return (
              <span
                className='button text-primary rounded-sm p-3 m-1'
                key={b.toString()}
              >
                <b>{b.toString()}</b>
              </span>
            );
          } else {
            return (
              <Link
                className='button bg-primary text-white rounded-sm p-3 m-1'
                key={b.toString()}
                href={`/rewards/${b.toString()}`}
              >
                {b.toString()}
              </Link>
            );
          }
        })}
      </div>
    </>
  );
}
