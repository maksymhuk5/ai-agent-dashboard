"use client"

import React from 'react';
import { Languages } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SUPPORTED_LANGUAGES } from '../providers/translate-provider/i18n';
import { useTranslation } from 'react-i18next';
import { SELECT_LANGUAGE } from '../constants';
import { languageChange } from '../store/actions/language';
import { useDispatch } from 'react-redux';

export default function TranslationToggle() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleLanguageChange = (lang: string) => dispatch(languageChange(lang));
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{t(SELECT_LANGUAGE)}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
                        {t(lang.name)}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
