"use server";

import db from "@/lib/db";

type DATA = {
  name: string;
  family: string;
  email: string;
};

export async function addUser(data: DATA) {
  try {
    // get body data
    const { name, family, email } = data;

    // check validations
    if (!name) {
      return { error: "نام را حتما وارد کنید" };
    }

    // save to database
    const userData = db.user.create({
      data: { name, family, email },
    });

    // pass output
    return { data: userData };
  } catch (error) {
    console.log("🚀 ~ addUser ~ error:", error);
    return { error: "عملیات درج کاربر ناموفق بود." };
  }
}
