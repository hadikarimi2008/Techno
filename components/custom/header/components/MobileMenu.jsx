"use client";
import React, { useState } from "react";
import { Menu, X, Instagram, Send, MessageCircle } from "lucide-react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <Menu
          className="text-black cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      <div
        className={`fixed top-0 right-0 h-screen bg-white z-[60] transition-all duration-300 ease-in-out border-l shadow-2xl ${
          isOpen ? "w-[280px] opacity-100" : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full p-10">
          <div className="flex justify-between items-center mb-10">
            <span className="text-xs font-bold tracking-widest text-gray-400">
              MENU
            </span>
            <X
              className="cursor-pointer text-gray-500"
              onClick={() => setIsOpen(false)}
              size={20}
            />
          </div>
          <nav className="flex flex-col gap-8">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium text-[#343A40]"
            >
              Home
            </Link>
            <Link
              href="/store"
              onClick={() => setIsOpen(false)}
              className="text-xl font-medium text-[#343A40]"
            >
              Store
            </Link>
            
            {/* Auth Buttons for Mobile */}
            <div className="flex flex-col gap-4 pt-4 border-t">
              <SignedOut>
                <SignInButton>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-medium text-[#343A40] hover:text-[#0056B3] transition-colors text-left"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-[#6c47ff] text-white rounded-full font-medium h-12 px-5 cursor-pointer text-base"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-medium text-[#343A40]">Account</span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </nav>
          <div className="mt-auto flex gap-6 text-gray-400 justify-center border-t pt-6">
            <Link href="#">
              <Instagram size={25} color="#000" />
            </Link>
            <Link href="#">
              <Send size={25} color="#000" />
            </Link>
            <Link href="#">
              <MessageCircle size={25} color="#000" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
