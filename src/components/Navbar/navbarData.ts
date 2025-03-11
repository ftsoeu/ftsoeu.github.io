import type { NavigationBar } from '@/lib/types';

import socialData from '../Social/socialData';

const navbarData = () => {
  return [
    { label: 'Home', src: '/', icon: 'home' },
    { label: 'News', src: '/news', icon: 'news' },
    {
      label: 'dApps & Tools',
      src: '/dapps',
      icon: 'tools',
      children: [
        {
          label: 'EVMAllowance',
          src: 'https://evmallowance.com',
          icon: 'home',
        },
        { label: 'Rewards', src: 'https://rewards.ftso.eu', icon: 'home' },
      ],
    },
    {
      label: 'Contact Us',
      src: '/contact-us',
      icon: 'info',
      children: [
        { label: 'Twitter', src: socialData().twitter, icon: 'home' },
        { label: 'Telegram', src: socialData().telegram, icon: 'home' },
        { label: 'YouTube', src: socialData().youtube, icon: 'home' },
        { label: 'Discord', src: socialData().discord, icon: 'home' },
      ],
    },
  ] as NavigationBar;
};

export default navbarData;
