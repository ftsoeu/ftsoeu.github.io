import { SocialIcon } from 'react-social-icons';

export default function TelegramIcon(props: { url: string }) {
  return (
    <SocialIcon label='Ftso.eu' className='ftso-icon-set' url={props.url} />
  );
}
