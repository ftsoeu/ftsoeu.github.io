import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CallToAction from '@/components/CallToAction/CallToAction';
import { ReactNode } from 'react';
import heroData from '@/components/Hero/heroData';
import RewardsCheck from '@/components/CallToAction/RewardsCheck';

interface ReadLayoutProps {
  children: ReactNode;
}

export default async function ReadLayout({ children }: ReadLayoutProps) {
  const hero = await heroData();
  return (
    <>
      <Breadcrumb />
      <div className='container mt-10'>
        <div className='flex flex-col justify-between lg:flex-row'>
          <article className='basis-2/3 '>{children}</article>
          <div className='basis-1/3 pt-3 lg:pt-0 lg:pl-2'>
            <CallToAction data={hero.callToAction} />
            <br />
            <RewardsCheck data={hero.callToAction} />
          </div>
        </div>
      </div>
    </>
  );
}
