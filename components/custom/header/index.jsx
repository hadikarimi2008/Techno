import React from "react";
import HeaderContainer from "./components/HeaderContainer";
import Link from "next/link";
import Auth from "../Auth";
import MobileMenu from "./components/MobileMenu";
import CartIcon from "./components/CartIcon";

export default function Header() {
  return (
    <HeaderContainer>
      <header className="w-full h-[10vh] bg-white shadow-md fixed top-0 left-0 z-50 rounded-br-3xl rounded-bl-3xl px-[6%] md:px-[4%]">
        <div className="w-full h-full flex items-center justify-around max-w-[1440px] mx-auto">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-tighter text-[#343A40]">
              TECHNO
            </h1>
          </Link>

          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary"
          >
            <Link
              href="/"
              className="text-sm font-medium text-[#343A40] hover:text-[#0056B3] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/store"
              className="text-sm font-medium text-[#343A40] hover:text-[#0056B3] transition-colors"
            >
              Store
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block mt-2">
              <Auth />
            </div>
            <CartIcon />
            <MobileMenu />
          </div>
        </div>
      </header>
    </HeaderContainer>
  );
}
