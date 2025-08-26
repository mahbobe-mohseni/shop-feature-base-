/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "models/Product";
import { productsMockData } from "@/data";

export async function GET(request: Request) {
  try {
    // connect to database
    await db.connect();

    // await Product.insertMany(productsMockData)

       // گرفتن query string
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || ""; // مقدار query کاربر

    // find products
    const products = await Product.find({
      name: { $regex: q, $options: "i" }, // جستجوی نام شامل متن وارد شده (case-insensitive)
    }).limit(10);
    
    return NextResponse.json(
      { data: products, state: true, message: "عملیات با موفقیت انجام شد" },
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
