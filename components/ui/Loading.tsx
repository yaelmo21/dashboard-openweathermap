import { FC } from 'react';
import clsx from 'clsx';
import { CgSpinner } from 'react-icons/cg';
const sizes = {
  small: 'text-4xl',
  medium: 'text-6xl',
  large: 'text-8xl',
};
interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

const Loading: FC<LoadingProps> = ({ size = 'small' }) => {
  return (
    <div className='flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3'>
      <CgSpinner
        className={clsx('animate-spin text-black dark:text-white', sizes[size])}
      />
    </div>
  );
};

export default Loading;
