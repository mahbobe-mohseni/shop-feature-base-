import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    return NextResponse.json(
      { data: null, message: "با موفقیت خارج شدید", state: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, message: "عملیات خروج ناموفق بود", state: false },
      { status: 500 }
    );
  }
}
