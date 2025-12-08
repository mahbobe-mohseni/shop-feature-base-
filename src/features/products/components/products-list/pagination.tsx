"use client"

import { Fragment } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    loading?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, loading = false }) => {
    const getVisiblePages = () => {
        const delta = 2
        const range = []
        const rangeWithDots = []

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i)
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...")
        } else {
            rangeWithDots.push(1)
        }

        rangeWithDots.push(...range)

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages)
        } else {
            rangeWithDots.push(totalPages)
        }

        return rangeWithDots
    }

    if (totalPages <= 1) return null

    const visiblePages = getVisiblePages()

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => currentPage !== 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className={`flex items-center gap-1 cursor-pointer ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="lg:block hidden">صفحه قبل</span>
            </Button>
            <div className="flex items-center gap-1">
                {visiblePages.map((page, index) => (
                    <Fragment key={index}>
                        {page === "..." ? (
                            <span className="px-3 py-2 text-muted-foreground">...</span>
                        ) : (
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => currentPage !== page && onPageChange(page as number)}
                                disabled={loading}
                                className={`min-w-[40px] cursor-pointer ${currentPage === page ? "cursor-not-allowed" : ""}`}
                            >
                                {page}
                            </Button>
                        )}
                    </Fragment>
                ))}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={() => currentPage !== totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className={`flex items-center gap-1 cursor-pointer ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
            >
                <span className="lg:block hidden">صفحه بعد</span>
                <ChevronLeft className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default Pagination
