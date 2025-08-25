/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "models/Product";
import { productsMockData } from "@/data";

export async function GET() {
  try {
    // connect to database
    await db.connect();

    // await Product.insertMany(productsMockData)

    // find user
    const products = await Product.find().limit(10);

    return NextResponse.json(
      { data: products, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  } finally {
    // disconnect from database
    await db.destroyed();
  }
}
