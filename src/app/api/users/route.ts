/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import User from "models/User";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, family, phone, email, password } = body;

  try {
    // connect to database
    await db.connect();

    // insert user to database
    const user = new User({
      name,
      family,
      phone,
      email,
      password,
    });
    await user.save();

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
      { data: user, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  } finally {
    // disconnect from database
    await db.destroyed();
  }
}
