import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import CallToAction from '@/components/CallToAction/CallToAction';
import { ReactNode } from 'react';
import heroData from '@/components/Hero/heroData';

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
          <article className='basis-2/3 prose prose-sm !max-w-none prose-headings:mt-0 prose-headings:mb-0 prose-p:mt-0 overflow-hidden w-full break-words whitespace-pre-wrap lg:prose lg:dark:prose-invert lg:prose-md text-wrap'>
            {children}
          </article>
          <div className='basis-1/3'>
            <CallToAction data={hero.callToAction} />
          </div>
        </div>
      </div>
    </>
  );
}
