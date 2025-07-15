import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { name, family, email } = body;

  if (!email) {
    return NextResponse.json(
      { error: "ایمیل را حتما وارد کنید" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.create({
      data: { name, family, email },
    });

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error: unknown) {
    console.error("🚀 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "عملیات درج کاربر ناموفق بود." },
      { status: 500 }
    );
  }
}
