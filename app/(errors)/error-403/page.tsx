'use client'
import Link from 'next/link';
import { Ban, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error403() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center gap-6">
            <Ban className="h-24 w-24 text-destructive animate-[pulse_1s_ease-in-out_infinite] hover:animate-[bounce_1s_ease-in-out_infinite]" />
            
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Forbidden Access</h1>
                <p className="text-muted-foreground text-lg">
                    Sorry, you don&apos;t have permission to access this page.
                </p>
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <Button asChild>
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}