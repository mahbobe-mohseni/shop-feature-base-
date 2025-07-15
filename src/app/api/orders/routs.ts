import db from "@/lib/db";
import Order from "models/Order";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { user, products, totalPrice, status } = body;

  try {
    await db.connect();

    await Order.create({
      user,
      products,
      totalPrice,
      status,
    });

    await db.destroyed();

    return NextResponse.json({ message: "Order created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
