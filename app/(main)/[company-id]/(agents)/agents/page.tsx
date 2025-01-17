"use client";

import { useState, useMemo, useEffect } from "react";
import { agents } from "@/app/this/constants/garbage";
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

export default function AgentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [openDialer, setOpenDialer] = useState(false);

    // Filter agents based on search query
    const filteredAgents = useMemo(() => {
        return agents.filter(agent =>
            agent.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [agents, searchQuery]);

    const handleOpenDialer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenDialer(true);
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        const response = await fetch('/api/agents');
        const data = await response.json();
        console.log(data);
    };

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
                {filteredAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} handleClickAgent={() => setSelectedAgent(agent)} handleOpenDialer={handleOpenDialer} />
                ))}
            </Container>

            <OperationContainer>
                <OperationButton tooltip="Duplicate agent" iconNode={Copy}>
                </OperationButton>
                <OperationButton tooltip="Add agent" iconNode={Plus}>
                </OperationButton>
            </OperationContainer>

            {selectedAgent && <AgentSheetContent agent={selectedAgent} handleCloseSheet={() => setSelectedAgent(null)} handleOpenDialer={handleOpenDialer} />}
            {openDialer && <DialerDialog open={openDialer} onOpenChange={setOpenDialer} />}

        </div>
    );
}
