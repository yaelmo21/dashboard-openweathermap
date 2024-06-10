import { LocationWrap } from '@/components';
import { QueryParams } from '@/interfaces';
import { Metadata } from 'next';
interface Props {
  searchParams: QueryParams;
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Dashboard de la aplicación de clima con Next.js y Tailwind CSS  🌦️',
  authors: [
    {
      name: 'Yael Ruiz',
    },
  ],
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams ?? {};

  return (
    <div className='py-10'>
      <header>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white'>
            Dashboard
          </h1>
        </div>
      </header>
      <main className='mt-10 overflow-y-auto'>
        <div className='mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-2 h-full overflow-y-auto'>
          <LocationWrap query={query} />
        </div>
      </main>
    </div>
  );
}
