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
import { DataTablePagination } from "@/app/this/components/table/datatable-pagination";
import { Opportunity } from "@/app/this/constants/type";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { opportunities as temp_opportunities } from "@/app/this/constants/garbage";

export default function OpportunitiesPage() {
    const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
    const { toast } = useToast();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
        total: 0
    });

    useEffect(() => {
        fetchOpportunities();
    }, [searchQuery, pagination.pageIndex, pagination.pageSize]);

    const fetchOpportunities = async () => {
        try {
            setLoading(true);
            // TODO: Implement API call
            // const response = await fetch(...);
            // const data = await response.json();
            console.log(temp_opportunities);
            setOpportunities(temp_opportunities);
            // setPagination(prev => ({ ...prev, total: data.total }));
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch opportunities",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleView = (opportunity: Opportunity) => {
        setSelectedOpportunity(opportunity);
    };

    

    const table = useReactTable({
        data: opportunities,
        columns: getColumns(handleView),
        getCoreRowModel: getCoreRowModel(),
        pageCount: Math.ceil(pagination.total / pagination.pageSize),
        state: {
            pagination: {
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
            },
        },
    });

    return (
        <div className="flex flex-col">
            <SubHeader>
                <div className="flex items-center justify-start gap-2">
                    <div className="relative flex-1 justify-start max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search opportunities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <DataTableViewOptions table={table}>
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
                    <DataTablePagination 
                        pagination={pagination} 
                        setPagination={setPagination} 
                    />
                </div>
            </Container>

            <Dialog open={!!selectedOpportunity} onOpenChange={() => setSelectedOpportunity(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Opportunity Details</DialogTitle>
                    </DialogHeader>
                    {selectedOpportunity && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p><span className="font-semibold">ID:</span> {selectedOpportunity.id}</p>
                                <p><span className="font-semibold">Name:</span> {selectedOpportunity.first_name} {selectedOpportunity.last_name}</p>
                                <p><span className="font-semibold">Email:</span> {selectedOpportunity.email}</p>
                                <p><span className="font-semibold">Phone:</span> {selectedOpportunity.phone_number}</p>
                                <p><span className="font-semibold">Address:</span> {selectedOpportunity.address.street}, {selectedOpportunity.address.city}, {selectedOpportunity.address.country}</p>
                                <p><span className="font-semibold">Contact Type:</span> {selectedOpportunity.cp_type}</p>
                                <p><span className="font-semibold">Status:</span> {selectedOpportunity.status}</p>
                                <p><span className="font-semibold">Offer Date:</span> {selectedOpportunity.offer_from}</p>
                                <p><span className="font-semibold">Last Updated:</span> {selectedOpportunity.updated_at}</p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Coordinates:</span> {selectedOpportunity.coordinates.lat}, {selectedOpportunity.coordinates.lng}</p>
                                <p><span className="font-semibold">Created At:</span> {selectedOpportunity.created_at}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}