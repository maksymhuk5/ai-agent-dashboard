import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Cog, LucideIcon } from "lucide-react";
import { useState } from "react";
import { useDeviceInfo } from "@/hooks/use-device-info";

export function OperationButton({ 
    children,
    tooltip,
    iconNode,
    onClick
}: { 
    children?: React.ReactNode,
    tooltip?: string,
    iconNode?: LucideIcon,
    onClick?: () => void
}) {
    return (
        <Button 
            size="icon" 
            className="rounded-full shadow-sm shadow-foreground border-1 border-background transition-all duration-200 hover:scale-110 h-12 w-12"
            title={tooltip}
            onClick={onClick}
        >
            {children || (
                iconNode && React.createElement(iconNode, { className: "h-10 w-10" })
            )}
        </Button>
    );
}

export default function OperationContainer({ children }: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(false);
    const { device } = useDeviceInfo();
    const isMobile = device === "mobile";

    return (<div className={`absolute right-4 flex flex-col-reverse gap-2 ${isMobile ? "bottom-16" : "bottom-6"}`}>
        {isOpen && (
            <>
                {children}
            </>
        )}

        <Button
            size="icon"
            variant={isOpen ? "outline" : "default"}
            className={`rounded-full shadow-sm shadow-foreground border-1 transition-all duration-200 hover:scale-110 h-12 w-12`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {!isOpen ? <Cog className="h-10 w-10" /> : <Plus className="transition-transform duration-200 rotate-45" />}
        </Button>
    </div>)
}