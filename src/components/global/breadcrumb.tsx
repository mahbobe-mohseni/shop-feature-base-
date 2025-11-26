import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  title: string
  className?: string
}

export function Breadcrumb({ items, title, className = "" }: BreadcrumbProps) {
  return (
    <div className="space-y-3 bg-card border border-border p-4 sticky top-[185px] z-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
        <ol className="flex items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <ChevronLeft className="h-4 w-4 text-muted-foreground" />}
                {item.href && !isLast ? (
                  <Link href={item.href} className="text-primary hover:text-primary/80 underline transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground font-medium" : "text-muted-foreground"}>{item.label}</span>
                )}
              </li>
            )
          })}
        </ol>
      </nav> 
    </div>
  )
}
