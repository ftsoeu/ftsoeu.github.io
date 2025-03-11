'use client';

import navbarData from '@/components/Navbar/navbarData';
import useNavbarStore from '@/components/Navbar/useNavbarStore';
import ButtonBar from './ButtonBar';

export default function MobileList() {
  const { isOpen } = useNavbarStore();
  const list = navbarData();
  return (
    <>
      {isOpen && (
        <ul className='absolute z-40 bg-[rgb(255,255,255)] ftso-mobile-list overflow-hidden right-0  left-0 bottom-0 flex flex-col'>
          {list.map((i) => {
            let sub = <></>;
            let btn = <ButtonBar src={i.src} label={i.label} icon={i.icon} />;
            if (i.children) {
              sub = (
                <>
                  {i.children.map((i) => {
                    return (
                      <li key={i.label} className='m-auto text-center'>
                        <ButtonBar icon={'no'} src={i.src} label={i.label} />
                      </li>
                    );
                  })}
                </>
              );
            }
            return (
              <>
                <li
                  className='w-full p-4 flex items-center justify-center'
                  key={i.label}
                >
                  {btn}
                </li>
                {sub}
              </>
            );
          })}
        </ul>
      )}
    </>
  );
}
