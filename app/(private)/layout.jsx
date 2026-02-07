import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({ children }) {
  const user = await currentUser();

  const isAdmin = user?.privateMetadata?.isAdmin;

  if (!isAdmin) {
    redirect("/");
  }

  return <div className="admin-container">{children}</div>;
}
