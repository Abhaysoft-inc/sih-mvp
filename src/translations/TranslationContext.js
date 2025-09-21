"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations.json';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    // Load saved language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && ['en', 'hi', 'od', 'te'].includes(savedLanguage)) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    // Save language to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('selectedLanguage', currentLanguage);
    }, [currentLanguage]);

    const changeLanguage = (languageCode) => {
        setCurrentLanguage(languageCode);
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                // Fallback to English if key not found
                value = translations.en;
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object') {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key itself if not found
                    }
                }
                break;
            }
        }

        return value || key;
    };

    const getCurrentLanguage = () => currentLanguage;

    const getLanguageName = (code) => {
        switch(code) {
            case 'hi': return 'हिंदी';
            case 'od': return 'ଓଡ଼ିଆ';
            case 'te': return 'తెలుగు';
            default: return 'English';
        }
    };

    return (
        <TranslationContext.Provider value={{
            t,
            currentLanguage,
            changeLanguage,
            getCurrentLanguage,
            getLanguageName
        }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};