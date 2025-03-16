import TwitterIcon from '@/components/Icons/TwitterIcon';
import TelegramIcon from '@/components/Icons/TelegramIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import DiscordIcon from '@/components/Icons/DiscordIcon';
import socialData from '@/components/Social/socialData';
import { JSX } from 'react';

export default function Social() {
  const social = socialData();
  let icons: JSX.Element[] = [];

  Object.keys(social).forEach(function (key) {
    switch (key) {
      case 'twitter':
        icons.push(<TwitterIcon key={key} url={social[key]} />);
        break;
      case 'telegram':
        icons.push(<TelegramIcon key={key} url={social[key]} />);
        break;
      case 'youtube':
        icons.push(<YoutubeIcon key={key} url={social[key]} />);
        break;
      case 'discord':
        icons.push(<DiscordIcon key={key} url={social[key]} />);
        break;
    }
  });
  return (
    <div className='flex w-full gap-2 flex-row'>{icons.map((i) => i)}</div>
  );
}
