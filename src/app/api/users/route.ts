import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, family, email } = body;

  if (!name) {
    return NextResponse.json(
      { error: "نام را حتما وارد کنید" },
      { status: 400 }
    );
  }

  try {
    const user = await db.user.create({
      data: { name, family, email },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error: any) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "عملیات درج کاربر ناموفق بود." },
      { status: 500 }
    );
  }
}
