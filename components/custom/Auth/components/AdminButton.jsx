"use client"
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";

const AdminButton = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="Dashboard"
          labelIcon={<LayoutDashboard size="sm" />}
          href="/dashboard"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default AdminButton;
