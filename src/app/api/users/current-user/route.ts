import { NextResponse } from "next/server";
import db from "@/lib/db";
import User from "models/User";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return NextResponse.json({ data: null }, { status: 401 });

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    const { id } = payload as { id: string };

    // connect to database
    await db.connect();

    const user = await User.findById(id).select("name family phone email");

    // disconnect database connection
    await db.destroyed();

    return NextResponse.json(
      { data: user, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی رخ داده است" },
      { status: 500 }
    );
  }
}
