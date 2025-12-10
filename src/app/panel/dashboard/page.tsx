"use client"

import { DollarSign, ShoppingCart, Users, TrendingUp, Boxes } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getDashboardWidgets } from "@/services/panel/dashboard"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState<number>(0)
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [totalIncome, setTotalIncome] = useState<number>(0)
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [grouthData, setGrouthData] = useState<{
    growthPercentage: number,
    previous: number,
    current: number
  }>({ growthPercentage: 0, previous: 0, current: 0 })
  const stats = [
    { label: "درآمد کل", value: `${totalIncome.toLocaleString()} تومان`, icon: DollarSign, color: "text-blue-500" },
    { label: "تعداد سفارشات", value: totalOrders, icon: ShoppingCart, color: "text-green-500" },
    { label: "تعداد مشتریان", value: totalUsers, icon: Users, color: "text-purple-500" },
    { label: "تعداد محصولات", value: totalProducts.toLocaleString(), icon: Boxes, color: "text-red-500" },
    {
      label: "رشد فروش",
      secondLabel: "فروش ماه قبل",
      thirdLabel: "فروش ماه جاری",
      value: `%${grouthData?.growthPercentage}`,
      secondValue: grouthData?.previous,
      thirdValue: grouthData?.current,
      icon: TrendingUp,
      color: "text-orange-500",
    }
  ]

  const fetchData = async () => {
    try {
      const { data: { totalOrders: ordersCount, totalUsers: usersCount, totalIncome, totalProducts, grouthData } }: any = await getDashboardWidgets()
      setTotalOrders(ordersCount)
      setTotalUsers(usersCount)
      setTotalIncome(totalIncome)
      setTotalProducts(totalProducts)
      setGrouthData(grouthData)
    } catch { }
  }

  // فراخوانی سرویس
  useEffect(() => {
    fetchData()
  }, [])

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

                  {stat.secondLabel && <p className="text-muted-foreground text-sm">{stat.secondLabel}</p>}
                  {stat?.secondValue && <p className="text-2xl font-bold text-foreground mt-2">{stat.secondValue.toLocaleString()}</p>}

                  {stat.thirdLabel && <p className="text-muted-foreground text-sm">{stat.thirdLabel}</p>}
                  {stat?.thirdValue && <p className="text-2xl font-bold text-foreground mt-2">{stat.thirdValue.toLocaleString()}</p>}
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
