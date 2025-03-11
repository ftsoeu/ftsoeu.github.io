import { SocialIcon } from 'react-social-icons';

export default function YoutubeIcon(props: { url: string }) {
  return (
    <SocialIcon label='Ftso.eu' className='ftso-icon-set' url={props.url} />
  );
}
