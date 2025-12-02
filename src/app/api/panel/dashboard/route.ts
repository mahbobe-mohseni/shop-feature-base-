import db from "@/lib/db";
import Order from "models/Order";
import Product from "models/Product";
import User from "models/User";
import { NextResponse } from "next/server";
import { pathOr } from "ramda";

export async function GET(request: Request) {
  try {
    // connect to database
    await db.connect();

    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalIncomeData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$totalPrice" },
        },
      },
    ]);
    const totalIncome = pathOr(0, ["0", "totalIncome"], totalIncomeData);
    const grouthData = await Order.aggregate([
      {
        $facet: {
          currentMonth: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(
                    new Date().setMonth(new Date().getMonth() - 1)
                  ),
                },
              },
            },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
          ],
          previousMonth: [
            {
              $match: {
                createdAt: {
                  $gte: new Date(
                    new Date().setMonth(new Date().getMonth() - 2)
                  ),
                  $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                },
              },
            },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } },
          ],
        },
      },
      {
        $project: {
          current: {
            $ifNull: [{ $arrayElemAt: ["$currentMonth.total", 0] }, 0],
          },
          previous: {
            $ifNull: [{ $arrayElemAt: ["$previousMonth.total", 0] }, 0],
          },
        },
      },
      {
        $project: {
          current: 1,
          previous: 1,
          growthPercentage: {
            $cond: [
              { $eq: ["$previous", 0] },
              {
                $cond: [
                  { $eq: ["$current", 0] },
                  0,
                  100,
                ],
              },
              {
                $multiply: [
                  {
                    $divide: [
                      { $subtract: ["$current", "$previous"] },
                      "$previous",
                    ],
                  },
                  100,
                ],
              },
            ],
          },
        },
      },
    ]);

    const data = {
      totalOrders,
      totalUsers,
      totalProducts,
      totalIncome,
      grouthData: pathOr(null, ["0"], grouthData),
    };
    return NextResponse.json(
      { data, state: true, message: "عملیات با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { data: null, state: false, message: "خطایی در سمت سرور رخ داده است" },
      { status: 500 }
    );
  }
}
