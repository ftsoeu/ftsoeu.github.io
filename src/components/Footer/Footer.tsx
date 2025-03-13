'use client';
import Link from 'next/link';
import MainWrapper from '@/components/MainWrapper';

import useNavbarStore from '@/components/Navbar/useNavbarStore';
import Social from '@/components/Social/Social';

export default function Footer() {
  const { isMobile } = useNavbarStore();
  const year = new Date().getFullYear();
  return (
    <MainWrapper>
      <MainWrapper isNavbar className='bg-red'>
        <div>
          <Link href='/privacy'>privacy</Link>
        </div>
        <div>
          {isMobile && `© ${year} FTSO.eu`}
          {!isMobile && `© ${year} FTSO.eu. All rights reserved.`}
        </div>
        <div>
          <Social />
        </div>
      </MainWrapper>
    </MainWrapper>
  );
}
