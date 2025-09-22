"use client"

import { useEffect, useState } from "react"
import { getProducts } from "@/services"
import dynamic from "next/dynamic"
import { useProductStore } from "@/store/useProductStore"
import type { ProductType, ResponseType } from "@/types"
import Pagination from "./pagination"

const ProductCard = dynamic(() => import("../product-card"))

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

type GetProductsRequestType = {
  page: number
  q: string
}

const ProductsList = () => {
  // get products and action set products of store
  const { products, handleSetProducts, loading, handleSetLoading } = useProductStore()

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)

  const handleGetProducts = async (page = 1) => {
    try {
      handleSetLoading(true)
      const response = (await getProducts({
        page: page,
        q: "",
      } as GetProductsRequestType) as ResponseType<ProductType[]>)

      const { state, data, pagination } = response

      if (state && data) {
        handleSetProducts(data)

        if (pagination) {
          setTotalPages(pagination.totalPages)
          setTotalProducts(pagination.totalProducts)
          setCurrentPage(pagination.currentPage)
        } else if (totalPages) {
          setTotalPages(totalPages)
          setTotalProducts(totalPages || data.length)
          setCurrentPage(page)
        } else {
          // Fallback if API doesn't provide pagination info
          setTotalPages(1)
          setTotalProducts(data.length)
          setCurrentPage(1)
        }
      }
    } finally {
      handleSetLoading(false)
    }
  }

  const handlePageChange = (page: number = 1) => {
    setCurrentPage(page)
    handleGetProducts(page)
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    handleGetProducts(1)
  }, [])

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-start gap-6 w-full flex-wrap">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-start gap-6 flex-wrap m-auto w-full">
            {products.map((item: ProductType, index) => {
              return <ProductCard key={index} product={item} />
            })}
          </div>

          <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-lg bg-white sticky bottom-0">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />

            {totalProducts > 0 && (
              <div className="text-center mt-4 text-sm text-muted-foreground hidden">
                نمایش {products.length} محصول از {totalProducts} محصول
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProductsList
