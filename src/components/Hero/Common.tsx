import MainWrapper from '../MainWrapper';

export default function Common(props: { title: string }) {
  return (
    <div className='flex flex-auto w-full h-[250px] overflow-hidden bg-hero-pattern-news bg-cover bg-center bg-opacity-100 p-0 mx-auto'>
      <MainWrapper isNavbar>
        <h1 className='text-white text-[25px] font-bold dark:text-foreground'>
          {props.title}
        </h1>
      </MainWrapper>
    </div>
  );
}
