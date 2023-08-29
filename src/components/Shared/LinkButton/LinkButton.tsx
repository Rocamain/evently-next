import Link, { LinkProps } from 'next/link'
import React, { FC } from 'react'

interface ButtonProps extends LinkProps {
  children: React.ReactNode
  transparent?: boolean
  circular?: boolean
  tealText?: boolean
  bigText?: boolean
  target?: string
}

export const LinkButton: FC<ButtonProps> = ({
  children,
  target,
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
  const className = transparent
    ? `${
        bigText ? 'text-lg' : 'text-md'
      } p-2 px-3 hover:text-teal-500 font-medium whitespace-nowrap ${
        tealText ? 'text-teal-700 bold' : ''
      } `
    : `${
        bigText ? 'text-lg' : 'text-md'
      } p-2 px-3 whitespace-nowrap bg-teal-600 text-white font-medium hover:bg-teal-500 ${
        circular ? 'rounded-full p-2' : 'rounded-md'
      }`

  return (
    <Link
      href={href}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      className={className}
      target={target}
    >
      {children}
    </Link>
  )
}
