import ThemeToggle from "@/app/this/components/theme-toggle";
import TranslationToggle from "@/app/this/components/translation-toggle";

export default function Header() {
    return (
        <header className="fixed w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
            <div className="flex h-14 items-center justify-between container">
                <h1 className="font-bold">Nexvoz Logo</h1>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <TranslationToggle />
                </div>
            </div>
        </header>
    );
}