
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Product from "models/Product";

export async function GET(request: Request) {
  try {
    // connect to database
    await db.connect();

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || ""; // مقدار query کاربر
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("perPage") || "20", 10);

    const totalProducts = await Product.countDocuments({
      name: { $regex: q, $options: "i" },
    });

    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find({
      name: { $regex: q, $options: "i" },
    })
      .limit(limit)
      .skip((page - 1) * limit);

    return NextResponse.json(
      {
        data: products,
        state: true,
        message: "عملیات با موفقیت انجام شد",
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
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
