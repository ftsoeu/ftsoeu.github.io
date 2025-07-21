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
          icon: 'tools',
        },
        { label: 'Rewards', src: 'https://rewards.ftso.eu', icon: 'tools' },
        { label: 'New Rewards UI', src: '/rewards', icon: 'tools' },
      ],
    },
    {
      label: 'Contact Us',
      src: '/contact-us',
      icon: 'info',
      children: [
        { label: 'Twitter', src: socialData().twitter, icon: 'info' },
        { label: 'Telegram', src: socialData().telegram, icon: 'info' },
        { label: 'YouTube', src: socialData().youtube, icon: 'info' },
        { label: 'Discord', src: socialData().discord, icon: 'info' },
      ],
    },
  ] as NavigationBar;
};

export default navbarData;
