
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import AdminButton from "./components/AdminButton";

async function Auth() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;
  return (
    <div>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer mx-4">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        {isAdmin? <AdminButton /> : <UserButton />}
      </SignedIn>
    </div>
  );
}

export default Auth;
