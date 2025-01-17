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

    const handleCall = (opportunity: Opportunity) => {
        // TODO: Implement call functionality
        console.log("Call:", opportunity);
    };

    const handleExport = (opportunity: Opportunity) => {
        // TODO: Implement export functionality
        console.log("Export:", opportunity);
    };

    const handleDelete = async (id: string) => {
        try {
            // TODO: Implement delete API call
            toast({
                title: "Success",
                description: "Opportunity deleted successfully"
            });
            fetchOpportunities();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete opportunity",
                variant: "destructive"
            });
        }
    };

    const table = useReactTable({
        data: opportunities,
        columns: getColumns(handleView, handleCall, handleExport, handleDelete),
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
                                <p><span className="font-semibold">Record ID:</span> {selectedOpportunity.fx_record_id}</p>
                                <p><span className="font-semibold">Call ID:</span> {selectedOpportunity.call_id}</p>
                                <p><span className="font-semibold">Contact ID:</span> {selectedOpportunity.contact_id}</p>
                                <p><span className="font-semibold">Organization ID:</span> {selectedOpportunity.org_id}</p>
                                <p><span className="font-semibold">Date & Time:</span> {new Date(selectedOpportunity.datetime).toLocaleString()}</p>
                                <p><span className="font-semibold">Call Type:</span> {selectedOpportunity.call_type}</p>
                                <p><span className="font-semibold">Name:</span> {selectedOpportunity.first_name} {selectedOpportunity.last_name}</p>
                                <p><span className="font-semibold">Email:</span> {selectedOpportunity.email}</p>
                                <p><span className="font-semibold">Phone:</span> {selectedOpportunity.phone_number}</p>
                                <p><span className="font-semibold">Total Costs:</span> ${selectedOpportunity.total_costs.toFixed(2)}</p>
                                <p><span className="font-semibold">Transport Model:</span> {selectedOpportunity.transport_model}</p>
                                <p><span className="font-semibold">Voice VAPI:</span> {selectedOpportunity.voice_vapi}</p>
                                <p><span className="font-semibold">Retell:</span> {selectedOpportunity.retell}</p>
                            </div>
                            <div className="space-y-2">
                                <p><span className="font-semibold">Analysis:</span> {selectedOpportunity.analysis}</p>
                                <p><span className="font-semibold">Ended Reason:</span> {selectedOpportunity.ended_reason}</p>
                                <p><span className="font-semibold">Transfer Destination:</span> {selectedOpportunity.transfer_destination || 'N/A'}</p>
                                <p><span className="font-semibold">Agent Name:</span> {selectedOpportunity.agent_name}</p>
                                <p><span className="font-semibold">Address:</span> {selectedOpportunity.address.street}, {selectedOpportunity.address.city}, {selectedOpportunity.address.country}</p>
                                <p><span className="font-semibold">Contact Type:</span> {selectedOpportunity.cp_type}</p>
                                <p><span className="font-semibold">Status:</span> {selectedOpportunity.status}</p>
                                <p><span className="font-semibold">Offer Amount:</span> {selectedOpportunity.offer_from}</p>
                                <p><span className="font-semibold">Call Duration:</span> {Math.floor(selectedOpportunity.call_duration / 60)}:{(selectedOpportunity.call_duration % 60).toString().padStart(2, '0')}</p>
                                <p><span className="font-semibold">Score:</span> {selectedOpportunity.scoring}/10</p>
                                <p><span className="font-semibold">Reasons:</span> {selectedOpportunity.reasons.join(', ')}</p>
                                <p><span className="font-semibold">Follow Up:</span> {selectedOpportunity.follow_up ? new Date(selectedOpportunity.follow_up).toLocaleDateString() : 'N/A'}</p>
                                <p><span className="font-semibold">Appointment With:</span> {selectedOpportunity.scheduled_appointment_with || 'N/A'}</p>
                                <p><span className="font-semibold">Appointment Status:</span> {selectedOpportunity.successful_appointment_scheduling ? 'Scheduled' : 'Not Scheduled'}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}