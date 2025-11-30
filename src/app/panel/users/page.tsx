"use client"

import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Pagination from "@/features/products/components/products-list/pagination"
import { getProducts } from "@/services"
import { ResponseType } from "@/types"
import { getUsers } from "@/services/user-services"

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
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">ایمیل</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">تلفن</th>
                                        <th className="text-right py-3 px-4 text-muted-foreground font-semibold">نقش کاربری</th>
                                        <th className="text-center py-3 px-4 text-muted-foreground font-semibold">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => {
                                        return <tr key={user._id
                                        } className="border-b border-border hover:bg-muted/30 transition-colors">
                                            <td className="py-3 px-4 text-foreground">{user.name}</td>
                                            <td className="py-3 px-4 text-foreground">{user.family}</td>
                                            <td className="py-3 px-4 text-foreground">{user.phone}</td>
                                            <td className="py-3 px-4 text-foreground">{user.email}</td>
                                            <td className="py-3 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-medium ${user.discount > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {user.role === 'ADMIN' ? 'مدیر' : 'کاربر'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 flex items-center justify-center gap-2">
                                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                                    <Edit size={18} className="text-primary" />
                                                </button>
                                                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                                                    <Trash2 size={18} className="text-destructive" />
                                                </button>
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
