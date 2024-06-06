'use client';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import clsx from 'clsx';
import { FC } from 'react';
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  activeClassName?: string;
}

const Link: FC<LinkProps> = ({
  children,
  activeClassName,
  className,
  href,
  ...props
}) => {
  const pathname = usePathname();
  return (
    <NextLink
      {...props}
      href={href}
      className={clsx(href === pathname && activeClassName, className)}
    >
      {children}
    </NextLink>
  );
};

export default Link;
