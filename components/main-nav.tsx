"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { CreditCard, Calculator, BookOpen, BarChart, Home } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/credit-cards",
      label: "Credit Cards",
      icon: CreditCard,
      active: pathname === "/credit-cards",
    },
    {
      href: "/calculators",
      label: "Calculators",
      icon: Calculator,
      active: pathname === "/calculators",
    },
    {
      href: "/blog",
      label: "Learn",
      icon: BookOpen,
      active: pathname === "/blog",
    },
    {
      href: "/insights",
      label: "Insights",
      icon: BarChart,
      active: pathname === "/insights",
    },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="flex items-center space-x-2">
        <CreditCard className="h-6 w-6 text-primary" />
        <span className="font-bold text-xl">FinWise</span>
      </Link>
      <div className="flex items-center space-x-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
