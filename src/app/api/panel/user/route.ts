import db from "@/lib/db";
import User from "models/User";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const { userId, name, family,phone,email } = body;

  try {
    // connect to database
    await db.connect();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        family,
        phone,
        email
      },
      { new: true }
    ).select("name family phone email");

    return NextResponse.json(
      {
        data: updatedUser,
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
  const { userId } = body;

  try {
    // connect to database
    await db.connect();

    await User.findByIdAndDelete(userId);

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