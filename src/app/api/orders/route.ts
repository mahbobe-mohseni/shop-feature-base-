/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Order from "models/Order";

export async function POST(req: Request) {
  const body = await req.json();
  const { totalPrice, products } = body;

  try {
    // connect to database
    await db.connect();

    const userId = "687b810c00842a7496489b50";

    // insert order to database
    const order = new Order({
      userId,
      totalPrice,
      products,
    });
    await order.save();

    return NextResponse.json(
      { data: order, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  } finally {
    // disconnect from database
    await db.destroyed();
  }
}
