import Link from 'next/link';
import { Button } from '../ui/button';

export function Paginator(props: {
  network: string;
  currentPage: number;
  pages: number[];
}) {
  let p = props.pages;
  let firstPage = Number(p.slice(0, 1));
  let lastPage = Number(p.slice(p.length - 1, p.length));

  let bPage = [];

  if (props.currentPage == firstPage) {
    bPage.push({ label: 'Oldest Epoch', page: lastPage });
    bPage.push({ label: 'Previous Epoch', page: firstPage - 1 });
    bPage.push({ label: 'Current Epoch', page: firstPage });
  } else if (props.currentPage == lastPage) {
    bPage.push({ label: 'Current Epoch', page: lastPage });
    bPage.push({ label: 'Next Epoch', page: lastPage + 1 });
    bPage.push({ label: 'Newest Epoch', page: firstPage });
  } else {
    if (props.currentPage - 1 == lastPage) {
      bPage.push({ label: 'Oldest Epoch', page: lastPage });
    } else {
      bPage.push({ label: 'Oldest Epoch', page: lastPage });
      bPage.push({ label: 'Previous Epoch', page: props.currentPage - 1 });
    }
    bPage.push({ label: 'Current Epoch', page: props.currentPage });
    if (props.currentPage + 1 == firstPage) {
      bPage.push({ label: 'Newest Epoch', page: firstPage });
    } else {
      bPage.push({ label: 'Next Epoch', page: props.currentPage + 1 });
      bPage.push({ label: 'Newest Epoch', page: firstPage });
    }
  }

  if (p.length >= 5) {
    return (
      <>
        <div className='flex justify-center'>
          {bPage.map((e) => {
            if (e.label == 'Current Epoch') {
              return (
                <span
                  className='w-12 button bg-primary text-white text-center rounded-sm p-3 m-1'
                  key={e.page}
                >
                  <b>{e.page}</b>
                </span>
              );
            }
            let symbol = '';
            switch (e.label) {
              case 'Previous Epoch':
                symbol = '<';
                break;
              case 'Next Epoch':
                symbol = '>';
                break;
              case 'Oldest Epoch':
                symbol = '<<';
                break;
              case 'Newest Epoch':
                symbol = '>>';
                break;
              default:
                symbol = e.label;
            }
            return (
              <>
                <Link
                  className='w-12 button bg-gray-200 text-primary font-bold text-center rounded-sm p-3 m-1'
                  key={e.page}
                  href={`/${props.network}/rewards/${e.page}`}
                >
                  {symbol}
                </Link>
              </>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <div className='flex flex-row-reverse'>
        {p.map((b) => {
          if (b == props.currentPage) {
            return (
              <span
                className='button bg-primary text-white rounded-sm p-3 m-1'
                key={b.toString()}
              >
                <b>{b.toString()}</b>
              </span>
            );
          } else {
            return (
              <Link
                className='button text-primary rounded-sm p-3 m-1'
                key={b.toString()}
                href={`/${props.network}/rewards/${b.toString()}`}
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
