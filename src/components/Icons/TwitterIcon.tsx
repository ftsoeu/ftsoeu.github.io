import { SocialIcon } from 'react-social-icons';
import useNavbarStore from '@/components/Navbar/useNavbarStore';

export default function TwitterIcon(props: { url: string }) {
  const { isMobile } = useNavbarStore();
  const classes = isMobile ? 'ftso-icon-set-mobile' : 'ftso-icon-set';
  return <SocialIcon label='Ftso.eu' className={classes} url={props.url} />;
}
