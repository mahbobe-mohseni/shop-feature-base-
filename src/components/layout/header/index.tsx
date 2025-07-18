"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Truck,
  Search,
  Phone,
  MessageCircle,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  Clock,
  Mail,
  LogIn,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { getCurrentUser, logout } from "@/services";
import { useCurrentUserStore } from "@/store/useCurrentUserStore";
import { UserType } from "@/types";

export default function Header() {
  const { currentUser, handelSetCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      handelSetCurrentUser(user as UserType);
    };
    fetchUser();
  }, [handelSetCurrentUser]);

  const handleLogout = async () => {
    const { state } = await logout();
    if (state) {
      handelSetCurrentUser(null);
    }
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { name: "صفحه اصلی", href: "/" },
    { name: "محصولات", href: "/products" },
    { name: "درباره ما", href: "/about-us" },
    { name: "تماس با ما", href: "/contact-us" },
  ];

  const { cartItems } = useCartStore();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* نوار بالایی */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-green-400" />
                <span>پشتیبانی واتساپ</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>شنبه تا پنجشنبه: 8 صبح - 6 عصر</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-400" />
                <span className="hidden sm:inline">
                  ارسال رایگان بالای 100 دلار
                </span>
                <span className="sm:hidden">ارسال رایگان بالای $100+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* سربرگ اصلی */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* لوگو */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  لوازم یدکی نیسان
                </h1>
                <p className="text-sm text-gray-600">Nissan Spare Parts</p>
              </div>
            </div>
          </div>

          {/* نوار جستجو - دسکتاپ */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="جستجو بر اساس شماره قطعه، مدل یا توضیح..."
                  className="rounded-none border-x-0 flex-1"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* آیکون‌های سمت راست */}
          <div className="flex items-center gap-4">
            {/* دکمه جستجو - موبایل */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* حساب کاربری */}
            {currentUser ? (
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden sm:flex">
                    <User className="h-5 w-5" />
                    {currentUser.phone}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">

                  <DropdownMenuItem>
                    <Link className="h-full w-full" href="/auth/register">
                      پروفایل
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>پیگیری سفارش</DropdownMenuItem>
                  <DropdownMenuItem>تاریخچه سفارشات</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    خروج از حساب
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <LogIn className="h-5 w-5" />
                  ورود به حساب
                </Button>
              </Link>
            )}

            {/* سبد خرید */}
            {currentUser ? (
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />

                {cartItems.length > 0 ? (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                    {cartItems.length}
                  </Badge>
                ) : (
                  ""
                )}

                <span className="hidden sm:inline mr-2">
                  <Link href="/cart">سبد خرید</Link>
                </span>
              </Button>
            ) : ("")}

            {/* منوی موبایل */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="py-4">
                  <div className="flex items-center gap-2 mb-6">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span className="font-bold text-lg">نیسان لوازم یدکی</span>
                  </div>

                  {/* جستجو در موبایل */}
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="جستجو قطعات..."
                        className="flex-1"
                      />
                      <Button size="sm" className="bg-blue-600">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* منوی موبایل */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-4">منوی اصلی</h3>
                      <div className="space-y-3">
                        {navItems.map((item, index) => (
                          <Link
                            key={index}
                            href={item.href}
                            className="block text-gray-600 hover:text-blue-600 py-2 border-b border-gray-100"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* نوار جستجوی موبایل */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="جستجو قطعات..."
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* منوی ناوبری دسکتاپ */}
      <div className="bg-gray-50 border-t hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* منوی اصلی */}
            <nav className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* تماس سریع */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>نیاز به کمک دارید؟ با ما تماس بگیرید</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
