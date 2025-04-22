"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, CreditCard, Calculator, BookOpen, BarChart, Home } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setOpen(false)}>
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">FinWise</span>
        </Link>
        <nav className="flex flex-col space-y-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
