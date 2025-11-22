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

    const userId = "69217b0308338479a075e6cb";

    // insert order to database
    const order = new Order({
      userId,
      totalPrice,
      products,
    });
    await order.save();

    // Fetch and populate user + product references
    const populatedOrder = await Order.findById(order._id)
      .populate("userId", "name family phone")
      .populate("products.productId", "name price");
    return NextResponse.json(
      {
        data: populatedOrder,
        state: true,
        message: "عملیات با موفقیت انجام شد",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to DB
    await db.connect();

    const { id } = params;

    // Find one order by id
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          data: null,
          state: false,
          message: "سفارش مورد نظر یافت نشد",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: order,
        state: true,
        message: "عملیات با موفقیت انجام شد",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        state: false,
        message: "خطایی در سمت سرور رخ داده است",
      },
      { status: 500 }
    );
  }
}
