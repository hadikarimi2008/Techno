import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET - دریافت سبد خرید کاربر
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ cartItems: [] }, { status: 200 });
    }

    console.log("GET /api/cart: Fetching cart for userId:", userId);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    console.log("GET /api/cart: Found", cartItems.length, "items for userId:", userId);

    // تبدیل به فرمت مورد نیاز
    const formattedItems = cartItems.map((item) => ({
      id: item.product.id,
      title: item.product.title,
      img: item.product.img,
      price: item.product.price,
      quantity: item.qty,
      category: item.product.category,
      rate: item.product.rate,
      description: item.product.description,
      colors: item.product.colors,
    }));

    return NextResponse.json({ cartItems: formattedItems }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST - افزودن یا به‌روزرسانی محصول در سبد خرید
export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      console.log("POST /api/cart: No userId found");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    console.log("POST /api/cart: Adding item for userId:", userId, "productId:", productId, "quantity:", quantity);

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // بررسی وجود محصول
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // بررسی وجود آیتم در سبد خرید
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: parseInt(productId),
        },
      },
    });

    let cartItem;
    if (existingItem) {
      // به‌روزرسانی تعداد
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty + quantity },
        include: { product: true },
      });
    } else {
      // ایجاد آیتم جدید
      cartItem = await prisma.cartItem.create({
        data: {
          userId,
          productId: parseInt(productId),
          qty: quantity,
        },
        include: { product: true },
      });
    }

    const formattedItem = {
      id: cartItem.product.id,
      title: cartItem.product.title,
      img: cartItem.product.img,
      price: cartItem.product.price,
      quantity: cartItem.qty,
      category: cartItem.product.category,
      rate: cartItem.product.rate,
      description: cartItem.product.description,
      colors: cartItem.product.colors,
    };

    return NextResponse.json({ item: formattedItem }, { status: 200 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

// DELETE - حذف یا کاهش تعداد محصول از سبد خرید
export async function DELETE(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const removeCompletely = searchParams.get("removeCompletely") === "true";

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: parseInt(productId),
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // اگر removeCompletely true باشد یا تعداد 1 یا کمتر باشد، حذف کامل کن
    if (removeCompletely) {
      // حذف کامل آیتم
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
      return NextResponse.json({ removed: true }, { status: 200 });
    } else if (existingItem.qty <= 1) {
      // اگر تعداد 1 یا کمتر باشد، حذف کامل کن
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
      return NextResponse.json({ removed: true }, { status: 200 });
    } else {
      // کاهش تعداد
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty - 1 },
        include: { product: true },
      });

      const formattedItem = {
        id: updatedItem.product.id,
        title: updatedItem.product.title,
        img: updatedItem.product.img,
        price: updatedItem.product.price,
        quantity: updatedItem.qty,
        category: updatedItem.product.category,
        rate: updatedItem.product.rate,
        description: updatedItem.product.description,
        colors: updatedItem.product.colors,
      };

      return NextResponse.json({ item: formattedItem }, { status: 200 });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}

