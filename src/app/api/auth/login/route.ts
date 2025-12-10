
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import db from "@/lib/db";
import User from "models/User";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  // GET - POST - PUT - PATCH - DELETE
  const body = await req.json();
  const { phone, password } = body;

  try {
    // connect to database
    await db.connect();
 
    // find user
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          state: false,
          message: "خطایی در دریافت اطلاعات رخ داده است.",
        },
        { status: 400 }
      );
    }
    const isPasswordValid = await compare(password, user?.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          data: null,
          state: false,
          message: "نام کاربری یا رمز عبور اشتباه است.",
        },
        { status: 401 }
      );
    }

    // generate token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({
      id: user._id.toString(),
      phone: user.phone,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

    // set token to cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });

    return NextResponse.json(
      { data: null, state: true, message: "عملیات با موفقیت انجام شد" },
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
