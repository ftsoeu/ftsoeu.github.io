import heroData from '@/components/Hero/heroData';
import CanvasWrapper from '@/components/Hero/CanvasWrapper';
import CallToAction from '@/components/CallToAction/CallToAction';
import parse from 'html-react-parser';
import Banner from '../Banner/Banner';
import bannerData from '../Banner/bannerData';
import Blocks from '../Block/Blocks';

export default async function Main(props: { canvas?: boolean }) {
  const isCanvas = props.canvas || false;
  const hero = await heroData();
  const banner = await bannerData();
  return (
    <>
      {isCanvas ? (
        <CanvasWrapper>hi world</CanvasWrapper>
      ) : (
        <>
          <div className='w-full main-container h-screen overflow-hidden bg-hero-pattern bg-cover bg-center bg-opacity-100 p-0 mx-auto'>
            <div className='container h-full  text-slate-300'>
              <div className='flex w-full my-50 h-full flex-col lg:flex-row items-stretch justify-between'>
                <div className='my-auto mt-10 text-wrap backdrop-blur-xl p-10 pt-5 rounded-2xl shadow-md lg:mt-auto lg:mx-auto lg:basis-2/3 lg:max-w-[70%] flex-grow'>
                  <h1 className='text-[32px] text-wrap ftso-text-shadow text-[#ddf]'>
                    {parse(hero.title)}
                  </h1>
                  <h2 className='text-[22px] text-[#ddf] ftso-text-shadow text-justify font-thin'>
                    {parse(hero.description)}
                  </h2>
                </div>
                <div className='flex justify-center items-center w-auto grow-0 my-auto basis-2/3 lg:m-auto'>
                  <CallToAction data={hero.callToAction} />
                </div>
              </div>
            </div>
          </div>

          <Banner title={banner.title} description={banner.description} />

          <Blocks />

          {/*<div className='text-center py-8'>
            <p className='text-lg font-semibold'>
              We supply Signals under a set of main principles and rules:
            </p>
            <div className='flex justify-center lg:space-x-4 mt-4 text-gray-700 font-medium'>
              <span>Accuracy</span>
              <span>|</span>
              <span>Resiliency</span>
              <span>|</span>
              <span>Scalability</span>
              <span>|</span>
              <span>Privacy</span>
              <span>|</span>
              <span>Transparency</span>
            </div>
          </div>*/}
        </>
      )}
    </>
  );
}
