"use client"

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Store } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const menuItems = [
    { id: "dashboard", link: "/panel/dashboard", label: "داشبورد", icon: LayoutDashboard },
    { id: "products", link: "/panel/products", label: "محصولات", icon: Package },
    { id: "orders", link: "/panel/orders", label: "سفارشات", icon: ShoppingCart },
    { id: "users", link: "/panel/users", label: "مشتریان", icon: Users },
    // { id: "settings", label: "تنظیمات", icon: Settings },
  ]

  const currentPath = usePathname()

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">پنل مدیریت</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">فروشگاه آنلاین</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.link
          return (
            <Link
              key={item.id}

              href={item.link} >
              <div
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <Link href={'/'} className="w-full flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/10 rounded-lg transition-colors">
          <Store size={20} />
          <span>بازگشت به فروشگاه</span>
        </Link>
      </div>
    </aside>
  )
}
