
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    // delete token from cookie
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    return NextResponse.json(
      { data: null, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
