import { NextResponse } from "next/server";
import db from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET() {
  await db.connect();
  const customers = await Customer.find();
  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  await db.connect();
  const body = await req.json();
  const customer = await Customer.create(body);
  return NextResponse.json(customer, { status: 201 });
}
