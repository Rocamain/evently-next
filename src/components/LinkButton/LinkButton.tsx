import Link, { LinkProps } from 'next/link';
import { HTMLProps, FC } from 'react';

interface ButtonProps extends LinkProps {
  children: React.ReactNode;
  transparent?: boolean;
  circular?: boolean;
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
}) => {
  const className = transparent
    ? 'p-2 px-3 hover:text-teal-500 font-medium whitespace-nowrap'
    : `text-lg ${
        circular ? 'rounded-full' : 'rounded-md'
      } p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium hover:bg-teal-500`;
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
