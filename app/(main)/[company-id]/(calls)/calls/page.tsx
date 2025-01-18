"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CallTable } from "../this/components/call-table";
import createCallColumns from "../this/components/call-table/columns";
import SubHeader from "@/app/(main)/this/components/sub-header";
import Container from "@/app/this/components/container";
import { Button } from "@/components/ui/button";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/app/this/components/table/datatable-view";
import OperationContainer, { OperationButton } from "@/app/(main)/this/components/operation-container";
import { DataTablePagination } from "@/app/this/components/table/datatable-pagination";
import { Call } from "@/app/this/constants/type";
import { calls as sample_calls } from "@/app/this/constants/garbage";
import { Download } from "lucide-react";
import { getRetellClient } from "@/lib/retell";
import TranscriptDialog from "../this/components/transcript-dialog";
import { SummaryDialog } from "../this/components/summary-dialog";

export default function CallsPage() {
    const [calls, setCalls] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [transcriptCall, setTranscriptCall] = useState<Call | null>(null);
    const [summaryCall, setSummaryCall] = useState<Call | null>(null);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        total: 245
    });

    // Filter calls based on search query
    useEffect(() => {
        fetchCalls();
    }, [searchQuery, pagination]);
    
    const fetchCalls = async () => {
        try {
            setLoading(true);
            const client = await getRetellClient();
            const res_calls = await client.call.list({});
            
            setCalls(res_calls as Call[]);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleListen = (call: Call) => {
        setTranscriptCall(call);
    }

    const handleSummarize = (call: Call) => {
        setSummaryCall(call);
    }

    const table = useReactTable({
        data: calls,
        columns: createCallColumns(handleListen, handleSummarize),
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
                            placeholder="Search team members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <DataTableViewOptions  table={table} >
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
                    <CallTable loading={loading} table={table} />
                    <DataTablePagination pagination={pagination} setPagination={setPagination} />
                </div>
            </Container>

            {/* <OperationContainer>
                <OperationButton iconNode={Download} tooltip="Export" />
            </OperationContainer> */}

            <TranscriptDialog transcriptCall={transcriptCall} setTranscriptCall={setTranscriptCall} />
            <SummaryDialog summaryCall={summaryCall} setSummaryCall={setSummaryCall} />
        </div>
    );
}