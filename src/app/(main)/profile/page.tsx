"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/global/breadcrumb"
import { useCurrentUserStore } from "@/store/useCurrentUserStore"
import { updateCurrentUser } from "@/services/user-services"

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    email: "",
    phone: "",
  })


  const { currentUser, handelSetCurrentUser } = useCurrentUserStore();

  useEffect(() => {
    if (currentUser) {
      const { name, family, email, phone } = currentUser;
      setFormData({ name, family, email, phone })
    }

  }, [currentUser])

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const pyload = {
        ...formData, userId: currentUser?._id,
      }
      const response = await updateCurrentUser(pyload)

      // handelSetCurrentUser({ ...currentUser, ...response })
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
    } finally {
      setLoading(false)

    }

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const items = [
    { label: 'صفحه اصلی', href: '/' },
    { label: 'پروفایل' }
  ]

  return (
    <>
      <Breadcrumb title="پروفایل" items={items} />
      <div className="flex items-start justify-center p-4 bg-background py-10">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">ویرایش پروفایل</CardTitle>
            <CardDescription>اطلاعات شخصی خود را ویرایش کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">نام</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="نام خود را وارد کنید"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="family">نام خانوادگی</Label>
                  <Input
                    id="family"
                    name="family"
                    type="text"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    value={formData.family}
                    onChange={handleChange}
                    required
                    className="text-right"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">موبایل</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  disabled
                  dir="ltr"
                  className="text-left bg-muted cursor-not-allowed"
                />
                <p className="text-sm text-muted-foreground">شماره موبایل قابل ویرایش نیست</p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button isLoading={loading} type="submit" className="flex-1 cursor-pointer">
                  ذخیره تغییرات
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
