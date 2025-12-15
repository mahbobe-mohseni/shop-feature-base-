"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              تماس با ما
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              خوشحال می‌شویم از شما بشنویم. پیام خود را ارسال کنید، ما در
              سریع‌ترین زمان پاسخ می‌دهیم.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    بازدید حضوری
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    تهران، خیابان امیرکبیر
                    <br />
                    بازار لوازم یدکی
                    <br />
                    فروشگاه جهان‌سایپا
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    تماس تلفنی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 flex flex-col gap-2">


                    <div className="flex items-center gap-2">

                      <strong className="w-[70px]">فروش:</strong> <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORTER_PHONE}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                        target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_PHONE}
                      </Link>
                    </div>


                    <div className="flex items-center gap-2">

                      <strong className="w-[70px]">پشتیبانی:</strong> <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORTER_PHONE}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                        target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_PHONE}
                      </Link>
                    </div>


                    <div className="flex items-center gap-2">

                      <strong className="w-[70px]">مرجوعی:</strong> <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_SUPPORTER_PHONE}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                        target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_PHONE}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    ایمیل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <strong className="w-[70px]">عمومی:</strong>
                      <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`mailto:${process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                      target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <strong className="w-[70px]">پشتیبانی:</strong>
                      <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`mailto:${process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                      target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      <strong className="w-[70px]">سفارشات:</strong>
                       <Link
                        className="text-blue-500 underline hover:text-blue-700"
                        href={`mailto:${process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}?text=${process.env.NEXT_PUBLIC_WHATSAPP_MEESSAGE}`}
                      target="_blank"
                      >
                        {process.env.NEXT_PUBLIC_SUPPORTER_EMAIL}
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    ساعات کاری
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-gray-600 space-y-1">
                    <p>
                      <strong>شنبه تا پنجشنبه:</strong> ۹ صبح تا ۸ شب
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hidden">
              <CardHeader>
                <CardTitle>ارسال پیام</CardTitle>
                <CardDescription>
                  فرم زیر را پر کنید. ما حداکثر تا ۲۴ ساعت پاسخ می‌دهیم.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">نام کامل *</Label>
                      <Input
                        id="name"
                        placeholder="نام خود را وارد کنید"
                        value={formData.name}
                        type="text"
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="آدرس ایمیل خود را وارد کنید"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">موضوع *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="موضوع را انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">سؤال عمومی</SelectItem>
                        <SelectItem value="order">پشتیبانی سفارش</SelectItem>
                        <SelectItem value="return">مرجوعی و تعویض</SelectItem>
                        <SelectItem value="product">اطلاعات محصول</SelectItem>
                        <SelectItem value="shipping">سؤالات ارسال</SelectItem>
                        <SelectItem value="complaint">شکایت</SelectItem>
                        <SelectItem value="other">سایر موارد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">پیام *</Label>
                    <Textarea
                      id="message"
                      placeholder="چگونه می‌توانیم به شما کمک کنیم؟"
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full sm:w-auto">
                    <Send className="h-4 w-4 mr-2" />
                    ارسال پیام
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>سؤالات متداول</CardTitle>
                <CardDescription>
                  پاسخ سریع به سؤالات رایج مشتریان
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      روش‌های ارسال کالا چیست؟
                    </h4>
                    <p className="text-gray-600 text-sm">
                      ارسال با پست، تیپاکس و باربری در دسترس است. زمان تحویل بین
                      ۲ تا ۷ روز کاری است.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      شرایط مرجوعی کالا چگونه است؟
                    </h4>
                    <p className="text-gray-600 text-sm">
                      تا ۷ روز پس از دریافت، در صورت استفاده نشدن از کالا و سالم
                      بودن بسته‌بندی، امکان مرجوعی وجود دارد.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      آیا ارسال به شهرستان انجام می‌شود؟
                    </h4>
                    <p className="text-gray-600 text-sm">
                      بله، ارسال به تمام نقاط ایران امکان‌پذیر است.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      چگونه سفارش خود را پیگیری کنم؟
                    </h4>
                    <p className="text-gray-600 text-sm">
                      پس از ثبت سفارش، کد پیگیری برای شما ارسال می‌شود و
                      می‌توانید وضعیت سفارش را از طریق سایت مشاهده کنید.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>موقعیت فروشگاه</CardTitle>
              <CardDescription>آدرس فروشگاه ما روی نقشه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 rounded-lg h-64">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d700.0814927547136!2d51.43148561621677!3d35.685432814121974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1749552170834!5m2!1sen!2suk"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
