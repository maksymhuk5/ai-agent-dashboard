"use client"

import { Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>,
    children: React.ReactNode
}

export function DataTableViewOptions<TData>({
    table,
    children
}: DataTableViewOptionsProps<TData>) {
    const toggleAllColumns = (value: boolean) => {
        table.getAllColumns().forEach(column => {
            if (column.getCanHide()) {
                column.toggleVisibility(value)
            }
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children || <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <Settings2 />
                    View
                </Button>}
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[150px]">
                
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            checked={table.getAllColumns().every(col => col.getIsVisible())}
                            onCheckedChange={(value) => toggleAllColumns(!!value)}
                        />
                        <Label>All Columns</Label>
                    </div>
                    <Separator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <div key={column.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    />
                                    <Label className="capitalize">{column.id}</Label>
                                </div>
                            )
                        })}
                </div>
            </PopoverContent>
        </Popover>
    )
}
