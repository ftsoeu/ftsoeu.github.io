export default function MainWrapper(props: {
  className?: string;
  isNavbar?: boolean;
  children: (string | JSX.Element)[];
}) {
  const isNavbar = props.isNavbar ? props.isNavbar : false;
  const className = isNavbar
    ? 'container mx-auto flex justify-between items-center py-5 bg-white bg-opacity-100'
    : 'w-full sticky top-0 ' + props.className;

  return <div className={className}>{props.children}</div>;
}
