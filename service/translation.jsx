'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from './en'
import { ar } from './ar'

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    useEffect(() => {
        localStorage.setItem('lang', lang);
    }, [lang]);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang') || 'en';
            setLang(storedLang);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const getTranslation = (key) => {
        if (lang === 'en') return en[key] || key;
        if (lang === 'ar') return ar[key] || key;
        return key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, getTranslation }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
