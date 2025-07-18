import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import db from "@/lib/db";
import User from "models/User";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { phone, password } = body;

  try {
    // connect to database
    await db.connect();

    const user = await User.findOne({ phone });
    const isPasswordValid = await compare(password, user?.password);
    if (!user || !isPasswordValid) {
      return NextResponse.json(
        {
          data: null,
          state: false,
          message: "نام کاربری یا رمز عبور اشتباه است.",
        },
        { status: 401 }
      );
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT({
      id: user._id.toString(),
      phone: user.phone,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(secret);

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

    await db.destroyed();

    return NextResponse.json({ data: null, state: true }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { data: null, state: false, message: "عملیات ورود ناموفق بود" },
      { status: 500 }
    );
  }
}
