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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Truck, Eye, EyeOff, Lock, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    phone: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { state } = await login(formData);
    if (state) {
      router.push("/");
    }


  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((agoValue) => ({ ...agoValue, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
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

        {/* Login/Register Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              ورود
            </CardTitle>
            <CardDescription className="text-center">
              اطلاعات خود را وارد کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phone field - only for register */}
              <div className="space-y-2">
                <Label htmlFor="phone">شماره تلفن *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="شماره تلفن خود را وارد کنید"
                    value={formData.phone}
                    dir="rtl"
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    className="pl-10"
                    required={true}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="رمز عبور خود را وارد کنید"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="pl-10 pr-10"
                    required
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
              </div>
              {/* Remember me - only for login */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange("rememberMe", checked)
                    }
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    مرا به خاطر بسپار
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </Link>
              </div>


              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                ورود
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Toggle between login/register */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                حساب کاربری ندارید؟
                <button
                  onClick={() => router.push('/auth/register')}
                  className="ml-2 text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                >
                  ثبت نام کنید
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            با ورود یا ثبت نام، شما با{" "}
            <Link href="/terms" className="text-blue-600 hover:text-blue-500 cursor-pointer">
              قوانین و مقررات
            </Link>{" "}
            و{" "}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-500 cursor-pointer">
              حریم خصوصی
            </Link>{" "}
            ما موافقت می‌کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
