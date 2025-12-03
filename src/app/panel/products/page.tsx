"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, LoaderCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Pagination from "@/features/products/components/products-list/pagination"
import { getProducts } from "@/services"
import { ResponseType } from "@/types"
import { Input } from "@/components/ui/input"
import { deleteProduct, updateProduct } from "@/services/panel/product"

const Products = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
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
        fetchData(page);
    };

    // get orders and action set orders of store
    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const response = (await getProducts({
                page: page,
                perPage: 10
            } as any)) as ResponseType<any[]>;

            const { state, data, pagination } = response;
            if (state && data) {
                setProducts(data);

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

    useEffect(() => {
        fetchData();
    }, []);

    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((product) => product.name.includes(searchTerm))

    const [editableRow, setEditableRow] = useState<any>(null)
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const handleUpdateProduct = async () => {
        try {
            setIsUpdateLoading(true)
            const payload = {
                productId: editableRow._id,
                name: editableRow.name,
                price: editableRow.price,
                discount: editableRow.discount
            }
            const { name, price, discount } = await updateProduct(payload)
            setProducts((prev) => {
                return prev.map((product) => {
                    if (product._id === editableRow._id) {
                        return { ...product, name, price, discount }
                    } else {
                        return product;
                    }
                })
            })
            setEditableRow(null)
        } catch (error) {
            console.log("🚀 ~ handleUpdateProduct ~ error:", error)

        }
        finally {
            setIsUpdateLoading(false)
        }
    }
    //delete products
    const [isDeleteLoadingId, setIsDeleteLoadingId] = useState(null)
    const handleDeleteProducts = async (productId: any) => {
        if (!confirm('Are you sure to delete this product?')) return;
        try {
            setIsDeleteLoadingId(productId)
            await deleteProduct({ productId })
            setProducts((prev) => prev.filter((product) => product._id !== productId))
        } catch (error) { }
        finally {
            setIsDeleteLoadingId(null)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">محصولات</h1>
                    <p className="text-muted-foreground mt-2">مدیریت محصولات فروشگاه</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={20} />
                    افزودن محصول
                </Button>
            </div>

            <Card className="p-6">
                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="جستجو برای محصول..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground"
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? <div className="text-gray-400 py-6 w-full flex items-center justify-center">درحال دریافت اطلاعات...</div> :
                        <>
                            <table className="w-full mb-4">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">نام محصول</th>
                                        {/* <th className="text-right py-3 px-4 text-muted-foreground font-semibold">دسته‌بندی</th> */}
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">قیمت</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">تعداد موجودی</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">وضعیت</th>
                                        <th className="text-center py-3 px-4 text-muted-foreground font-semibold">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => {
                                        return <tr key={product._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === product._id ?
                                                        <Input type="text" value={editableRow?.name} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, name: e.target.value }))} />
                                                        :
                                                        product.name
                                                }
                                            </td>
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === product._id ?
                                                        <Input type="number" className="max-w-20" value={editableRow?.price} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, price: e.target.value }))} />
                                                        :
                                                        product.price
                                                }
                                            </td>
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === product._id ?
                                                        <Input type="number" className="max-w-20" value={editableRow?.discount} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, discount: e.target.value }))} />
                                                        :
                                                        product.discount
                                                }
                                            </td>

                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${product.discount > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {product.discount > 0 ? 'موجود' : 'ناموجود'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 flex items-center justify-center gap-2">
                                                {editableRow?._id === product._id ?
                                                    <>
                                                        <Button variant={'destructive'} size={'sm'} onClick={() => setEditableRow(null)}>لغو</Button>
                                                        <Button onClick={handleUpdateProduct} isLoading={isUpdateLoading} size={'sm'}>ذخیره تغییرات</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={() => setEditableRow(product)} className="p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                                                            <Edit size={18} className="text-primary" />
                                                        </button>
                                                        <button onClick={() => handleDeleteProducts(product._id)} className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                                                            {isDeleteLoadingId === product._id ? <LoaderCircle size={18} /> : <Trash2 size={18} className="text-destructive" />
                                                            }
                                                        </button>
                                                    </>
                                                }
                                            </td>
                                        </tr>;
                                    })}
                                </tbody>
                            </table>
                            <Pagination
                                currentPage={paging.currentPage}
                                totalPages={paging.totalPages}
                                onPageChange={handlePageChange}
                                loading={loading}
                            />
                        </>
                    }
                </div>
            </Card>
        </div>
    )
}

export default Products
