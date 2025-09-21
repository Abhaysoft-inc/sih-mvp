import React, { useState } from "react";
import { MdLanguage, MdExpandMore } from "react-icons/md";
import { useTranslation } from "../translations/TranslationContext";

const TehsilNavbar = ({ currentTime }) => {
    const { t, currentLanguage, changeLanguage, getLanguageName } = useTranslation();
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [hoveredLanguage, setHoveredLanguage] = useState(null);

    const languages = [
        { code: 'en', name: t('navbar.languages.english'), native: 'English' },
        { code: 'hi', name: t('navbar.languages.hindi'), native: 'हिंदी' }
    ];

    const handleLanguageChange = (language) => {
        changeLanguage(language.code);
        setShowLanguageDropdown(false);
    };

    return (
        <nav
            style={{
                background: "#fff",
                borderBottom: "1px solid #e5e7eb",
                padding: "16px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "sticky",
                top: 0,
                zIndex: 10
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {/*      */}
                <span style={{ fontWeight: 700, fontSize: 20, color: "#007bff", letterSpacing: 1 }}>
                    {t('navbar.portalName')}
                </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                {/* Date/Time */}
                <div style={{ color: "#666", fontSize: 14, fontWeight: 500 }}>
                    {currentTime.toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })}
                </div>

                {/* Language Selection Dropdown */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            backgroundColor: isButtonHovered ? "#e2e6ea" : "#f8f9fa",
                            border: "1px solid #dee2e6",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#495057",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            outline: "none"
                        }}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                    >
                        <MdLanguage style={{ fontSize: "16px" }} />
                        <span>{getLanguageName(currentLanguage)}</span>
                        <MdExpandMore
                            style={{
                                fontSize: "16px",
                                transform: showLanguageDropdown ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.2s ease"
                            }}
                        />
                    </button>

                    {showLanguageDropdown && (
                        <div style={{
                            position: "absolute",
                            top: "100%",
                            right: "0",
                            marginTop: "4px",
                            backgroundColor: "white",
                            border: "1px solid #dee2e6",
                            borderRadius: "6px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            zIndex: 1000,
                            minWidth: "140px"
                        }}>
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 16px",
                                        border: "none",
                                        backgroundColor: currentLanguage === language.code ? "#e3f2fd" :
                                            (hoveredLanguage === language.code ? "#f8f9fa" : "transparent"),
                                        color: currentLanguage === language.code ? "#1976d2" : "#495057",
                                        fontSize: "14px",
                                        fontWeight: currentLanguage === language.code ? "600" : "400",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        borderRadius: language === languages[0] ? "6px 6px 0 0" :
                                            language === languages[languages.length - 1] ? "0 0 6px 6px" : "0",
                                        transition: "all 0.2s ease"
                                    }}
                                    onMouseEnter={() => setHoveredLanguage(language.code)}
                                    onMouseLeave={() => setHoveredLanguage(null)}
                                >
                                    <span style={{ fontSize: "14px", fontWeight: "500" }}>{language.name}</span>
                                    <span style={{ fontSize: "12px", color: "#6c757d", marginTop: "2px" }}>{language.native}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Invisible overlay to close dropdown when clicking outside */}
                    {showLanguageDropdown && (
                        <div
                            onClick={() => setShowLanguageDropdown(false)}
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 999
                            }}
                        />
                    )}
                </div>

                {/* Active Badge */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 500,
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    border: "1px solid #c3e6cb"
                }}>
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: "#28a745",
                        marginRight: 6
                    }} />
                    <span>Active</span>
                </div>
                {/* Logout Button */}
                <button
                    style={{
                        marginLeft: 10,
                        padding: "6px 16px",
                        background: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: 600,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "background 0.2s"
                    }}
                    onClick={() => {
                        // Placeholder: Add logout logic here
                        if (typeof window !== 'undefined') {
                            window.location.href = "/";
                        }
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default TehsilNavbar;
