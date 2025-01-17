'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';

export default function TranslateProvider({ children }: { children: React.ReactNode }) {

    const { language } = useSelector((state: RootState) => state.language);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
