"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { Building2, Globe, Image as ImageIcon, Briefcase, Calendar, FileText, MapPin, Building, Map, Mail, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formSchema = z.object({
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    DBA: z.string().min(2, "Business name must be at least 2 characters"),
    logo: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    industry: z.string().optional(),
    foundedYear: z.string().regex(/^\d{4}$/, "Please enter a valid year (YYYY)").optional(),
    description: z.string().optional(),
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipcode: z.string().min(5, "Valid zipcode is required"),
    teamEmails: z.array(z.string().email("Invalid email address")),
});

export default function CompanyInfoRegistration() {
    const router = useRouter();
    const { toast } = useToast();
    const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            DBA: "",
            logo: "",
            website: "",
            industry: "",
            foundedYear: "",
            description: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            teamEmails: [],
        },
    });

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                form.setValue("logo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInviteEmail = () => {
        if (!emailInput) return;

        if (invitedEmails.length >= 5) {
            toast({
                title: "Maximum Limit Reached",
                description: "You can add up to 5 team members.",
                variant: "destructive",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        if (invitedEmails.includes(emailInput)) {
            setEmailError("This email has already been invited");
            return;
        }

        setEmailError(null);
        setInvitedEmails([...invitedEmails, emailInput]);
        form.setValue("teamEmails", [...invitedEmails, emailInput]);
        setEmailInput("");

        toast({
            title: "Invitation Sent",
            description: `Invitation sent to ${emailInput}`,
        });
    };

    const removeInvitedEmail = (email: string) => {
        const newEmails = invitedEmails.filter(e => e !== email);
        setInvitedEmails(newEmails);
        form.setValue("teamEmails", newEmails);
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast({
                title: "Success",
                description: "Company information has been saved successfully.",
            });
            router.push("/");
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="relative z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-8 py-8 rounded-lg shadow-lg border w-full max-w-[95%] sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <div className="space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Company Information</h1>
                    <p className="text-sm text-muted-foreground">
                        Please enter your company details
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
                            <div className="space-y-4">
                                <h2 className="text-lg font-medium">Basic Information</h2>

                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Legal Company Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="Legal Company Name" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="DBA"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Business Name (DBA)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Building2 className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="Doing Business As" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website (Optional)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="https://example.com" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="industry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Industry (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Briefcase className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input placeholder="Enter industry" className="pl-8" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="foundedYear"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Founded Year (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="YYYY"
                                                            className="pl-8"
                                                            maxLength={4}
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="logo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Logo</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div
                                                        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary min-h-[200px] flex items-center justify-center"
                                                        onClick={() => document.getElementById('logo-upload')?.click()}
                                                    >
                                                        {logoPreview ? (
                                                            <img src={logoPreview} alt="Logo preview" className="max-h-40 max-w-full object-contain" />
                                                        ) : (
                                                            <div className="flex flex-col items-center">
                                                                <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                                                <span className="text-sm text-muted-foreground">Click to upload logo</span>
                                                            </div>
                                                        )}
                                                        <input
                                                            id="logo-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleLogoUpload}
                                                        />
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Description</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Textarea
                                                placeholder="Tell us about your company"
                                                className="resize-none pl-8 min-h-[100px]"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-4">
                            <h2 className="text-lg font-medium">Address Information</h2>

                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input placeholder="123 Business St" className="pl-8" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="City" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Map className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="State" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="zipcode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zip Code</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input placeholder="12345" className="pl-8" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-medium">Team Members</h2>
                                    <p className="text-sm text-muted-foreground">Invite up to 5 team members</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="team@example.com"
                                            value={emailInput}
                                            className={cn("pl-8", emailError && "border-red-500")}
                                            onChange={(e) => {
                                                setEmailInput(e.target.value);
                                                setEmailError(null);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    handleInviteEmail();
                                                }
                                            }}
                                        />
                                        {emailError && (
                                            <p className="text-sm text-red-500 mt-1">{emailError}</p>
                                        )}
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={handleInviteEmail}
                                        disabled={invitedEmails.length >= 5}
                                    >
                                        Invite
                                    </Button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {invitedEmails.map((email) => (
                                        <Badge
                                            key={email}
                                            variant="secondary"
                                            className="flex items-center gap-1"
                                        >
                                            {email}
                                            <X
                                                className="h-3 w-3 cursor-pointer"
                                                onClick={() => removeInvitedEmail(email)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Save Company Information
                        </Button>
                    </form>
                </Form>
            </div>
        </div>

    );
}