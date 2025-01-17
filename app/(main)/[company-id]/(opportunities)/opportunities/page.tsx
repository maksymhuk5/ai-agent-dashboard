"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LeadTable } from "../this/components/lead-table";
import { getColumns } from "../this/components/lead-table/columns";
import SubHeader from "@/app/(main)/this/components/sub-header";
import Container from "@/app/this/components/container";
import { Button } from "@/components/ui/button";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/app/this/components/table/datatable-view";
import OperationContainer, { OperationButton } from "@/app/(main)/this/components/operation-container";
import { DataTablePagination } from "@/app/this/components/table/datatable-pagination";
import { Lead } from "@/app/this/constants/type";
import { leads as sample_leads } from "@/app/this/constants/garbage";

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        total: 245
    });

    // Filter leads based on search query
    useEffect(() => {
        const filteredLeads = sample_leads.filter(lead =>
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.groupId.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setLeads(filteredLeads);
    }, [searchQuery, pagination]);

    const handleView = (lead: Lead) => {
        console.log(lead);
    }

    const handleDelete = (id: string) => {
        console.log(id);
    }

    const handleExport = (lead: Lead) => {
        console.log(lead);
    }

    const table = useReactTable({
        data: leads,
        columns: getColumns(handleView, handleExport, handleDelete),
        getCoreRowModel: getCoreRowModel(),
        initialState: {}, // Add empty initial state to avoid hydration warning
    });

    return (
        <div className="flex flex-col">
            <SubHeader>
                <div className="flex items-center justify-start gap-2">
                    <div className="relative flex-1 justify-start max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <DataTableViewOptions table={table} >
                            <Button variant="outline">
                                <SlidersHorizontal className="h-4 w-4 md:mr-2" />
                                <span className="hidden md:block">Filter</span>
                            </Button>
                        </DataTableViewOptions>
                    </div>
                </div>
            </SubHeader>

            <Container>
                <div className="flex flex-col gap-2 md:gap-4">
                    <LeadTable table={table} />
                    <DataTablePagination pagination={pagination} setPagination={setPagination} />
                </div>
            </Container>

            <OperationContainer>
                <OperationButton iconNode={Download} tooltip="Export" />
            </OperationContainer>
        </div>
    );
}