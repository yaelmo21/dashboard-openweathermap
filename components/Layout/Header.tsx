'use client';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, CloudIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from '../ui';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
];

const Header = () => {
  return (
    <Disclosure
      as='nav'
      className='border-b border-gray-200 bg-white  dark:bg-gray-800 dark:border-gray-700 dark:text-white fixed w-full z-10 top-0'
    >
      {({ open, close }) => (
        <>
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 justify-between'>
              <div className='flex'>
                <div className='flex flex-shrink-0 items-center'>
                  <CloudIcon className='block h-9 w-9 text-black dark:text-white' />
                </div>
                <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className='border-transparent text-gray-500 hover:border-indigo-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium dark:text-white dark:hover:text-gray-200 dark:hover:border-indigo-600'
                      activeClassName='border-indigo-500 text-gray-900 dark:text-white dark:border-indigo-500 dark:hover:text-gray-200 dark:hover:border-gray-200'
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='-mr-2 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <DisclosureButton
                  className='relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500  dark:bg-gray-800 dark:hover:bg-gray-700 '
                  aria-label={open ? 'Close main menu' : 'Open main menu'}
                >
                  <span className='absolute -inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className='sm:hidden'>
            <div className='space-y-1 pb-3 pt-2 flex flex-col'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  onClick={() => close()}
                  href={item.href}
                  className='text-start border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 block border-l-4 py-2 pl-3 pr-4 text-base font-medium 
                    dark:text-white dark:hover:text-gray-200 dark:hover:border-gray-200  dark:bg-gray-800 dark:hover:bg-gray-700  dark:pl-4 dark:pr-5 dark:py-3 dark:text-lg'
                  activeClassName='border-indigo-500 text-gray-900 dark:text-white dark:border-indigo-500 dark:hover:text-gray-200 dark:hover:border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:pl-4 dark:pr-5 dark:py-3 dark:text-lg'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
