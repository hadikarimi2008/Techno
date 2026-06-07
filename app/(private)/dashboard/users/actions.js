"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId) {
  const client = await clerkClient();

  await client.users.deleteUser(userId);

  revalidatePath("/admin/users");
}

export async function banUserAction(userId) {
  const client = await clerkClient();

  await client.users.banUser(userId);

  revalidatePath("/admin/users");
}

export async function unbanUserAction(userId) {
  const client = await clerkClient();

  await client.users.unbanUser(userId);

  revalidatePath("/admin/users");
}

export async function updateUserAction(userId, data) {
  const client = await clerkClient();

  await client.users.updateUser(userId, {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
  });

  revalidatePath("/admin/users");
}
