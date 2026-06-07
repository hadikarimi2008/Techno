import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }) {
  const user = await currentUser();

  const isAdmin = user?.privateMetadata?.isAdmin;

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="admin-container">
      <nav className="h-[10vh] shadow rounded-3xl my-[2%]">
        <ul className="flex justify-center items-center w-full h-full">
          <li className="px-5">
            <Link className="" href="/dashboard">
              Products
            </Link>
          </li>
          <li className="px-5">
            <Link className="" href="/dashboard/users">
              Users
            </Link>
          </li>
          <li className="px-5">
            <Link className="" href="/dashboard/emails">
              Emails
            </Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
