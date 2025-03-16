import { social_icons } from 'react-social-icons';
import Link from 'next/link';

export default function YoutubeIcon(props: { url: string }) {
  const data = social_icons.get('youtube');
  let classes = 'fill-primary w-10 h-10 rounded-full';
  return (
    <Link href={props.url} target='_BLANK'>
      <svg viewBox='0 0 64 64' className={classes}>
        <path d={data?.path} />
      </svg>
    </Link>
  );
}
