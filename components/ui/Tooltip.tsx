'use client';
import { FC, ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
  text?: string;
}

const Tooltip: FC<Props> = ({ children, text }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className='cursor-default group relative'
    >
      {children}
      {text ? (
        <span
          ref={tooltipRef}
          className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-500 text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap'
        >
          {text}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
