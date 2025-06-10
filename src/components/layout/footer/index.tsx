"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Truck,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Shield,
  CreditCard,
  Headphones,
} from "lucide-react"

export default function Footer() {
  const partCategories = [
    "قطععات موتور",
    "جعبه دنده",
    "سیستم ترمز",
    "قطعات الکتریکی",
    "بدنه",
    "فیلترها و روغن‌ها",
    "سیستم تعلیق",
    "سیستم خروجی",
  ]

  const quickLinks = [
    "درباره ما",
    "تماس با ما",
    "پیگیری سفارش",
    "سیاست بازگشت",
    "گارانتی",
    "راهنمای نصب",
    "سفارش عمده",
    "پشتیبانی فنی",
  ]

  const nissanModels = [
    "نیسان پیکاپ D21",
    "نیسان پیکاپ D22",
    "نیسان نوارا D40",
    "نیسان نوارا D23",
    "نیسان تایتان",
    "نیسان فرانتیر",
    "وسایل نقلیه تجاری",
    "همه مدل‌ها",
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* اطلاعات اصلی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* اطلاعات شرکت */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">لوازم یدکی نیسان</h3>
                <p className="text-sm text-gray-400">لوازم یدکی نیسان</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منبع معتبر شما برای خرید لوازم یدکی وانت‌های نیسان. بیش از ۱۰ سال سابقه در خدمت‌رسانی به مالکان وانت و مکانیک‌ها.
            </p>

            {/* اطلاعات تماس */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span>واتساپ: +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-blue-400" />
                <span>parts@nissantruckparts.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-red-400" />
                <span>خیابان قطعات خودرو، شماره 123</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>شنبه تا پنجشنبه: 8 صبح - 6 عصر</span>
              </div>
            </div>
          </div>

          {/* دسته‌بندی قطعات */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">دسته‌بندی قطعات</h4>
            <ul className="space-y-2">
              {partCategories.map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* مدل‌های نیسان */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">مدل‌های نیسان</h4>
            <ul className="space-y-2">
              {nissanModels.map((model, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {model}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* لینک‌های سریع و خبرنامه */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">لینک‌های مفید</h4>
            <ul className="space-y-2 mb-6">
              {quickLinks.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white text-sm transition-colors duration-200 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* ثبت‌نام در خبرنامه */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h5 className="font-semibold mb-2 text-blue-400">دریافت اخبار</h5>
              <p className="text-xs text-gray-400 mb-3">عضویت در خبرنامه برای اطلاع از جدیدترین محصولات و تخفیف‌ها</p>
              <div className="flex gap-2">
                <Input
                  placeholder="ایمیل شما"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* امکانات ویژه */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Shield className="h-8 w-8 text-green-400 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-sm">ضمانت کیفیت</h5>
              <p className="text-xs text-gray-400">فقط قطعات اصلی و OEM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <Truck className="h-8 w-8 text-blue-400 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-sm">ارسال سریع</h5>
              <p className="text-xs text-gray-400">حمل و نقل سریع در سراسر کشور</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-center md:text-left">
            <Headphones className="h-8 w-8 text-purple-400 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-sm">پشتیبانی متخصص</h5>
              <p className="text-xs text-gray-400">راهنمایی فنی رایگان</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* پاورقی پایینی */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
            <p>&copy; 1403 لوازم یدکی نیسان. تمامی حقوق محفوظ است.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="hover:text-white transition-colors">
                شرایط استفاده
              </a>
              <a href="#" className="hover:text-white transition-colors">
                نقشه سایت
              </a>
            </div>
          </div>

          {/* شبکه‌های اجتماعی و پرداخت */}
          <div className="flex items-center gap-4">
            {/* شبکه‌های اجتماعی */}
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-600">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-pink-600">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-green-600">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>

            {/* نحوه پرداخت */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <CreditCard className="h-4 w-4" />
              <span>پرداخت امن</span>
            </div>
          </div>
        </div>
      </div>

      {/* خط تماس اضطراری */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">خط تماس اضطراری: +1 (555) 911-PART</span>
            </div>
            <div className="text-xs opacity-90">در دسترس 24 ساعته برای وانت‌های در حال خرابی</div>
          </div>
        </div>
      </div>
    </footer>
  )
}