import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";

export default function Headless() {
  return (
    <>
      <h1>Headless Page</h1>
      <Menu>
        <MenuButton>My account</MenuButton>
        <MenuItems anchor="bottom">
          <MenuItem>
            <a
              className="block data-[focus]:bg-blue-100"
              href="https://www.google.com/"
            >
              Google
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="block data-[focus]:bg-blue-100"
              href="https://www.naver.com/"
            >
              Naver
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/license">
              License
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
      <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
        Save changes
      </Button>
    </>
  );
}
