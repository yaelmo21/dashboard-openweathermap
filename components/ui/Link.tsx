'use client';
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import clsx from 'clsx';
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
      href={href}
      className={clsx(className, href === pathname && activeClassName)}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
