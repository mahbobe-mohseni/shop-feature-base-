import db from "@/lib/db";
import Order from "models/Order";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // connect to database
    await db.connect();

    const totalOrders = await Order.countDocuments();
    const data = {
      totalOrders,
    };
    return NextResponse.json(
      { data, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
