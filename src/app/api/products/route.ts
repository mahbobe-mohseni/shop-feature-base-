/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "models/Product";

export async function GET(request: Request) {
  try {
    // connect to database
    await db.connect();

    // await Product.insertMany(productsMockData)

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || ""; // مقدار query کاربر
    const page = searchParams.get("page") || 1;
    const pageNumber = +page;
    const limit = 20;
    // find products
    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    })
      .limit(limit)
      .skip((pageNumber - 1) * limit);

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
