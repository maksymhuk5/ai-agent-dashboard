import { Twitter, Facebook, Linkedin, Youtube, Info, Mail, Briefcase, FileText, Shield, Cookie, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    const footerSections = [
        {
            title: "Company",
            links: [
                { text: "About Us", href: "#", icon: Info },
                { text: "Contact", href: "#", icon: Mail },
                { text: "Careers", href: "#", icon: Briefcase },
            ]
        },
        {
            title: "Legal",
            links: [
                { text: "Privacy Policy", href: "#", icon: Shield },
                { text: "Terms of Service", href: "#", icon: FileText },
                { text: "Cookie Policy", href: "#", icon: Cookie },
            ]
        },
        {
            title: "Connect",
            links: [
                { text: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
                { text: "Twitter", href: "https://twitter.com/", icon: Twitter },
                { text: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
                { text: "YouTube", href: "https://www.youtube.com/", icon: Youtube },
            ]
        }
    ];

    const contactInfo = [
        { icon: Phone, text: "+1 309-621-6036" },
        { icon: Mail, text: "info@nexvoz.com" },
        { icon: MapPin, text: "USA: 8635 W Sahara Ave Las Vegas, NV 89117-5858" },
        { icon: MapPin, text: "Brazil: RUA SÃO GABRIEL 555 SALA 43, JARDIM PAULISTA, SP" },
    ];

    const LAUNCHED_YEAR = 2023; // Replace with your actual launch year

    return (
        <footer className="border-t bg-background">
            <div className="container py-12">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="mb-8 md:mb-0">
                        <div className="mb-4">
                            <Image
                                src="/images/nexvoz-blue.svg"
                                alt="Nexvoz Logo"
                                width={120}
                                height={40}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/nexvoz-white.svg"
                                alt="Nexvoz Logo"
                                width={120}
                                height={40}
                                className="hidden dark:block"
                            />
                        </div>
                        <ul className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-center text-sm text-muted-foreground">
                                    <item.icon className="mr-2 h-4 w-4" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a
                                                href={link.href}
                                                className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center"
                                            >
                                                {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 text-center text-sm text-muted-foreground">
                    © {LAUNCHED_YEAR}-{new Date().getFullYear()} <span className="font-bold">Nexvoz</span>. All rights reserved.
                </div>
            </div>
        </footer>
    );
}