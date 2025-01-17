"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { EyeIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { Lead } from "@/app/this/constants/type"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function getColumns(
    handleView: (lead: Lead) => void,
    handleExport: (lead: Lead) => void,
    handleDelete: (id: string) => void
): ColumnDef<Lead>[] {
    return [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2 md:gap-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={row.original.avatar} alt={row.original.name} />
                            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium">{row.original.name}</span>
                            <span className="text-sm text-muted-foreground">{row.original.email}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "groupId",
            header: "Group",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                return new Date(row.original.createdAt).toLocaleDateString()
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(row.original)}
                        >
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport(row.original)}
                        >
                            <DownloadIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </div>
                )
            }
        }
    ]
}
