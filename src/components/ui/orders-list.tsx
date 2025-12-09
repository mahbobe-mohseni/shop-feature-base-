import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Calendar, DollarSign, ChevronRight } from "lucide-react"
import { Button } from "./button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { useState } from "react"
import Invoice from "../invoice/Invoice"
import { formatDate } from "@/lib/utils"
import InvoiceModal from "../invoice/InvoiceModal"

interface Product {
  productId: {
    _id: string,
    name: string,
    price: number
  }
  quantity: number
}

interface Order {
  _id: string
  orderCode: number
  userId: string
  products: Product[]
  totalPrice: number
  createdAt: string
}

interface OrdersListProps {
  orders: Order[]
}

export default function OrdersList({ orders }: OrdersListProps) {


  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR")
  }

  const [isfactorModal, setIsFactorMobile] = useState(false)
  const [currentOrder, setCurrentOrder] = useState(null)
  const handleOpenFactorModal = (order: any) => {
    setCurrentOrder(order)
    setIsFactorMobile(true)
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        // TODO: get realy order status of database // change of order managment admin page
        const status = 'جدید'

        const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0)

        return (

          <Card
            key={order._id}
            className="overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
          >
            <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-750 flex items-center w-full p-2">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                    <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-base">
                      سفارش #{order.orderCode}
                    </p>
                  </div>
                </div>
                <Badge className={` bg-blue-500 text-white px-3 py-1`}>{status}</Badge>

                {/* show factor button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => handleOpenFactorModal(order)}
                >
                  نمایش فاکتور
                </Button>


              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">تاریخ سفارش</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatDate(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">تعداد محصول</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalItems} عدد</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">مجموع</p>
                    <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
                      {formatPrice(order.totalPrice)} تومان
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">تعداد کالاهای متفاوت</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.products.length} نوع</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-3">محصولات سفارش</p>
                <div className="space-y-2">
                  {order.products.map(({ productId, quantity }, idx) => (
                    <div
                      key={productId._id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-600 dark:text-blue-400">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {productId.name}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-sm font-semibold text-white dark:text-white bg-green-700/80 dark:bg-slate-700 px-3 py-1 rounded-full">
                          {productId.price} تومان
                        </span>
                        <span className="text-sm font-semibold text-white dark:text-white bg-blue-700/80 dark:bg-slate-700 px-3 py-1 rounded-full">
                          ×{quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
      <InvoiceModal data={currentOrder} visible={isfactorModal} setVisible={setIsFactorMobile} />
    </div>
  )
}
