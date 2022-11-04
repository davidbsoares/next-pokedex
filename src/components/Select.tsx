import * as Select from '@radix-ui/react-select';
import { CaretDown, CaretUp } from 'phosphor-react';
import { ReactNode } from 'react';

interface SelectProps {
  placeholder: string;
  children: ReactNode;
}

export const SelectInput = ({ children, placeholder }: SelectProps) => (
  <div className="flex flex-col gap-2 ">
    <Select.Root>
      <Select.Trigger
        id="country"
        className="flex justify-between gap-2 px-4 py-3 text-sm rounded bg-slate-200 text-dark outline-0"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal className="z-30">
        <Select.Content>
          <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <CaretUp size={18} />
          </Select.ScrollUpButton>
          <Select.Viewport className="px-4 py-3 text-sm rounded shadow-lg bg-slate-200 text-dark">
            {children}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
            <CaretDown size={18} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
);
