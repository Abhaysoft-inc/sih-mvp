import React from "react";

const TehsilNavbar = ({ currentTime }) => (
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
                WebGIS FRA Portal
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

export default TehsilNavbar;
