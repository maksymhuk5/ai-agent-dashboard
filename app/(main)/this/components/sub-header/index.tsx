"use client";

import { useDeviceInfo } from "@/hooks/use-device-info";

export default function SubHeader({ children }: { children: React.ReactNode }) {

    const { device } = useDeviceInfo();

    if (device === "mobile") {
        return (
            <div className="fixed w-full bg-background bottom-0 z-50 border-t p-2 md:p-4" suppressHydrationWarning>
                {children}
            </div>
        );
    }
    else {
        return (
            <div className="sticky bg-background top-0 z-50 border-b p-2 md:p-4">
                {children}
            </div>
        );
    }
}