/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import User from "models/User";

export async function PUT(req: Request) {
  const body = await req.json();
  const { userId, name, family, email } = body;

  try {
    // connect to database
    await db.connect();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        family,
        email,
      },
      { new: true }
    ).select("name family email");

    return NextResponse.json(
      { data: updatedUser, state: true, message: "عملیات با موفقیت انجام شد" },
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
