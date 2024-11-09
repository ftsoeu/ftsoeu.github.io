import NavBar from '@/components/Navbar/NavBar';
import MobileList from '@/components/Navbar/MobileList';
import Main from '@/components/Hero/Main';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className='absolute w-full h-full'>
      <NavBar />
      <MobileList />
      <Main />
      <Footer />
    </div>
  );
}
