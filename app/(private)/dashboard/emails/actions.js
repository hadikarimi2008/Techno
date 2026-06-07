"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id) {
  await prisma.contactMessage.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/emails");
}