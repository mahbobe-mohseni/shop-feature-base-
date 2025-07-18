import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
