
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "models/Product";
import { productsMockData } from "@/data";
import Order from "models/Order";

export async function GET() {
  try {
    // connect to database
    await db.connect();

    await Product.deleteMany({}); // remove all products
    await Order.deleteMany({}); // remove all orders
    await Product.insertMany(productsMockData); // insert all products
    return NextResponse.json(
      {
        data: null,
        state: true,
        message: "عملیات با موفقیت انجام شد",
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
