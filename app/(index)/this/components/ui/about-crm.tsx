import Image from "next/image";
import {
    Workflow,
    Zap,
    MessageCircle,
    Mail,
    Phone,
    Users,
    Settings
} from "lucide-react";

export default function AboutCRM() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/crm-automation.jpg"
                    alt="CRM automation background"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="absolute inset-0 bg-background/75 dark:bg-background/90" />
            </div>
            <div className="container relative z-10">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Seamless CRM Automation</h2>
                        <Settings className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Streamline your workflow with our comprehensive CRM automation solutions.
                        Integrate with your favorite tools and platforms for efficient lead management and customer engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Workflow className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Make.com Integration</h3>
                        </div>
                        <p className="text-muted-foreground">Create powerful automated workflows and connect your business apps seamlessly with Make.com integration.</p>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Zapier Support</h3>
                        </div>
                        <p className="text-muted-foreground">Automate repetitive tasks and connect with thousands of apps through our Zapier integration.</p>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <MessageCircle className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">WhatsApp Business</h3>
                        </div>
                        <p className="text-muted-foreground">Engage with customers directly through WhatsApp, automating responses and managing conversations efficiently.</p>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Email Automation</h3>
                        </div>
                        <p className="text-muted-foreground">Create and manage email templates for automated customer communications and marketing campaigns.</p>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Phone className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Twilio Integration</h3>
                        </div>
                        <p className="text-muted-foreground">Enable powerful voice and SMS capabilities with Twilio integration for comprehensive customer communication.</p>
                    </div>

                    <div className="p-6 bg-background/50 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-primary" />
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Lead Management</h3>
                        </div>
                        <p className="text-muted-foreground">Track, nurture, and convert leads effectively with our automated lead management system.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}