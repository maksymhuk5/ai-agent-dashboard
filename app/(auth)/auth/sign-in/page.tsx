"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean().default(false),
})

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="w-full max-w-md relative z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-8 rounded-lg shadow-lg border">
            <div className="space-y-1 mb-6">
                <h1 className="text-2xl font-semibold text-center">Sign in</h1>
                <p className="text-center text-muted-foreground">
                    Enter your email and password to sign in
                </p>
            </div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                placeholder="Enter your email"
                                                className="pl-10"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                className="pl-10 pr-10"
                                                placeholder="Enter your password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-2.5"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-muted-foreground" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end">
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm text-purple-600 hover:text-purple-700 hover:underline my-auto"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/user-info" className="text-purple-600 hover:text-purple-700 hover:underline">
                        Sign up now
                    </Link>
                </div>
            </div>
        </div>
    )
}
