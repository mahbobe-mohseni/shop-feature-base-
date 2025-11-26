"use client"

import { useEffect, useState } from "react"
import type { ResponseType } from "@/types"
import Pagination from "@/features/products/components/products-list/pagination"
import OrdersList from "@/components/ui/orders-list"
import { getOrders } from "@/services/order"
import { Breadcrumb } from "@/components/global/breadcrumb"


const LoadingCard = () => {
    return (
        <div
            role="status"
            className="w-full lg:w-sm max-w-sm min-w-sm p-4 border border-gray-200 rounded-lg shadow-sm animate-pulse md:p-6 dark:border-gray-700"
        >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            <div className="flex items-center mt-4">
                <div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

const orderList = () => {
    const [loading, setLoading] = useState<Boolean>(false)
    const [orders, setOrders] = useState<any[]>([])
    const [paging, setPaging] = useState<any>({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    })
    // get orders and action set orders of store

    const handleGetOrders = async (page = 1) => {
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
    }

    const handlePageChange = (page: number = 1) => {
        setPaging({
            currentPage: page,
            totalPages: paging.totalPages,
            totalProducts: paging.totalProducts,
        })
        handleGetOrders(page)
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        handleGetOrders(1)
    }, [])
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
                        {[...Array(8)].map((item, index) => {
                            return <LoadingCard key={index} />
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

export default orderList
