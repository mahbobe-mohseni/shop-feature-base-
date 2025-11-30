"use client"

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react"

export default function Sidebar({ activePage, setActivePage }:any) {
  const menuItems = [
    { id: "dashboard", label: "داشبورد", icon: LayoutDashboard },
    { id: "products", label: "محصولات", icon: Package },
    { id: "orders", label: "سفارشات", icon: ShoppingCart },
    { id: "users", label: "مشتریان", icon: Users },
    // { id: "settings", label: "تنظیمات", icon: Settings },
  ]

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
          const isActive = activePage === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/10 rounded-lg transition-colors">
          <LogOut size={20} />
          <span>خروج</span>
        </button>
      </div>
    </aside>
  )
}
