import Image from "next/image"
import { type ReactNode } from "react"

export default function SignUpLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div className="min-h-screen w-full relative flex items-center justify-center py-12 px-2">
            <div className="absolute inset-0">
                <Image
                    src="/images/auth-background-large-dark.svg"
                    alt="Background"
                    fill
                    className="object-cover hidden dark:block"
                    priority
                />
                <Image
                    src="/images/auth-background-large.svg"
                    alt="Background"
                    fill
                    className="object-cover dark:hidden"
                    priority
                />
                <div className="absolute inset-0" />
            </div>
            {children}
        </div>
    )
}
