import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/16/solid";

interface Props {
  onClick: () => void;
}

export default function ButtonHeadless({ onClick }: Props) {
  return (
    <Menu>
      <MenuButton className="flex items-center justify-center">
        <ChevronDownIcon className="size-4 fill-black" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border hover:bg-gray-100 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={onClick}
            className="group flex w-full items-center gap-2 rounded-lg data-[focus]:bg-white/10"
          >
            <PencilIcon className="size-4 fill-white/30 z-50"/>
            Delete
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
              ⌘E
            </kbd>
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
    // </div>
  );
}
