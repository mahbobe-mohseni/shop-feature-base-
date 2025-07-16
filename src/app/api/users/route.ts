import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import User from "models/User";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, family, phone, email, password } = body;

  try {
    // connect to database
    await db.connect();

    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const user = new User({
      name,
      family,
      phone,
      email,
      password: hashedPassword,
    });
    await user.save();

    return NextResponse.json(
      { data: null, state: true, message: "کاربر با موفقیت درج شد." },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { data: null, state: false, message: "عملیات درج کاربر ناموفق بود" },
      { status: 400 }
    );
  }
}
