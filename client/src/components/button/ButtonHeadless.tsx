import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
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
        className="w-20 origin-top-right rounded-xl border hover:bg-red-100 bg-gray-100 p-1 text-sm/6 text-black transition duration-100 ease-out z-50 "
      >
        <MenuItem>
          <button
            onClick={onClick}
            className="group flex w-full items-center justify-center gap-2 rounded-lg p-1"
          >
            <PencilIcon className="size-4 fill-red z-50" />
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
