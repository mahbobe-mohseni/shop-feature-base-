"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Truck, Minus, Plus, Trash2, CreditCard, MapPin, Phone, Tag, ArrowRight } from "lucide-react"

interface CartItem {
  id: string
  name: string
  partNumber: string
  price: number
  quantity: number
  image: string
  inStock: boolean
  category: string
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "فیلتر روغن نیسان پیکاپ",
      partNumber: "15208-65F0C",
      price: 45000,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
      category: "فیلتر",
    },
    {
      id: "2",
      name: "لنت ترمز جلو نیسان وانت",
      partNumber: "41060-VK025",
      price: 180000,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      inStock: true,
      category: "ترمز",
    },
    {
      id: "3",
      name: "شمع موتور نیسان پیکاپ",
      partNumber: "22401-ED815",
      price: 25000,
      quantity: 4,
      image: "/placeholder.svg?height=80&width=80",
      inStock: false,
      category: "موتور",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState("")

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "nissan10") {
      setAppliedPromo("NISSAN10")
      setPromoCode("")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 500000 ? 0 : 50000
  const total = subtotal - discount + shipping

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">سبد خرید</h1>
              <p className="text-sm text-gray-600">{cartItems.length} قلم در سبد شما</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart */
          <Card className="text-center py-12">
            <CardContent>
              <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">سبد خرید شما خالی است</h2>
              <p className="text-gray-600 mb-6">قطعات مورد نیاز خود را انتخاب کنید</p>
              <Button className="bg-blue-600 hover:bg-blue-700">مشاهده محصولات</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">کد قطعه: {item.partNumber}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                              {item.inStock ? (
                                <Badge className="bg-green-100 text-green-800 text-xs">موجود</Badge>
                              ) : (
                                <Badge variant="destructive" className="text-xs">
                                  ناموجود
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-lg">{formatPrice(item.price * item.quantity)}</p>
                            <p className="text-sm text-gray-600">
                              {formatPrice(item.price)} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    کد تخفیف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="کد تخفیف را وارد کنید"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      اعمال
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2 text-sm text-green-600">کد تخفیف {appliedPromo} اعمال شد (10% تخفیف)</div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>خلاصه سفارش</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>جمع کل:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>تخفیف:</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>هزینه ارسال:</span>
                    <span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-sm text-green-600">ارسال رایگان برای خرید بالای 500,000 تومان</p>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>مبلغ نهایی:</span>
                    <span className="text-blue-600">{formatPrice(total)}</span>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    <CreditCard className="h-5 w-5 mr-2" />
                    ادامه خرید
                  </Button>
                </CardContent>
              </Card>

              {/* Shipping Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    اطلاعات ارسال
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>ارسال به سراسر کشور</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span>پشتیبانی 24 ساعته</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-yellow-600" />
                    <span>ارسال سریع 1-3 روز کاری</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
