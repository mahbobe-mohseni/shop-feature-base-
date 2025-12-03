import db from "@/lib/db";
import Product from "models/Product";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const { productId, name, price, discount } = body;

  try {
    // connect to database
    await db.connect();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        discount,
      },
      { new: true }
    ).select("name price discount");

    return NextResponse.json(
      {
        data: updatedProduct,
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

export async function DELETE(req: Request) {
  const body = await req.json();
  const { productId } = body;

  try {
    // connect to database
    await db.connect();

    await Product.findByIdAndDelete(productId);

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