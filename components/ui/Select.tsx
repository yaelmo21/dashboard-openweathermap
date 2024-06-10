'use client';
import { FC, useId } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name?: string;
  label?: string;
  value?: Option | null;
  onChange?: (value: Option) => void;
  options: Option[];
  classNameLabel?: string;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  classNameLabel,
  disabled,
}) => {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={id}
          className={clsx(
            'block text-sm font-medium leading-6 text-gray-900 mb-2 dark:text-gray-200',
            classNameLabel,
          )}
          aria-label={label}
        >
          {label}
        </label>
      )}
      <Listbox
        as='div'
        id={id}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      >
        {({ open }) => (
          <div className='relative mt-2'>
            <ListboxButton
              className={clsx(
                'relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6',
                'bg-white text-gray-900 ring-gray-300 focus:ring-indigo-600',
                'dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:focus:ring-indigo-500',
                disabled &&
                  'bg-gray-100 text-gray-400 dark:bg-gray-500 dark:text-gray-500',
              )}
            >
              <span className='block truncate'>
                {value ? value.label : 'Seleccione un elemento'}
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400 dark:text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </ListboxButton>

            <Transition
              show={open}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <ListboxOptions
                className={clsx(
                  'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm',
                  'bg-white text-gray-900 ring-black',
                  'dark:bg-gray-800 dark:text-white dark:ring-gray-700',
                )}
              >
                {options.map((option) => (
                  <ListboxOption
                    key={option.value}
                    className={({ active }) =>
                      clsx(
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                        active ? 'bg-indigo-600 text-white' : '',
                        !active ? 'text-gray-900 dark:text-white' : '',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate',
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600',
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default Select;
