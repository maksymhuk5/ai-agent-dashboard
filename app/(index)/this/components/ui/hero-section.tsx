"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from 'next/navigation';

const heroContent = {
    title: "Enterprise-Grade AI Agents",
    description: "Handle 1000+ concurrent calls with our scalable AI agents. Perfect for high-volume customer service operations. Our AI agents are designed to handle complex inquiries, provide consistent responses, and learn from each interaction to continuously improve performance. Ideal for call centers, customer support teams, and any business looking to enhance their customer communication at scale.",
    image: "/images/call-center.jpg"
};

export default function HeroSection() {
    const router = useRouter();
    const handleGetStarted = () => router.push('/auth/sign-in');
    
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={heroContent.image}
                    alt="Call center background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-background/75 dark:bg-background/90" />
            </div>
            <div className="container relative z-10">
                <div className="mx-auto flex w-4/5 flex-col items-center gap-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-gradient">
                        Nexvoz: AI Voice Agents for Modern Business
                    </h1>

                    <div className="max-w-2xl mt-8">
                        <h2 className="text-2xl font-bold mb-4">{heroContent.title}</h2>
                        <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                            {heroContent.description}
                        </p>
                    </div>

                    <Button 
                        size="lg" 
                        className="mt-8"
                        onClick={handleGetStarted}
                    >
                        Get Started Today <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}