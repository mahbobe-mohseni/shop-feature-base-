"use client";

import { useEffect, useState } from "react";
import { Eye, LoaderCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { deleteOrder, getOrders } from "@/services/panel/order";
import { ResponseType } from "@/types";
import { formatDate } from "@/lib/utils";
import Pagination from "@/features/products/components/products-list/pagination";
import InvoiceModal from "@/components/invoice/InvoiceModal";

const Orders = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [isfactorModal, setIsFactorMobile] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const [paging, setPaging] = useState<any>({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    });

    const handlePageChange = (page: number = 1) => {
        setPaging({
            currentPage: page,
            totalPages: paging.totalPages,
            totalProducts: paging.totalProducts,
        });
        handleGetOrders(page);
    };
    // get orders and action set orders of store
    const handleGetOrders = async (page = 1) => {
        try {
            setLoading(true);
            const response = (await getOrders({
                page: page,
            } as any)) as ResponseType<any[]>;

            const { state, data, pagination } = response;
            console.log("🚀 ~ handleGetOrders ~ pagination:", pagination)
            if (state && data) {
                setOrders(data);

                if (pagination) {
                    setPaging(pagination);
                } else if (paging.totalPages) {
                    setPaging({
                        currentPage: page,
                        totalPages: paging.totalPages,
                        totalProducts: paging.totalPages || data.length,
                    });
                } else {
                    // Fallback if API doesn't provide pagination info
                    setPaging({
                        currentPage: 1,
                        totalPages: 1,
                        totalProducts: data.length,
                    });
                }
            }
        } finally {
            setLoading(false);
        }
    };
    //delete orders
    const [isDeleteLoadingId, setIsDeleteLoadingId] = useState(null)
    const handleDeleteOrders = async (orderId: any) => {
        if (!confirm('Are you sure to delete this order?')) return;
        try {
            setIsDeleteLoadingId(orderId)
            await deleteOrder({ orderId })
            setOrders((prev) => prev.filter((order) => order._id !== orderId))
        } catch { }
        finally {
            setIsDeleteLoadingId(null)
        }
    }


    const handleOpenFactorModal = (order: any) => {
        setCurrentOrder(order)
        setIsFactorMobile(true)
    }

    useEffect(() => {
        handleGetOrders();
    }, [handleGetOrders]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">سفارشات</h1>
                <p className="text-muted-foreground mt-2">مدیریت سفارشات و پیگیری</p>
            </div>

            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full mb-4">
                        <thead className="bg-gray-50 rounded-t-lg">
                            <tr className="border-b border-border rounded-t-lg">
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold bg-gray-50">
                                    ردیف
                                </th>
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">
                                    شماره سفارش
                                </th>
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">
                                    مشتری
                                </th>
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">
                                    مبلغ
                                </th>
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">
                                    تاریخ
                                </th>
                                <th className="text-right py-3 px-4 text-muted-foreground font-semibold">
                                    وضعیت
                                </th>
                                <th className="text-center py-3 px-4 text-muted-foreground font-semibold">
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order._id}

                                    className="border-b border-border hover:bg-muted/30 transition-colors"
                                >
                                    <td className="py-3 px-4 text-foreground font-medium bg-gray-50">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-4 text-foreground font-medium">
                                        {order.orderCode}
                                    </td>
                                    <td className="py-3 px-4 text-foreground">{`${order.userId.name} ${order.userId.family} (${order.userId.phone})`}</td>
                                    <td className="py-3 px-4 text-foreground">
                                        {order.totalPrice}
                                    </td>
                                    <td className="py-3 px-4 text-foreground">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="py-3 px-4"></td>
                                    <td className="py-3 px-4 flex items-center justify-center gap-2">
                                        <span
                                            onClick={() => handleOpenFactorModal(order)}
                                            className="cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors">
                                            <Eye size={20} className="text-primary" />
                                        </span>
                                        <button onClick={() => handleDeleteOrders(order._id)} className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                                            {isDeleteLoadingId === order._id ? <LoaderCircle size={18} /> : <Trash2 size={18} className="text-destructive" />
                                            }
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        currentPage={paging.currentPage}
                        totalPages={paging.totalPages}
                        onPageChange={handlePageChange}
                        loading={loading}
                    />
                </div>
            </Card>
            <InvoiceModal data={currentOrder} visible={isfactorModal} setVisible={setIsFactorMobile} />
        </div>
    );
};

export default Orders;
