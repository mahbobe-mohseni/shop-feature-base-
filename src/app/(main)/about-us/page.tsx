"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Truck,
  Wrench,
  Shield,
  Clock,
  Phone,
  MapPin,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const features = [
    {
      icon: Truck,
      title: "متخصص وانت‌های نیسان",
      description: "ما فقط روی لوازم یدکی وانت‌های نیسان تمرکز داریم",
    },
    {
      icon: Shield,
      title: "قطعات اصلی",
      description: "تمامی قطعات اصلی یا معادل OEM با گارانتی هستند",
    },
    {
      icon: Clock,
      title: "ارسال سریع",
      description: "پردازش و ارسال سریع برای بازگشت خودرو به جاده",
    },
    {
      icon: Wrench,
      title: "پشتیبانی متخصصانه",
      description: "تیم ما به خوبی با وانت‌های نیسان آشنا هستند",
    },
  ];

  const stats = [
    { number: "10+", label: "سال سابقه" },
    { number: "5000+", label: "قطعه موجود" },
    { number: "2000+", label: "مشتری راضی" },
    { number: "24/7", label: "پشتیبانی فعال" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* سربرگ */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              درباره ما
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              منبع معتبر شما برای خرید لوازم یدکی وانت‌های نیسان
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* داستان ما */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                متخصص قطعات وانت نیسان
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  بیش از ۱۰ سال است که ما منبع اعتماد شما برای خرید لوازم یدکی
                  وانت‌های نیسان هستیم. می‌دانیم که وانت شما چقدر برای کسب و
                  کارتان مهم است و ما اینجا هستیم تا آن را بدون وقفه نگه داریم.
                </p>
                <p>
                  انبار گسترده ما شامل قطعات موتور، جعبه دنده، قطعات الکتریکی،
                  پنل بدنه و تمام قطعات دیگر مورد نیاز وانت شماست.
                </p>
                <p>
                  ما مستقیماً با تأمین‌کنندگان معتبر همکاری می‌کنیم تا شما قطعات
                  اصلی را با قیمت مناسب و ارسال سریع دریافت کنید.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="secondary">قطعات موتور</Badge>
                <Badge variant="secondary">جعبه دنده</Badge>
                <Badge variant="secondary">الکتریکی</Badge>
                <Badge variant="secondary">بدنه</Badge>
                <Badge variant="secondary">فیلترها</Badge>
              </div>
            </div>
            <div>
              <Image
                width={400}
                height={500}
                src="/images/about-us-slide.jpg"
                alt="قطعات وانت نیسان"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* آمار شگفت‌انگیز */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* چرا ما؟ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              دلایل انتخاب ما
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ما را بهترین گزینه برای خرید لوازم یدکی وانت نیسان می‌کند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* خدمات ما */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">خدمات ما</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">شناسایی قطعه</h4>
                      <p className="text-sm text-gray-600">
                        کمک به پیدا کردن قطعه مناسب برای مدل خاص وانت نیسان شما
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">ضمانت کیفیت</h4>
                      <p className="text-sm text-gray-600">
                        همه قطعات دارای گارانتی و کیفیت تضمینی هستند
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">ارسال سریع</h4>
                      <p className="text-sm text-gray-600">
                        ارسال سریع برای کاهش زمان توقف وانت شما
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">پشتیبانی فنی</h4>
                      <p className="text-sm text-gray-600">
                        راهنمایی متخصصانه درباره نصب و سازگاری قطعات
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">سفارشات عمده</h4>
                      <p className="text-sm text-gray-600">
                        قیمت ویژه برای مالکان فله و مکانیک‌ها
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">سیاست بازگشت</h4>
                      <p className="text-sm text-gray-600">
                        بازگشت آسان در صورت عدم تناسب قطعه
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* اطلاعات تماس */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-600" />
                  با ما تماس بگیرید
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  <strong>تلفن:</strong> +1 (555) 123-4567
                </p>
                <p className="text-gray-600">
                  <strong>واتساپ:</strong> +1 (555) 123-4567
                </p>
                <p className="text-gray-600">
                  <strong>ایمیل:</strong> parts@nissantruckparts.com
                </p>
                <p className="text-gray-600">
                  <strong>ساعات کاری:</strong> شنبه تا پنجشنبه 8 صبح - 6 عصر
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  محل فروشگاه
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600">
                  خیابان قطعات خودرو، شماره 123
                  <br />
                  منطقه صنعتی
                  <br />
                  شهر شما، استان 12345
                </p>
                <p className="text-gray-600">
                  <strong>پارکینگ:</strong> پارکینگ رایگان وجود دارد
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* دکمه اقدام (CTA) */}
        <div className="text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                نیاز به کمک در شناسایی قطعه دارید؟
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                قطعه مورد نظرتان را پیدا نکردید؟ با ذکر شماره VIN یا شماره قطعه
                وانت خود با ما تماس بگیرید، ما دقیقاً قطعه مورد نیازتان را پیدا
                خواهیم کرد.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  تماس با ما
                </Button>
                <Button size="lg" variant="outline">
                  مرور قطعات
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
