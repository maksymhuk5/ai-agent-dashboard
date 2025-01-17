"use client"

import { Call } from "@/app/this/constants/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon, DownloadIcon, ArrowUpDown } from "lucide-react";

export default function createCallColumns(
    handleView: (call: Call) => void,
    handleDelete: (id: string) => void,
    handleExport: (call: Call) => void,
): ColumnDef<Call>[] {
    return [
        {
            accessorKey: "time",
            header: () => (
                <div className="flex items-center">
                    Time
                    <Button variant="ghost" className="ml-2">
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => {
                return new Date(row.original.time).toLocaleString()
            }
        },
        {
            accessorKey: "duration",
            header: "Duration",
            cell: ({ row }) => {
                const minutes = Math.floor(row.original.duration / 60)
                const seconds = row.original.duration % 60
                return `${minutes}:${seconds.toString().padStart(2, '0')}`
            }
        },
        {
            accessorKey: "callType",
            header: "Type",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.callType === 'Inbound'
                            ? 'bg-green-100 text-green-800'
                            : row.original.callType === 'Outbound'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                        {row.original.callType}
                    </div>
                )
            }
        },
        {
            accessorKey: "cost",
            header: "Cost",
            cell: ({ row }) => {
                return `$${row.original.cost.toFixed(2)}`
            }
        },
        {
            accessorKey: "agent",
            header: "Agent",
            cell: ({ row }) => {
                return row.original.agent.name
            }
        },
        {
            accessorKey: "lead",
            header: "Lead",
            cell: ({ row }) => {
                return row.original.lead.name
            }
        },
        {
            accessorKey: "from",
            header: "From",
            cell: ({ row }) => {
                return row.original.from
            }
        },
        {
            accessorKey: "to",
            header: "To",
            cell: ({ row }) => {
                return row.original.to
            }
        },
        {
            accessorKey: "callResult",
            header: "Result",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.callResult === 'Success'
                            ? 'bg-green-100 text-green-800'
                            : row.original.callResult === 'Failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {row.original.callResult}
                    </div>
                )
            }
        },
        {
            accessorKey: "callStatus",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.callStatus === 'Completed'
                            ? 'bg-green-100 text-green-800'
                            : row.original.callStatus === 'Failed' || row.original.callStatus === 'Missed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {row.original.callStatus}
                    </div>
                )
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
