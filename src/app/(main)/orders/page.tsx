"use client"

import { useCallback, useEffect, useState } from "react"
import type { ResponseType } from "@/types"
import Pagination from "@/features/products/components/products-list/pagination"
import OrdersList from "@/components/ui/orders-list"
import { getOrders } from "@/services/order"
import { Breadcrumb } from "@/components/global/breadcrumb"
import { OrderSkeleton } from "@/components/ui/order-skeleton"

const Orders = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [orders, setOrders] = useState<any[]>([])
    const [paging, setPaging] = useState<any>({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    })
    // get orders and action set orders of store
    const handleGetOrders = useCallback(async (page = 1) => {
        try {
            setLoading(true)
            const response = (await getOrders
                ({
                    page: page,
                } as any) as ResponseType<any[]>)

            const { state, data, pagination } = response

            if (state && data) {
                setOrders(data)

                if (pagination) {
                    setPaging(pagination)

                } else if (paging.totalPages) {
                    setPaging({
                        currentPage: page,
                        totalPages: paging.totalPages,
                        totalProducts: paging.totalPages || data.length,
                    })
                } else {
                    // Fallback if API doesn't provide pagination info
                    setPaging({
                        currentPage: 1,
                        totalPages: 1,
                        totalProducts: data.length,
                    })
                }
            }
        } finally {
            setLoading(false)
        }


    }, [paging.totalPages])


    const handlePageChange = (page: number = 1) => {
        setPaging({
            currentPage: page,
            totalPages: paging?.totalPages,
            totalProducts: paging?.totalProducts,
        })
        handleGetOrders(page)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        handleGetOrders(1)
    }, [handleGetOrders])
    const items = [
        { label: 'صفحه اصلی', href: '/' },
        { label: 'سفارشات' }
    ]
    return (
        <>
            <Breadcrumb items={items} title="سفارشات " />
            <div className="w-full">
                {loading ? (
                    <div className="flex items-center justify-center gap-6 flex-wrap m-auto w-full">
                        {[...Array(3)].map((item, index) => {
                            return <OrderSkeleton key={index} />
                        })}
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-center gap-6 flex-wrap m-auto w-full py-10">
                            <OrdersList orders={orders} />
                        </div>

                        <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-lg bg-white sticky bottom-0">
                            <Pagination
                                currentPage={paging.currentPage}
                                totalPages={paging.totalPages}
                                onPageChange={handlePageChange}
                                loading={loading}
                            />

                            {paging.totalProducts > 0 && (
                                <div className="text-center mt-4 text-sm text-muted-foreground hidden">
                                    نمایش {orders.length} محصول از {paging.totalProducts} محصول
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Orders
