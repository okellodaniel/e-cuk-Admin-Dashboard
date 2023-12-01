"use client"
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {

    const router = useRouter();

    const params = useParams();

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title={`Categories (${data.length})`}
                    description="Manage Categories for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />

            <Heading title="API reference" description="Categories API reference" />
            <Separator />
            <ApiList entityName="Categories" entityIdName="CategoriesId" />
        </>
    )
}