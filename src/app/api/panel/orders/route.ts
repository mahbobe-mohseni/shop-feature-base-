import db from "@/lib/db";
import Order from "models/Order";
import Product from "models/Product";
import { NextResponse } from "next/server";

 
export async function DELETE(req: Request) {
  const body = await req.json();
  const { orderId } = body;

  try {
    // connect to database
    await db.connect();

    await Order.findByIdAndDelete(orderId);

    return NextResponse.json(
      {
        data: null,
        state: true,
        message: "عملیات با موفقیت انجام شد",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}