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
import { Separator } from "@/components/ui/separator";
import { Truck, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/services";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
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
      const { state, message } = await register(formData);
      if (state) {
        toast.success(message);
        router.push("/");
      } else {
        toast.error(message);
      }
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
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
