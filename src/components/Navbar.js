"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/translations/TranslationContext";

export default function Navbar() {
    const { t, currentLanguage, changeLanguage, getLanguageName } = useTranslation();
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const languages = [
        { code: 'en', name: t('navbar.languages.english'), native: 'English' },
        { code: 'hi', name: t('navbar.languages.hindi'), native: 'हिंदी' }
    ];

    const handleLanguageChange = (language) => {
        changeLanguage(language.code);
        setShowLanguageDropdown(false);
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-black/0 bg-yellow-900 backdrop-blur supports-[backdrop-filter]:bg-green-900/90" style={{ overflow: 'visible' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0" style={{ overflow: 'visible' }}>
                <div className="flex items-center justify-between h-[3.2rem]">
                    {/* Logo and Brand */}
                    <Link href="/" className="flex items-center group">
                        <span className="ml-3 text-xl font-bold tracking-tight text-white">{t('mainPage.title')}</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {/* Language Selection Dropdown */}
                        <div className="relative" style={{ overflow: 'visible' }}>
                            <button
                                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1.5 font-medium text-white ring-1 ring-inset ring-white/20 transition-all hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                            >
                                <span className="text-sm">{getLanguageName(currentLanguage)}</span>
                                <svg className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showLanguageDropdown && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '3.2rem',
                                        right: '32px',
                                        width: '160px',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                                        border: '1px solid #e5e7eb',
                                        zIndex: 9999,
                                        overflow: 'hidden'
                                    }}
                                >
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => handleLanguageChange(language)}
                                            className={`w-full px-4 py-3 text-left text-sm transition-colors border-b border-gray-100 last:border-b-0 ${currentLanguage === language.code
                                                ? 'bg-green-50 text-green-700 font-medium'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            style={{ display: 'block', width: '100%' }}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium">{language.name}</span>
                                                <span className="text-xs text-gray-500 mt-1">{language.native}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Invisible overlay to close dropdown */}
                            {showLanguageDropdown && (
                                <div
                                    onClick={() => setShowLanguageDropdown(false)}
                                    className="fixed inset-0 z-[9998]"
                                />
                            )}
                        </div>

                        {/* Login Button */}
                        <Link
                            href="/auth"
                            className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 font-medium text-black ring-1 ring-inset ring-white/40 transition-all hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                        >
                            <span>{t('navbar.login')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}