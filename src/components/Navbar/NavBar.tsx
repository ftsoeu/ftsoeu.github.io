'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import useNavbarStore from '@/components/Navbar/useNavbarStore';
import navbarData from '@/components/Navbar/navbarData';
import { navigationBarValidation, NavLink } from '@/lib/types';
import MainWrapper from '@/components/MainWrapper';
import Logo from '@/components/Icons/Logo';
import ButtonBar from './ButtonBar';
import { TypeIcons } from '@/lib/icons';
import useSubStore from './useSubStore';
import dynamic from 'next/dynamic';
import UserIcon from '../Icons/UserIcon';

//import ConnectButton from '../Connect/ConnectButton';

const ConnectButton = dynamic(() => import('../Connect/ConnectButton'), {
  ssr: false,
});

function SubMenu(props: { id: string; links: any }) {
  let { subject, isOpen } = useSubStore();
  let contentToShow = <></>;

  if (props.id == subject) {
    return (
      <ul className='w-full bg-white rounded-md'>
        {props.links.map((i: any) => {
          return (
            <li key={i.src}>
              <ButtonBar src={i.src} label={i.label} icon={i.icon} />
            </li>
          );
        })}
      </ul>
    );
  } else {
    return contentToShow;
  }
}

function DesktopNav(props: { links: NavLink[] }) {
  const { isOpen, subject, handleOpen } = useSubStore();

  const onClick = (sub: string) => {
    if (sub != subject) {
      handleOpen({ subject: sub, state: !isOpen });
    } else {
      handleOpen({ subject: undefined, state: !isOpen });
    }
  };

  return (
    <>
      <ul className='w-full flex flex-grow justify-end flex-row space-x-6 ml-auto'>
        {props.links.map((i) => {
          let sub = i.children ? (
            <SubMenu id={i.label} links={i.children} />
          ) : (
            <></>
          );
          if (i.children) {
            return (
              <li key={i.src} onClick={() => onClick(i.label)}>
                <ButtonBar
                  src={''}
                  label={i.label}
                  icon={i.icon as TypeIcons}
                />
                {sub}
              </li>
            );
          } else {
            return (
              <li key={i.src}>
                <ButtonBar
                  src={i.src}
                  label={i.label}
                  icon={i.icon as TypeIcons}
                />
              </li>
            );
          }
        })}
        <li key='connect'>
          <div className='p-2 pr-4 flex flex-row rounded-sm  items-center hover:bg-primary hover:text-[#ffffff] hover:dark:text-white'>
            <UserIcon />
            <ConnectButton />
          </div>
        </li>
      </ul>
    </>
  );
}

function MobileNav(props: { links?: NavLink[]; isOpen?: boolean }) {
  const { isOpen, handleOpen } = useNavbarStore();

  const toggleMenu = () => {
    handleOpen(!isOpen);
  };

  if (typeof props.isOpen === undefined) {
    return <>Menu is loading</>;
  }

  return (
    <>
      <button onClick={toggleMenu} className='text-gray-900 focus:outline-none'>
        {/* Icona dell'hamburger */}
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>
        </svg>
      </button>
    </>
  );
}

export default function NavBar() {
  const { isOpen, isMobile, handleMobile } = useNavbarStore();

  const isOpenState = isOpen ? `It's open` : `It's closed`;
  const isMobileState = isMobile ? `It's a Mobile` : `It's a Desktop`;

  const links = navbarData();

  useEffect(() => {
    handleMobile(window.navigator.userAgent);
  }, [isMobile, handleMobile]);

  if (navigationBarValidation.safeParse(links).success === false) {
    return <>Unable to load Navigation bar</>;
  }

  return (
    <>
      {isMobile ? (
        <MainWrapper className='shadow-md z-50 bg-[#fff]'>
          <MainWrapper isNavbar={true}>
            <Logo />
            <MobileNav />
          </MainWrapper>
        </MainWrapper>
      ) : (
        <div className='fixed p-0 w-full'>
          <div className='absolute z-51 w-full bg-white flex items-center justify-center h-16'></div>
          <div className='absolute z-52 w-full flex flex-row text-primary'>
            <div className='container m-auto'>
              <div className='float-left'>
                <Logo />
              </div>
              <div className='float-right pt-[12px]'>
                <DesktopNav links={links} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
