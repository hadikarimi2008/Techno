import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ cartItems: [] }, { status: 200 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

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
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

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
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty + quantity },
        include: { product: true },
      });
    } else {
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
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const clearAll = searchParams.get("clearAll") === "true";
    const productId = searchParams.get("productId");

    if (clearAll) {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });
      return NextResponse.json({ cleared: true }, { status: 200 });
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
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
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const removeCompletely = searchParams.get("removeCompletely") === "true";

    if (removeCompletely || existingItem.qty <= 1) {
      await prisma.cartItem.delete({
        where: { id: existingItem.id },
      });
      return NextResponse.json({ removed: true }, { status: 200 });
    } else {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { qty: existingItem.qty - 1 },
        include: { product: true },
      });

      const formattedItem = {
        id: updatedItem.product.id,
        quantity: updatedItem.qty,
      };

      return NextResponse.json({ item: formattedItem }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in DELETE /api/cart:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
