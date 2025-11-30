"use client"

import { useState } from "react"
import Sidebar from "./components/sidebar"
import Dashboard from "./dashboard/page" 
import Products from "./products/page" 
import Orders from "./orders/page" 
// import Settings from "./settings/page" 
import Users from "./users/page"

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />
      case "products":
        return <Products />
      case "orders":
        return <Orders />
      case "users":
        return <Users />
      // case "settings":
      //   return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderPage()}</div>
      </main>
    </div>
  )
}
