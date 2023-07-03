import Link, { LinkProps } from 'next/link';
import { FC } from 'react';

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
  transparent?: boolean;
  circular?: boolean;
  tealText?: boolean;
  bigText?: boolean;
}

export const LinkButton: FC<ButtonProps> = ({
  children,
  as,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  transparent = false,
  circular = false,
  tealText = false,
  bigText = false,
}) => {
  let className = transparent
    ? `${
        bigText ? 'text-lg' : 'text-md'
      } p-2 px-3 hover:text-teal-500 font-medium whitespace-nowrap ${
        tealText ? 'text-teal-700 bold' : ''
      } `
    : `${
        bigText ? 'text-lg' : 'text-md'
      } p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium hover:bg-teal-500 ${
        circular ? 'rounded-full p-2' : 'rounded-md'
      }`;

  if (!transparent) {
  }

  return (
    <Link
      as={as}
      href={href}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      className={className}
    >
      {children}
    </Link>
  );
};
