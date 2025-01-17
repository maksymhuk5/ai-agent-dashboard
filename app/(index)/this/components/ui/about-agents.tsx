import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, ShoppingCart, HeadphonesIcon, ClipboardList, MessageSquare, Building2, Wand2 } from "lucide-react";

export default function AboutAgents() {
    const agents = [
        {
            title: "Sales Agent",
            description: "AI-powered sales assistant",
            content: "Revolutionize your sales process with our AI-powered Sales Agent. This cutting-edge assistant excels in proactive outreach, effortlessly handling product inquiries and nurturing leads. By leveraging advanced natural language processing, it engages potential customers in meaningful conversations, identifies pain points, and presents tailored solutions. Boost your conversion rates and streamline your sales funnel with this tireless, 24/7 sales professional.",
            badge: "Revenue Booster",
            icon: ShoppingCart
        },
        {
            title: "Customer Service Agent",
            description: "AI-powered support assistant",
            content: "Elevate your customer support with our AI-powered Customer Service Agent. This intelligent assistant manages inbound issues with empathy and efficiency, while proactively conducting outbound follow-ups to ensure customer satisfaction. Using sentiment analysis and machine learning, it adapts its communication style to each customer, providing personalized solutions and building lasting relationships. Experience reduced wait times, increased resolution rates, and improved customer loyalty.",
            badge: "Satisfaction Guarantee",
            icon: HeadphonesIcon
        },
        {
            title: "Secretary Agent",
            description: "AI-powered administrative assistant",
            content: "Transform your office workflow with our AI-powered Secretary Agent. This virtual administrative wizard handles a myriad of tasks with precision and grace. From managing complex schedules and appointments to acting as a polished first point of contact, it streamlines your daily operations. Equipped with natural language understanding, it can prioritize tasks, draft correspondence, and even anticipate needs before they arise. Boost productivity and professionalism across your organization.",
            badge: "Efficiency Expert",
            icon: ClipboardList
        },
        {
            title: "Feedback Collection Agent",
            description: "AI-powered insight gatherer",
            content: "Unlock the power of customer insights with our AI-powered Feedback Collection Agent. This sophisticated tool conducts outbound calls to gather detailed, nuanced feedback while also managing inbound queries with finesse. Using advanced analytics, it identifies trends, sentiment, and key areas for improvement in real-time. Transform raw data into actionable strategies, driving continuous improvement and customer-centric innovation across your business.",
            badge: "Insight Innovator",
            icon: MessageSquare
        },
        {
            title: "Institutional Agent",
            description: "AI-powered formal communicator",
            content: "Navigate complex institutional landscapes with our AI-powered Institutional Agent. Designed for formal communication, this agent handles intricate inquiries and facilitates seamless interaction between organizations. With a deep understanding of protocol and etiquette, it maintains professionalism in every exchange. From drafting official correspondence to managing inter-departmental communications, it ensures clarity, compliance, and courtesy in all institutional dialogues.",
            badge: "Protocol Pro",
            icon: Building2
        },
        {
            title: "Custom Agent",
            description: "Blank canvas AI assistant",
            content: "Unleash limitless possibilities with our AI-powered Custom Agent. This versatile, blank-canvas assistant is the epitome of flexibility, adapting to your unique business needs with unparalleled precision. Whether you're venturing into new markets, launching innovative products, or reimagining customer interactions, this agent can be molded to fit your exact specifications. With no pre-existing training limitations, it's ready to absorb your industry knowledge and company culture, becoming a bespoke solution that grows and evolves with your business.",
            badge: "Infinite Adaptability",
            icon: Wand2
        }
    ];

    return (
        <section className="container py-24 space-y-8">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <Bot className="w-8 h-8 text-primary" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Intelligent AI Agents</h2>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Unlock the future of business with our suite of 40+ specialized AI agents. From sales to support,
                    each agent is meticulously crafted to transform your operations and drive unprecedented growth.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {agents.map((agent, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                    <agent.icon className="mr-2 h-5 w-5 text-primary" />
                                    <CardTitle className="text-xl font-semibold">{agent.title}</CardTitle>
                                </div>
                                <Badge variant="secondary">{agent.badge}</Badge>
                            </div>
                            <CardDescription className="text-sm text-muted-foreground">{agent.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm leading-relaxed">{agent.content}</p>
                        </CardContent>
                        <div className="p-4 mt-auto">
                            <a href="#" className="text-sm font-medium text-primary hover:underline inline-flex items-center">
                                Learn more <ArrowRight className="ml-1 h-4 w-4" />
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}