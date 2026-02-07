"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

// تنظیمات کلاودیناری
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// تابع کمکی برای آپلود
async function uploadToCloudinary(file) {
  if (!file || typeof file === "string" || file.size === 0) return null;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "nextjs_store_products" }, (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      })
      .end(buffer);
  });
}

export async function saveProduct(formData) {
  // --- بخش آپلود عکس ---
  const imageFile = formData.get("imageFile");
  let imageUrl = formData.get("img") || ""; // مقدار پیش‌فرض اگر عکسی نبود

  if (imageFile) {
    const uploadedUrl = await uploadToCloudinary(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }
  // ---------------------

  const data = {
    title: formData.get("title"),
    img: imageUrl, // استفاده از آدرس آپلود شده
    description: formData.get("description"),
    price: parseFloat(formData.get("price")) || 0,
    rate: parseFloat(formData.get("rate")) || 0,
    quantity: parseInt(formData.get("quantity")) || 0,
    category: formData.get("category"),
    createdAt: formData.get("createdAt")
      ? new Date(formData.get("createdAt"))
      : new Date(),
    updatedAt: new Date(),
    colors: formData.get("colors")
      ? formData
          .get("colors")
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c !== "")
      : [],
  };

  try {
    await prisma.product.create({ data });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Create Error:", error);
    return { success: false, error: "Error creating product" };
  }

  redirect("/dashboard");
}

export async function updateProduct(productId, formData) {
  // --- بخش آپلود عکس برای ویرایش ---
  const imageFile = formData.get("imageFile");
  let imageUrl = formData.get("img"); // آدرس فعلی در دیتابیس

  if (imageFile && imageFile.size > 0) {
    const uploadedUrl = await uploadToCloudinary(imageFile);
    if (uploadedUrl) imageUrl = uploadedUrl;
  }
  // --------------------------------

  const data = {
    title: formData.get("title"),
    img: imageUrl,
    description: formData.get("description"),
    price: parseFloat(formData.get("price")) || 0,
    rate: parseFloat(formData.get("rate")) || 0,
    quantity: parseInt(formData.get("quantity")) || 0,
    category: formData.get("category"),
    updatedAt: new Date(),
    colors: formData.get("colors")
      ? formData
          .get("colors")
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c !== "")
      : [],
  };

  try {
    await prisma.product.update({
      where: { id: Number(productId) },
      data,
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Error" };
  }

  redirect("/dashboard");
}

export async function deleteProduct(productId) {
  if (!productId) return;
  try {
    await prisma.product.delete({
      where: { id: Number(productId) },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Error" };
  }
}
