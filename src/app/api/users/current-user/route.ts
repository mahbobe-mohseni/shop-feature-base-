/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import db from "@/lib/db";
import User from "models/User";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token)
    return NextResponse.json(
      { data: null, state: false, message: "توکن معتبر نیست" },
      { status: 401 }
    );

  try {
    // verify token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const { id } = payload as { id: string };

    // connect to database
    await db.connect();

    // find user
    const user = await User.findById(id).select("name family phone email role");

    return NextResponse.json(
      { data: user, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error)
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
