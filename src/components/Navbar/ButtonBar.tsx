import Link from 'next/link';
import { Icons } from '@/lib/icons';

import HomeIcon from '@/components/Icons/HomeIcon';
import NewsIcon from '@/components/Icons/NewsIcon';
import DappsIcon from '@/components/Icons/DappsIcon';
import InfoIcon from '@/components/Icons/InfoIcon';
import useNavbarStore from './useNavbarStore';

export default function ButtonBar(props: {
  src: string;
  label: string;
  icon?: boolean | string;
}) {
  const { isOpen, isMobile, handleOpen } = useNavbarStore();

  const toggleMenu = () => {
    if (isMobile) {
      handleOpen(!isOpen);
    }
  };

  let icon = props.icon == 'no' ? <></> : <div className='w-6 h-6'></div>;
  icon = props.icon == Icons.home ? <HomeIcon /> : icon;
  icon = props.icon == Icons.news ? <NewsIcon /> : icon;
  icon = props.icon == Icons.dapps ? <DappsIcon /> : icon;
  icon = props.icon == Icons.info ? <InfoIcon /> : icon;

  if (props.src?.startsWith('https://')) {
    return (
      <Link
        href={props.src}
        target='_blank'
        className='p-2 pr-4 flex flex-row rounded-sm  items-center hover:bg-primary hover:text-[#ffffff] hover:dark:text-white'
      >
        {icon}
        <div className='font-thin ml-2 pt-1 text-sm'>
          {props.label.toUpperCase()}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={props.src}
      onClick={() => toggleMenu()}
      className='p-2 flex flex-row rounded-sm  items-center hover:bg-primary hover:text-[#ffffff] hover:dark:text-white'
    >
      {icon}
      <div className='font-thin ml-2 pt-1 text-sm'>
        {props.label.toUpperCase()}
      </div>
    </Link>
  );
}
