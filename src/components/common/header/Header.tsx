import React from "react";
import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../../../atoms";

import Logo from "./Logo";
import Navigation from "./Navigation";
import Button from "./Button";
import Cart from "./Cart";
import Search from "./Search";

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header(props: HeaderProps): JSX.Element {
  const categories = useRecoilValue(categoriesAtom);

  return (
    <HeaderContainer>
      <div className="header-left flex space-x-6">
        <Logo title="React Shop" />
        <Navigation options={categories} />
      </div>
      <div className="header-right">
        <ul className="flex space-x-4 items-center">
          <li>
            <Button type="theme" />
          </li>
          <li>
            <Search />
          </li>
          <li>
            <Cart />
          </li>
        </ul>
      </div>
    </HeaderContainer>
  );
}

function HeaderContainer({ children }: any) {
  return (
    <header className="w-full fixed top-0 left-0 h-16 shadow z-10 bg-white font-bold text-black dark:bg-gray-800 dark:text-white">
      <div className="w-11/12 h-full flex max-w-screen-xl justify-between my-0 mx-auto items-center">
        {children}
      </div>
    </header>
  );
}
