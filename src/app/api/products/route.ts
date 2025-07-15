import { productsMockData } from "@/data";
import db from "@/lib/db";
import Product from "models/Product";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, description, price, discount, imageUrl, isNew, inStock } =
    body;

  try {
    await db.connect();

    // await Product.deleteMany();
    await Product.insertOne({
      id,
      name,
      description,
      price,
      discount,
      imageUrl,
      isNew,
      inStock,
    });

    // await Product.insertMany(productsMockData);

    return NextResponse.json(
      { data: { message: "successfully created products" } },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "عملیات درج کاربر ناموفق بود." },
      { status: 500 }
    );
  }
}
