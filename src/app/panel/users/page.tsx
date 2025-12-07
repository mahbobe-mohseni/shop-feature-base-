"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search, LoaderCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Pagination from "@/features/products/components/products-list/pagination"
import { getProducts } from "@/services"
import { ResponseType } from "@/types"
import { getUsers } from "@/services/user-services"
import { deleteUser, updateUser } from "@/services/panel/user"
import { Input } from "@/components/ui/input"

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);
    const [paging, setPaging] = useState<any>({
        currentPage: 1,
        totalPages: 1,
        totalUsers: 0,
    });

    const handlePageChange = (page: number = 1) => {
        setPaging({
            currentPage: page,
            totalPages: paging.totalPages,
            totalUsers: paging.totalUsers,
        });
        fetchData(page);
    };
    // get orders and action set orders of store
    const fetchData = async (page = 1) => {
        try {
            setLoading(true);
            const response = (await getUsers({
                page: page,
                perPage: 10
            } as any)) as ResponseType<any[]>;

            const { state, data, pagination } = response;
            console.log("🚀 ~ fetchData ~ data:", data)
            if (state && data) {
                setUsers(data);

                if (pagination) {
                    setPaging(pagination);
                } else if (paging.totalPages) {
                    setPaging({
                        currentPage: page,
                        totalPages: paging.totalPages,
                        totalUsers: paging.totalPages || data.length,
                    });
                } else {
                    // Fallback if API doesn't provide pagination info
                    setPaging({
                        currentPage: 1,
                        totalPages: 1,
                        totalUsers: data.length,
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

    const filteredUsers = users.filter((user) => user.name.includes(searchTerm))


    //EDIT USERS
    const [editableRow, setEditableRow] = useState<any>(null)
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const handleUpdateUser = async () => {
        try {
            setIsUpdateLoading(true)
            const payload = {
                userId: editableRow._id,
                name: editableRow.name,
                family: editableRow.family,
                phone: editableRow.phone,
                email: editableRow.email
            }
            const { name, family, phone, email } = await updateUser(payload)
            setUsers((prev) => {
                return prev.map((user) => {
                    if (user._id === editableRow._id) {
                        return { ...user, name, family, phone, email }
                    } else {
                        return user;
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
    const handleDeleteUser = async (userId: any) => {
        if (!confirm('Are you sure to delete this product?')) return;
        try {
            setIsDeleteLoadingId(userId)
            await deleteUser({ userId })
            setUsers((prev) => prev.filter((user) => user._id !== userId))
        } catch (error) { }
        finally {
            setIsDeleteLoadingId(null)
        }
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">کاربران</h1>
                    <p className="text-muted-foreground mt-2">مدیریت کاربران</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={20} />
                    افزودن کاربر جدید
                </Button>
            </div>

            <Card className="p-6">
                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="جستجو در بین کاربران..."
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
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">نام</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">نام خانوادگی</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">تلفن</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">ایمیل</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">نقش کاربری</th>
                                        <th className="text-center py-3 px-4 text-muted-foreground font-semibold">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => {
                                        return <tr key={user._id
                                        } className="border-b border-border hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === user._id ?
                                                        <Input type="text" value={editableRow?.name} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, name: e.target.value }))} />
                                                        :
                                                        user.name
                                                }
                                            </td>
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === user._id ?
                                                        <Input type="text" value={editableRow?.family} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, family: e.target.value }))} />
                                                        :
                                                        user.family
                                                }
                                            </td>
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === user._id ?
                                                        <Input type="number" value={editableRow?.phone} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, phone: e.target.value }))} />
                                                        :
                                                        user.phone
                                                }
                                            </td>
                                            <td className="py-3 px-4 text-foreground">
                                                {
                                                    editableRow?._id === user._id ?
                                                        <Input type="email" value={editableRow?.email} onChange={(e) => setEditableRow((prev: any) => ({ ...prev, email: e.target.value }))} />
                                                        :
                                                        user.email
                                                }
                                            </td>

                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'ADMIN' ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                                                        }`}
                                                >
                                                    {user.role === 'ADMIN' ? 'مدیر' : 'کاربر'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 flex items-center justify-center gap-2">
                                                {editableRow?._id === user._id ?
                                                    <>
                                                        <Button variant={'destructive'} size={'sm'} onClick={() => setEditableRow(null)}>لغو</Button>
                                                        <Button onClick={handleUpdateUser} isLoading={isUpdateLoading} size={'sm'}>ذخیره تغییرات</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <button onClick={() => setEditableRow(user)} className="p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer">
                                                            <Edit size={18} className="text-primary" />
                                                        </button>
                                                        <button onClick={() => handleDeleteUser(user._id)} className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                                                            {isDeleteLoadingId === user._id ? <LoaderCircle size={18} /> : <Trash2 size={18} className="text-destructive" />
                                                            }
                                                        </button>
                                                    </>}
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

export default Users
