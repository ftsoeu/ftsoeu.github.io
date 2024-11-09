import Link from 'next/link';
import MainWrapper from '../MainWrapper';

export default function Footer() {
  return (
    <MainWrapper>
      <MainWrapper isNavbar className='bg-red'>
        <div>
          <Link href='/link'>privacy</Link>
        </div>
        <div>© 2024 FTSO.eu. All rights reserved.</div>
        <div>social - todo</div>
      </MainWrapper>
    </MainWrapper>
  );
}
