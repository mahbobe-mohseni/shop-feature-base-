import { productsMockData } from "@/data";
import db from "@/lib/db";
import Product from "models/Product";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await db.connect();

    await Product.deleteMany();

    const products = await Product.insertMany(productsMockData);

    return NextResponse.json(
      { data: { products, message: "successfully created products" } },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "عملیات درج کاربر ناموفق بود." },
      { status: 500 }
    );
  }
}
