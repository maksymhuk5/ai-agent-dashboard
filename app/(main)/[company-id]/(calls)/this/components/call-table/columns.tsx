"use client"

import { Call } from "@/app/this/constants/type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon, DownloadIcon, ArrowUpDown, Headset, MessageSquareText } from "lucide-react";

export default function createCallColumns(
    handleListen: (call: Call) => void,
    handleSummarize: (call: Call) => void
): ColumnDef<Call>[] {
    return [
        {
            accessorKey: "start_timestamp",
            header: () => (
                <div className="flex items-center">
                    Time
                    <Button variant="ghost" className="ml-2">
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => {
                return new Date(row.original.start_timestamp).toLocaleString()
            }
        },
        {
            accessorKey: "duration_ms",
            header: "Duration",
            cell: ({ row }) => {
                const seconds = Math.floor(row.original.duration_ms / 1000)
                const minutes = Math.floor(seconds / 60)
                const remainingSeconds = seconds % 60
                return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
            }
        },
        {
            accessorKey: "direction",
            header: "Type",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.direction === 'inbound'
                            ? 'bg-green-100 text-green-800'
                            : row.original.direction === 'outbound'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}>
                        {row.original.call_type === 'web_call' 
                            ? row.original.call_type
                            : row.original.direction}
                    </div>
                )
            }
        },
        {
            accessorKey: "call_cost",
            header: "Cost",
            cell: ({ row }) => {
                return `$${(row.original.call_cost.combined_cost/100).toFixed(2)}`
            }
        },
        {
            accessorKey: "agent_id",
            header: "Agent ID",
            cell: ({ row }) => {
                return row.original.agent_id
            }
        },
        {
            accessorKey: "from_number",
            header: "From",
            cell: ({ row }) => {
                return row.original.from_number
            }
        },
        {
            accessorKey: "to_number", 
            header: "To",
            cell: ({ row }) => {
                return row.original.to_number
            }
        },
        {
            accessorKey: "call_analysis",
            header: "Result",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.call_analysis.call_successful
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {row.original.call_analysis.call_completion_rating}
                    </div>
                )
            }
        },
        {
            accessorKey: "call_status",
            header: "Status",
            cell: ({ row }) => {
                return (
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${row.original.call_status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : row.original.call_status === 'error'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {row.original.call_status.charAt(0).toUpperCase() + row.original.call_status.slice(1)}
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
                            onClick={() => handleSummarize(row.original)}
                        >
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleListen(row.original)}
                        >
                            <MessageSquareText className="w-4 h-4" />
                        </Button>
                    </div>
                )
            }
        }
    ]
}
