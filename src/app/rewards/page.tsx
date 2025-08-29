import Common from '@/components/Hero/Common';
import MainWrapper from '@/components/MainWrapper';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Common title={`Choose the Network!`} />
      <MainWrapper isNavbar>
        <div className='grid w-full grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
          <div className=''>
            <Link
              className='button w-full p-5 bg-primary rounded-md text-white'
              href='/flare/rewards'
            >
              Flare
            </Link>
          </div>
          <div>
            <Link
              className='button w-full p-5 bg-orange-600 rounded-md text-white'
              href='/songbird/rewards'
            >
              Songbird
            </Link>
          </div>
        </div>
      </MainWrapper>
    </>
  );
}
