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

function DesktopNav(props: { links: NavLink[] }) {
  return (
    <>
      <ul className='w-full flex flex-grow justify-end flex-row space-x-6 ml-auto'>
        {props.links.map((i) => (
          <li key={i.src}>
            <ButtonBar src={i.src} label={i.label} icon={i.icon as TypeIcons} />
          </li>
        ))}
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
      <MainWrapper className='shadow-md bg-[#fff]'>
        <></>
        {isMobile ? (
          <>
            <MainWrapper isNavbar={true}>
              <Logo />
              <MobileNav />
            </MainWrapper>
          </>
        ) : (
          <MainWrapper isNavbar={true}>
            <Logo />
            <DesktopNav links={links} />
          </MainWrapper>
        )}
      </MainWrapper>
    </>
  );
}
