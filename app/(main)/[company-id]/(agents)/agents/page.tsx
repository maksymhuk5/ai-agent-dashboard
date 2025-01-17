"use client";

import { useState, useMemo, useEffect } from "react";
import { Agent } from "@/app/this/constants/type";

import { Plus, Search, SlidersHorizontal, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import DialerDialog from "../this/components/dialer-dialog";
import AgentSheetContent from "../this/components/agent-sheet-content";
import AgentCard from "../this/components/agent-card";
import SubHeader from "@/app/(main)/this/components/sub-header";
import Container from "@/app/this/components/container";
import { Button } from "@/components/ui/button";
import OperationContainer, { OperationButton } from "@/app/(main)/this/components/operation-container";
import { Skeleton } from "@/components/ui/skeleton";

import { getRetellClient } from "@/lib/retell";
import { useToast } from "@/hooks/use-toast";


export default function AgentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [openDialer, setOpenDialer] = useState<any>({open: false});
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    
    // Filter agents based on search query
    const filteredAgents = useMemo(() => {
        return agents.filter(agent =>
            agent.agent_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [agents, searchQuery]);

    const handleOpenDialer = (agent: Agent) => {
        console.log(agent);
        if (agent.phone_number.outbound_number) {
            setOpenDialer({ open: true, agent });
        } else {
            toast({
                title: "No outbound phone number found",
                description: "Please add a outbound phone number to the agent",
                variant: "destructive"
            });
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const retell = getRetellClient();
            const res_agents = await retell.agent.list();
            const res_phoneNumbers = await retell.phoneNumber.list();

            const agentsWithPhoneNumbers = res_agents.map(agent => {
                const phoneNumbers = res_phoneNumbers.filter(phoneNumber =>
                    phoneNumber.inbound_agent_id === agent.agent_id ||
                    phoneNumber.outbound_agent_id === agent.agent_id
                );

                return {
                    ...agent,
                    phone_number: {
                        inbound_number: phoneNumbers.find(p => p.inbound_agent_id === agent.agent_id)?.phone_number || null,
                        outbound_number: phoneNumbers.find(p => p.outbound_agent_id === agent.agent_id)?.phone_number || null
                    }
                };
            });

            setAgents(agentsWithPhoneNumbers as Agent[]);
        } catch (error) {
            console.error('Error fetching agents:', error);
            toast({
                title: "Error",
                description: "Failed to fetch agents",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const AgentSkeleton = () => (
        <div className="p-4 border rounded-lg">
            <div className="flex gap-4">
                <Skeleton className="h-32 w-32 rounded-lg" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col">
            <SubHeader>
                <div className="flex items-center justify-start gap-2">
                    <div className="relative flex-1 justify-start max-w-lg">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search agents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="outline">
                            <SlidersHorizontal className="h-4 w-4 md:mr-2" />
                            <span className="hidden md:block">Filter</span>
                        </Button>
                    </div>
                </div>
            </SubHeader>

            <Container className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-2 md:gap-4 w-full">
                {loading ? (
                    <>
                        <AgentSkeleton />
                        <AgentSkeleton />
                        <AgentSkeleton />
                    </>
                ) : (
                    filteredAgents.map((agent) => (
                        <AgentCard 
                            key={agent.agent_id} 
                            agent={agent} 
                            handleClickAgent={() => setSelectedAgent(agent)} 
                            handleOpenDialer={handleOpenDialer} 
                        />
                    ))
                )}
            </Container>

            {/* <OperationContainer>
                <OperationButton tooltip="Duplicate agent" iconNode={Copy}>
                </OperationButton>
                <OperationButton tooltip="Add agent" iconNode={Plus}>
                </OperationButton>
            </OperationContainer> */}

            {selectedAgent && <AgentSheetContent agent={selectedAgent} handleCloseSheet={() => setSelectedAgent(null)} handleOpenDialer={handleOpenDialer} />}
            {openDialer.open && <DialerDialog openDialer={openDialer} onOpenChange={() => setOpenDialer({open: false, agent: null})} />}

        </div>
    );
}
