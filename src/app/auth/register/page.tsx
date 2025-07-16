"use client";

import type React from "react";

import { useEffect, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
// src/app/layout.tsx
import { SessionProvider } from "next-auth/react";


import {
  Truck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Register() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }:any = router.query;
  useEffect(() => {
    console.log("session:", session)
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // create user
  async function handleCreateUser() {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      const { email, password } = formData;
      const resultSignin = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log("🚀 ~ handleCreateUser ~ resultSignin:", resultSignin);
    } catch (error) {
      console.log("🚀 ~ createUser ~ error:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "نام الزامی است";
    if (!formData.family.trim()) newErrors.family = "نام خانوادگی الزامی است";
    if (!formData.email.trim()) newErrors.email = "ایمیل الزامی است";
    if (!formData.phone.trim()) newErrors.phone = "شماره تلفن الزامی است";
    if (!formData.password) newErrors.password = "رمز عبور الزامی است";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // request to server
      handleCreateUser();
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Nissan Parts</h1>
              <p className="text-sm text-gray-600">لوازم یدکی نیسان</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            ایجاد حساب کاربری
          </h2>
          <p className="mt-2 text-gray-600">
            به خانواده بزرگ مشتریان نیسان بپیوندید
          </p>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">ثبت نام</CardTitle>
            <CardDescription className="text-center">
              لطفاً اطلاعات زیر را با دقت تکمیل کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  اطلاعات شخصی
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">نام *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="نام خود را وارد کنید"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="family">نام خانوادگی *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="family"
                        type="text"
                        placeholder="نام خانوادگی خود را وارد کنید"
                        value={formData.family}
                        onChange={(e) =>
                          handleInputChange("family", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.family ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.family && (
                      <p className="text-sm text-red-500">{errors.family}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  اطلاعات تماس
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">ایمیل *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">شماره تلفن *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="09123456789"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`pl-10 ${
                          errors.phone ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Password Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  رمز عبور
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">رمز عبور *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور قوی انتخاب کنید"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`pl-10 pr-10 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">تکرار رمز عبور *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="رمز عبور را مجدداً وارد کنید"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={`pl-10 pr-10 ${
                          errors.confirmPassword ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600">
                  <p>رمز عبور باید حداقل شامل موارد زیر باشد:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>حداقل 8 کاراکتر</li>
                    <li>حداقل یک حرف بزرگ</li>
                    <li>حداقل یک عدد</li>
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
              >
                ایجاد حساب کاربری
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                قبلاً ثبت نام کرده‌اید؟{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  وارد شوید
                </Link>
              </p>
            </div>

            {/* Social Registration */}
            <div className="mt-6 hidden">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    یا ثبت نام با
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
