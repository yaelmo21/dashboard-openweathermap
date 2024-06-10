import { BsClouds } from 'react-icons/bs';

export default function Loading() {
  return (
    <div className='py-10 pt-10 w-full h-[calc(100vh-10rem)] flex flex-col justify-center items-center overflow-hidden'>
      <BsClouds className='block h-24 w-24 text-black dark:text-white animate-pulse animate-infinite' />
      Cargando...
    </div>
  );
}
