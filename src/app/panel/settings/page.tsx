"use client"

import { Save } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Settings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">تنظیمات</h1>
                <p className="text-muted-foreground mt-2">تنظیمات فروشگاه و حساب</p>
            </div>

            {/* Store Settings */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">تنظیمات فروشگاه</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">نام فروشگاه</label>
                        <input
                            type="text"
                            placeholder="نام فروشگاه"
                            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">توضیحات</label>
                        <textarea
                            placeholder="توضیحات..."
                            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">شهر</label>
                            <input
                                type="text"
                                placeholder="شهر"
                                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">کد پستی</label>
                            <input
                                type="text"
                                placeholder="کد پستی"
                                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                            />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Contact Settings */}
            <Card className="p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">اطلاعات تماس</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">تلفن</label>
                        <input
                            type="tel"
                            placeholder="تلفن"
                            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">ایمیل</label>
                        <input
                            type="email"
                            placeholder="ایمیل"
                            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                    </div>
                </div>
            </Card>

            <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                    <Save size={20} />
                    ذخیره تنظیمات
                </Button>
            </div>
        </div>
    )
}

export default Settings
