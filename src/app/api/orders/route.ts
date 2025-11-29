/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Order from "models/Order";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(req: Request) {
  const body = await req.json();
  const { totalPrice, products } = body;

  try {
    const cookieStore = await cookies();
    const token: any = cookieStore.get("accessToken")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // connect to database
    await db.connect();

    // insert order to database
    const order = new Order({
      userId: payload?.id,
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
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token: any = cookieStore.get("accessToken")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    // connect to database
    await db.connect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;

    const queryCondition = { userId: payload.id };

    const totalOrders = await Order.countDocuments(queryCondition);

    const totalPages = Math.ceil(totalOrders / limit);
    const orders = await Order.find(queryCondition)
      .populate([
        { path: "userId", select: "name family phone" },
        { path: "products.productId", select: "name price" },
      ])
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    return NextResponse.json(
      {
        data: orders,
        state: true,
        message: "عملیات با موفقیت انجام شد",
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
