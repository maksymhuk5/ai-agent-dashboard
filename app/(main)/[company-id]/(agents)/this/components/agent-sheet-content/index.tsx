import { Clock, Globe, Layers2, Phone, PhoneIncoming, PhoneCall, PhoneOutgoing, CalendarClock, PencilRuler, Trash } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AgentSheetContent({
  agent,
  handleCloseSheet,
  handleOpenDialer,
}: {
  agent: any;
  handleCloseSheet: () => void;
  handleOpenDialer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const {
        name,
        avatar,
        language,
        phone,
        type,
        totalCallTime,
        completedLeads,
        incomingCalls,
        outgoingCalls
    } = agent;

    return (
        <Sheet open={true} onOpenChange={handleCloseSheet}>
            <SheetContent 
                side="right" 
                className="w-full max-w-[640px] overflow-y-auto"
                aria-describedby="agent-sheet-description"
            >
                <SheetHeader>
                    <SheetTitle>{name}</SheetTitle>
                    <SheetDescription>
                        View and manage agent details and statistics
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Header */}
                    <div className="flex gap-4">
                        <div className="w-32 h-32 rounded-lg overflow-hidden shrink-0">
                            <img
                                src={avatar || "/images/agent.jpg"}
                                alt={name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 gap-2 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Layers2 className="h-4 w-4" />
                                    <span>{type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4" />
                                    <span>{language}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    <span>{phone}</span>
                                </div>
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
                        <Button variant="secondary" className="w-full" onClick={handleOpenDialer}>
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
                            <p className="text-2xl font-bold">{totalCallTime} mins</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneCall className="h-5 w-5 text-green-500" />
                                <span className="font-medium text-base">Completed Leads</span>
                            </div>
                            <p className="text-2xl font-bold">{completedLeads}</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneIncoming className="h-5 w-5 text-blue-500" />
                                <span className="font-medium text-base">Incoming Calls</span>
                            </div>
                            <p className="text-2xl font-bold">{incomingCalls}</p>
                        </div>

                        <div className="p-4 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                                <PhoneOutgoing className="h-5 w-5 text-purple-500" />
                                <span className="font-medium text-base">Outgoing Calls</span>
                            </div>
                            <p className="text-2xl font-bold">{outgoingCalls}</p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}