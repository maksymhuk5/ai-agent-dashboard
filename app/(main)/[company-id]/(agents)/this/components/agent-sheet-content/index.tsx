import { Clock, Globe, Layers2, Phone, PhoneIncoming, PhoneCall, PhoneOutgoing, CalendarClock, PencilRuler, Trash, ArrowRight, PhoneMissed } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Agent } from "@/app/this/constants/type";
export default function AgentSheetContent({
  agent,
  handleCloseSheet,
  handleOpenDialer,
}: {
  agent: any;
  handleCloseSheet: () => void;
  handleOpenDialer: (agent: Agent) => void;
}) {
  const {
        agent_id,
        agent_name,
        avatar,
        language,
        phone_number,
        type,
        totalCallTime,
        completedLeads,
        incomingCalls,
        outgoingCalls
    } = agent;

    const handleOpenSettings = () => {
        window.open(`https://dashboard.retellai.com/agents/${agent_id}`, '_blank');
    }

    return (
        <Sheet open={true} onOpenChange={handleCloseSheet}>
            <SheetContent 
                side="right" 
                className="w-full max-w-[640px] overflow-y-auto"
                aria-describedby="agent-sheet-description"
            >
                <SheetHeader>
                    <SheetTitle>{agent_name}</SheetTitle>
                    <SheetDescription>
                        View and manage agent details and statistics
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Header */}
                    <div className="flex gap-4">
                        <Avatar className="h-32 w-32 border-4 border-gray-600 dark:border-gray-400 rounded-lg">
                            <AvatarImage src={avatar || "/images/agent.jpg"} alt={agent_name} />
                            <AvatarFallback className="text-6xl">{agent_name?.slice(0, 1)?.toUpperCase() || "🤖"}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 gap-2 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Layers2 className="h-4 w-4" />
                                    <span>{"AI Agent"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    <span>{language}</span>
                                </div>
                                {
                                    phone_number.inbound_number && <div className="flex items-center gap-2">
                                        <PhoneIncoming className="h-4 w-4" />
                                        <span>{phone_number.inbound_number}</span>
                                    </div>
                                }
                                {
                                    phone_number.outbound_number && <div className="flex items-center gap-2">
                                        <PhoneOutgoing className="h-4 w-4" />
                                        <span>{phone_number.outbound_number}</span>
                                    </div>
                                }
                                {
                                    !phone_number.inbound_number && !phone_number.outbound_number ?
                                    <div className="flex items-center gap-2 text-lg text-sky-500">
                                        <PhoneMissed className="h-5 w-5" />
                                        <span>{"No Phone Number"}</span>
                                    </div> : null   
                                }
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-2 text-sm text-muted-foreground">Operations</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <Button variant="secondary" className="w-full" onClick={(e) => {
                            e.stopPropagation();
                            handleOpenDialer(agent);
                        }}>
                            <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full">
                            <CalendarClock className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full">
                            <PencilRuler className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>


                    {/* Stats Grid */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-2 text-sm text-muted-foreground">Agent Statistics</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-5 w-5 text-orange-500" />
                                <span className="font-medium text-base">Total Call Time</span>
                            </div>
                            <p className="text-2xl font-bold">{"12"} mins</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneCall className="h-5 w-5 text-green-500" />
                                <span className="font-medium text-base">Completed Leads</span>
                            </div>
                            <p className="text-2xl font-bold">{"12"}</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneIncoming className="h-5 w-5 text-blue-500" />
                                <span className="font-medium text-base">Incoming Calls</span>
                            </div>
                            <p className="text-2xl font-bold">{"2"}</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneOutgoing className="h-5 w-5 text-purple-500" />
                                <span className="font-medium text-base">Outgoing Calls</span>
                            </div>
                            <p className="text-2xl font-bold">{"5"}</p>
                        </div>
                    </div>

                    {/* Setting Grid */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full h-px bg-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-background px-2 text-sm text-muted-foreground">Agent Settings</span>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <Button variant="link" className="text-sm text-muted-foreground" onClick={handleOpenSettings}>
                            Go to Agent Settings <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}