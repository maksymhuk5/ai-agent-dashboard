import Image from "next/image";
import { useState, useEffect } from 'react';

export default function AboutLanguages() {
    const [languageCount, setLanguageCount] = useState(0);
    const targetCount = 27;

    useEffect(() => {
        const interval = setInterval(() => {
            setLanguageCount(prevCount => {
                if (prevCount < targetCount) {
                    return prevCount + 1;
                }
                clearInterval(interval);
                return prevCount;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const languages = [
        { code: "us", name: "English (US)", flagCode: "us" },
        { code: "gb", name: "English (UK)", flagCode: "gb" },
        { code: "es", name: "Spanish", flagCode: "es" },
        { code: "fr", name: "French", flagCode: "fr" },
        { code: "de", name: "German", flagCode: "de" },
        { code: "it", name: "Italian", flagCode: "it" },
        { code: "pt", name: "Portuguese", flagCode: "pt" },
        { code: "nl", name: "Dutch", flagCode: "nl" },
        { code: "pl", name: "Polish", flagCode: "pl" },
        { code: "ru", name: "Russian", flagCode: "ru" },
        { code: "tr", name: "Turkish", flagCode: "tr" },
        { code: "ar", name: "Arabic", flagCode: "sa" },
        { code: "hi", name: "Hindi", flagCode: "in" },
        { code: "bn", name: "Bengali", flagCode: "bd" },
        { code: "id", name: "Indonesian", flagCode: "id" },
        { code: "ms", name: "Malay", flagCode: "my" },
        { code: "th", name: "Thai", flagCode: "th" },
        { code: "vi", name: "Vietnamese", flagCode: "vn" },
        { code: "zh", name: "Chinese", flagCode: "cn" },
        { code: "ja", name: "Japanese", flagCode: "jp" },
        { code: "ko", name: "Korean", flagCode: "kr" },
        { code: "sv", name: "Swedish", flagCode: "se" },
        { code: "da", name: "Danish", flagCode: "dk" },
        { code: "fi", name: "Finnish", flagCode: "fi" },
        { code: "no", name: "Norwegian", flagCode: "no" },
        { code: "el", name: "Greek", flagCode: "gr" },
        { code: "he", name: "Hebrew", flagCode: "il" }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute right-0 top-0 h-full w-full sm:w-2/3 md:w-1/2">
                <Image
                    src="/images/map.png"
                    alt="World map"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 66vw, 50vw"
                    style={{ objectFit: 'contain' }}
                    className="dark:opacity-20"
                    priority
                />
            </div>
            <div className="container relative z-10">
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center mb-4">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            Global Language Support
                        </h2>
                        <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent ml-4">
                            {languageCount}+
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Break down language barriers with our AI voices available in 27+ languages and regional accents.
                        Communicate naturally with customers worldwide using culturally-aware, native-sounding speech.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {languages.map((lang) => (
                        <div key={lang.code} className="flex items-center p-3 bg-background/50 rounded-lg backdrop-blur-sm bg-opacity-80 shadow-sm">
                            <Image
                                src={`https://flagcdn.com/w40/${lang.flagCode}.png`}
                                alt={`${lang.name} flag`}
                                width={20}
                                height={15}
                                className="mr-3"
                                style={{ width: 'auto', height: 'auto' }}
                            />
                            <span className="text-sm">{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}