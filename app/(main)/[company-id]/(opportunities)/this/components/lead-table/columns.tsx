"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { EyeIcon } from "lucide-react"
import { Opportunity } from "@/app/this/constants/type"
import { Badge } from "@/components/ui/badge"

export function getColumns(
    handleView: (opportunity: Opportunity) => void
): ColumnDef<Opportunity>[] {
    return [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => {
                return <span className="font-medium">{row.original.id}</span>
            }
        },
        {
            accessorKey: "name",
            header: "Contact",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col">
                        <span className="font-medium">
                            {row.original.first_name} {row.original.last_name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                            {row.original.email}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "address",
            header: "Location",
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col">
                        <span>{row.original.address.street}</span>
                        <span className="text-sm text-muted-foreground">
                            {row.original.address.city}, {row.original.address.country}
                        </span>
                    </div>
                )
            }
        },
        {
            accessorKey: "phone_number",
            header: "Phone",
        },
        {
            accessorKey: "cp_type",
            header: "Type",
            cell: ({ row }) => {
                const typeColors = {
                    'Flachdach': 'bg-blue-100 text-blue-800',
                    'Terrassendach': 'bg-green-100 text-green-800',
                    'Spitzdach': 'bg-purple-100 text-purple-800'
                }
                return (
                    <Badge className={typeColors[row.original.cp_type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'}>
                        {row.original.cp_type}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const statusColors = {
                    'New': 'bg-gray-100 text-gray-800',
                    'Contacted': 'bg-yellow-100 text-yellow-800',
                    'In Progress': 'bg-blue-100 text-blue-800',
                    'Cancelled': 'bg-red-100 text-red-800',
                    'Completed': 'bg-green-100 text-green-800'
                }
                return (
                    <Badge className={statusColors[row.original.status]}>
                        {row.original.status}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "offer_from",
            header: "Offer Date",
            cell: ({ row }) => {
                return new Date(row.original.offer_from).toLocaleDateString()
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(row.original)}
                    >
                        <EyeIcon className="w-4 h-4" />
                    </Button>
                )
            }
        }
    ]
}