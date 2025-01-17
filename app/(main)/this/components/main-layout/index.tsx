"use client"

import { useDeviceInfo } from "@/hooks/use-device-info";

const Filler = () => {
    return <div className="h-[52px]" />;
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { device } = useDeviceInfo();
    const isMobile = device === "mobile";
    return (
        <>
            <main className="flex-1 overflow-y-auto h-screen">
                {isMobile && <Filler />}
                {children}
                {isMobile && <Filler />}
            </main>
        </>
    )
}
