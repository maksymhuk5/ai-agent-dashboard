"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { EyeIcon, DownloadIcon, TrashIcon, PhoneIcon } from "lucide-react"
import { Opportunity } from "@/app/this/constants/type"
import { Badge } from "@/components/ui/badge"

export function getColumns(
    handleView: (opportunity: Opportunity) => void,
    handleCall: (opportunity: Opportunity) => void,
    handleExport: (opportunity: Opportunity) => void,
    handleDelete: (id: string) => void
): ColumnDef<Opportunity>[] {
    return [
        {
            accessorKey: "datetime",
            header: "Date & Time",
            cell: ({ row }) => {
                return new Date(row.original.datetime).toLocaleString()
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
            accessorKey: "phone_number",
            header: "Phone",
        },
        {
            accessorKey: "call_type",
            header: "Call Type"
        },
        {
            accessorKey: "agent_name", 
            header: "Agent"
        },
        {
            accessorKey: "address",
            header: "Location",
            cell: ({ row }) => {
                const address = row.original.address
                return `${address.city}, ${address.country}`
            }
        },
        {
            accessorKey: "cp_type",
            header: "Contact Type"
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const statusColors = {
                    'New': 'bg-blue-100 text-blue-800',
                    'Contacted': 'bg-yellow-100 text-yellow-800',
                    'Qualified': 'bg-purple-100 text-purple-800',
                    'Proposal': 'bg-indigo-100 text-indigo-800',
                    'Negotiation': 'bg-orange-100 text-orange-800',
                    'Closed Won': 'bg-green-100 text-green-800',
                    'Closed Lost': 'bg-red-100 text-red-800',
                    'Follow Up': 'bg-cyan-100 text-cyan-800'
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
            header: "Offer Amount"
        },
        {
            accessorKey: "call_duration",
            header: "Duration",
            cell: ({ row }) => {
                const minutes = Math.floor(row.original.call_duration / 60)
                const seconds = row.original.call_duration % 60
                return `${minutes}:${seconds.toString().padStart(2, '0')}`
            }
        },
        {
            accessorKey: "total_costs",
            header: "Cost",
            cell: ({ row }) => {
                return `$${row.original.total_costs.toFixed(2)}`
            }
        },
        {
            accessorKey: "scoring",
            header: "Score",
            cell: ({ row }) => {
                return (
                    <Badge className={
                        row.original.scoring >= 8 ? 'bg-green-100 text-green-800' :
                        row.original.scoring >= 5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }>
                        {row.original.scoring}/10
                    </Badge>
                )
            }
        },
        {
            accessorKey: "follow_up",
            header: "Follow Up",
            cell: ({ row }) => {
                return row.original.follow_up ? new Date(row.original.follow_up).toLocaleDateString() : '-'
            }
        },
        {
            accessorKey: "scheduled_appointment_with",
            header: "Appointment With",
            cell: ({ row }) => {
                return row.original.scheduled_appointment_with || '-'
            }
        },
        {
            accessorKey: "successful_appointment_scheduling",
            header: "Appointment Status",
            cell: ({ row }) => {
                return (
                    <Badge className={row.original.successful_appointment_scheduling ? 
                        'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}>
                        {row.original.successful_appointment_scheduling ? 'Scheduled' : 'Not Scheduled'}
                    </Badge>
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
                            onClick={() => handleCall(row.original)}
                        >
                            <PhoneIcon className="w-4 h-4" />
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