"use client"

import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

const Dashboard = () => {
  // Sample data
  const salesData = [
    { month: "فروردین", sales: 4000 },
    { month: "اردیبهشت", sales: 3000 },
    { month: "خرداد", sales: 2000 },
    { month: "تیر", sales: 2780 },
    { month: "مرداد", sales: 1890 },
    { month: "شهریور", sales: 2390 },
  ]

  const categoryData = [
    { name: "الکترونیکی", value: 35 },
    { name: "پوشاک", value: 25 },
    { name: "کتاب", value: 20 },
    { name: "سایر", value: 20 },
  ]

  const COLORS = ["#6B5BFF", "#00BCD4", "#FF9800", "#4CAF50"]

  const stats = [
    { label: "درآمد کل", value: "۲,۴۵۰,۰۰۰ تومان", icon: DollarSign, color: "text-blue-500" },
    { label: "تعداد سفارشات", value: "۲۸۵", icon: ShoppingCart, color: "text-green-500" },
    { label: "تعداد مشتریان", value: "۱,۲۵۰", icon: Users, color: "text-purple-500" },
    { label: "رشد فروش", value: "+۳۲%", icon: TrendingUp, color: "text-orange-500" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">خوش آمدید!</h1>
        <p className="text-muted-foreground mt-2">خلاصه‌ای از عملکرد فروشگاه</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <Icon className={`${stat.color} w-8 h-8`} />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
