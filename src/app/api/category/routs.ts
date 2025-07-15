// app/api/categories/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";
import Category from "models/Category";

// ایجاد دسته‌بندی جدید
export async function POST(req: Request) {
  const { name, slug } = await req.json();

  try {
    await db.connect();
    const category = await Category.create({ name, slug });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "ایجاد دسته‌بندی ناموفق بود." }, { status: 500 });
  }
}

// دریافت همه دسته‌بندی‌ها
export async function GET() {
  try {
    await db.connect();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "خواندن دسته‌بندی‌ها ناموفق بود." }, { status: 500 });
  }
}
