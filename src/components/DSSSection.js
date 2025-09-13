import React from "react";


const DSSSection = ({ eligibilityCriteria, handleCriteriaChange, priorityLevel, handlePriorityChange }) => (
    <div>
        {/* DSS Header */}
        <div style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#007bff",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        color: "white"
                    }}>
                        🧠
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#333",
                            margin: "0"
                        }}>
                            Decision Support System
                        </h2>
                        <p style={{
                            color: "#666",
                            margin: "0",
                            fontSize: "14px"
                        }}>
                            FRA Scheme Recommendations
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                    <button style={{
                        padding: "8px 16px",
                        backgroundColor: "white",
                        color: "#007bff",
                        border: "1px solid #007bff",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        📊 Export Report
                    </button>
                    <button style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        + Create Implementation Plan
                    </button>
                </div>
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
                29 recommendations across 5 villages • Last updated: 11/9/2025
            </div>
        </div>

        {/* Priority Summary */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
        }}>
            <div style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#dc3545",
                    marginBottom: "8px"
                }}>
                    5
                </div>
                <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px"
                }}>
                    High Priority
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#666"
                }}>
                    Immediate action required
                </div>
            </div>

            <div style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#ffc107",
                    marginBottom: "8px"
                }}>
                    14
                </div>
                <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px"
                }}>
                    Medium Priority
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#666"
                }}>
                    Plan for next quarter
                </div>
            </div>

            <div style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    color: "#28a745",
                    marginBottom: "8px"
                }}>
                    10
                </div>
                <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    marginBottom: "4px"
                }}>
                    Low Priority
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#666"
                }}>
                    Long-term consideration
                </div>
            </div>
        </div>

        {/* Main DSS Interface (left: criteria, right: recommendations) */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "20px"
        }}>
            {/* Left Panel - Criteria & Villages */}
            <div>
                {/* Eligibility Criteria */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "16px",
                    marginBottom: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                        margin: "0 0 12px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                    }}>
                        Eligibility Criteria
                    </h4>
                    {eligibilityCriteria.map((criteria, index) => (
                        <div key={index} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 0",
                            borderBottom: index < 3 ? "1px solid #eee" : "none"
                        }}>
                            <input
                                type="checkbox"
                                checked={criteria.checked}
                                onChange={() => handleCriteriaChange(index)}
                                style={{ margin: "0" }}
                            />
                            <span style={{ fontSize: "16px" }}>{criteria.icon}</span>
                            <span style={{ fontSize: "13px", color: "#333" }}>
                                {criteria.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Villages Selection */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "16px",
                    marginBottom: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                        margin: "0 0 12px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                    }}>
                        Villages (0 Selected)
                    </h4>
                    {[
                        { name: "Bhamragad", claims: 1 },
                        { name: "Etapalli", claims: 1 },
                        { name: "Bijapur", claims: 1 },
                        { name: "Kanker", claims: 1 },
                        { name: "Mandla", claims: 1 }
                    ].map((village, index) => (
                        <div key={index} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 0",
                            borderBottom: index < 4 ? "1px solid #eee" : "none"
                        }}>
                            <input
                                type="checkbox"
                                style={{ margin: "0" }}
                            />
                            <span style={{ fontSize: "13px", color: "#333", flex: 1 }}>
                                {village.name} ({village.claims} claims)
                            </span>
                        </div>
                    ))}
                </div>

                {/* Priority Levels */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "16px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <h4 style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#333",
                        margin: "0 0 12px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px"
                    }}>
                        Priority Levels
                    </h4>
                    {[
                        { label: "High", color: "#dc3545" },
                        { label: "Medium", color: "#ffc107" },
                        { label: "Low", color: "#28a745" }
                    ].map((priority, index) => (
                        <div key={index} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "8px 0",
                            borderBottom: index < 2 ? "1px solid #eee" : "none"
                        }}>
                            <input
                                type="radio"
                                name="priority"
                                checked={priorityLevel === priority.label}
                                onChange={() => handlePriorityChange(priority.label)}
                                style={{ margin: "0" }}
                            />
                            <div style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: priority.color
                            }} />
                            <span style={{ fontSize: "13px", color: "#333" }}>
                                {priority.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right Panel - Scheme Recommendations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* PM-KISAN Scheme */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#333",
                                margin: "0"
                            }}>
                                PM-KISAN
                            </h3>
                            <span style={{
                                padding: "4px 8px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                HIGH
                            </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            }}>
                                MATCH SCORE
                            </div>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "700",
                                color: "#28a745"
                            }}>
                                92%
                            </div>
                        </div>
                    </div>
                    <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "8px"
                    }}>
                        Pradhan Mantri Kisan Samman Nidhi
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "16px"
                    }}>
                        <span style={{ fontSize: "16px" }}>📍</span>
                        <span style={{ fontSize: "14px", color: "#666" }}>Bhamragad</span>
                    </div>
                    <p style={{
                        fontSize: "14px",
                        color: "#333",
                        lineHeight: "1.5",
                        marginBottom: "16px"
                    }}>
                        Excellent match (92%) - FRA patta holders with agricultural land identified. Direct benefit transfer recommended.
                    </p>
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        color: "#666",
                        fontStyle: "italic",
                        marginBottom: "20px"
                    }}>
                        Direct income support of ₹6,000 per year to FRA beneficiaries with agricultural land. Automatic enrollment based on land records.
                    </div>
                    {/* Supporting Evidence */}
                    <div style={{ marginBottom: "16px" }}>
                        <h4 style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            margin: "0 0 12px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            📊 Supporting Evidence
                        </h4>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "12px",
                            marginBottom: "16px"
                        }}>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    FRA Beneficiaries
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    127
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    min: 50
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Agricultural Land
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    342 ha
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    min: 100 ha
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Poverty Index
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    68.0%
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    min: 40.0%
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "8px"
                        }}>
                            <div style={{
                                backgroundColor: "#d4edda",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                127 HOUSEHOLDS
                            </div>
                            <div style={{
                                backgroundColor: "#cce7ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                ₹7.62L BUDGET
                            </div>
                            <div style={{
                                backgroundColor: "#fff3cd",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                Annual DURATION
                            </div>
                            <div style={{
                                backgroundColor: "#e2e3ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                Ready STATUS
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            + ADD TO PLAN
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            • Details
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            📄 Export
                        </button>
                    </div>
                </div>

                {/* Jal Jeevan Mission */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#333",
                                margin: "0"
                            }}>
                                Jal Jeevan Mission
                            </h3>
                            <span style={{
                                padding: "4px 8px",
                                backgroundColor: "#dc3545",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                HIGH
                            </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            }}>
                                MATCH SCORE
                            </div>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "700",
                                color: "#28a745"
                            }}>
                                88%
                            </div>
                        </div>
                    </div>
                    <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "8px"
                    }}>
                        Pradhan Mantri Jal Jeevan Mission
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "16px"
                    }}>
                        <span style={{ fontSize: "16px" }}>📍</span>
                        <span style={{ fontSize: "14px", color: "#666" }}>Etapalli</span>
                    </div>
                    <p style={{
                        fontSize: "14px",
                        color: "#333",
                        lineHeight: "1.5",
                        marginBottom: "16px"
                    }}>
                        High match (88%) - Critical water scarcity identified. Priority for piped water supply infrastructure.
                    </p>
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        color: "#666",
                        fontStyle: "italic",
                        marginBottom: "20px"
                    }}>
                        Providing functional household tap connections to every rural household. Includes water quality testing and source sustainability.
                    </div>
                    {/* Supporting Evidence */}
                    <div style={{ marginBottom: "16px" }}>
                        <h4 style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            margin: "0 0 12px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            📊 Supporting Evidence
                        </h4>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "12px",
                            marginBottom: "16px"
                        }}>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Water Coverage
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    23%
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    max: 50%
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Groundwater Level
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    0.28
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    max: 0.6
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Population
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    1,247
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    min: 500
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "8px"
                        }}>
                            <div style={{
                                backgroundColor: "#d4edda",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                250 HOUSEHOLDS
                            </div>
                            <div style={{
                                backgroundColor: "#cce7ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                ₹12.5L BUDGET
                            </div>
                            <div style={{
                                backgroundColor: "#fff3cd",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                2 Years DURATION
                            </div>
                            <div style={{
                                backgroundColor: "#e2e3ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                Planning STATUS
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            + ADD TO PLAN
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            • Details
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            📄 Export
                        </button>
                    </div>
                </div>

                {/* MGNREGA Scheme */}
                <div style={{
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <h3 style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#333",
                                margin: "0"
                            }}>
                                MGNREGA
                            </h3>
                            <span style={{
                                padding: "4px 8px",
                                backgroundColor: "#ffc107",
                                color: "white",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                MEDIUM
                            </span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            }}>
                                MATCH SCORE
                            </div>
                            <div style={{
                                fontSize: "32px",
                                fontWeight: "700",
                                color: "#28a745"
                            }}>
                                75%
                            </div>
                        </div>
                    </div>
                    <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "8px"
                    }}>
                        Mahatma Gandhi National Rural Employment Guarantee Act
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "16px"
                    }}>
                        <span style={{ fontSize: "16px" }}>📍</span>
                        <span style={{ fontSize: "14px", color: "#666" }}>Bijapur</span>
                    </div>
                    <p style={{
                        fontSize: "14px",
                        color: "#333",
                        lineHeight: "1.5",
                        marginBottom: "16px"
                    }}>
                        Good match (75%) - Rural employment opportunities for FRA beneficiaries. Forest conservation work alignment.
                    </p>
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "4px",
                        fontSize: "13px",
                        color: "#666",
                        fontStyle: "italic",
                        marginBottom: "20px"
                    }}>
                        Guaranteed 100 days of wage employment for rural households. Focus on forest conservation and water harvesting projects.
                    </div>
                    {/* Supporting Evidence */}
                    <div style={{ marginBottom: "16px" }}>
                        <h4 style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            margin: "0 0 12px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            📊 Supporting Evidence
                        </h4>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "12px",
                            marginBottom: "16px"
                        }}>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Employment Rate
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    45%
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    target: 60%
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Forest Area
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    180 ha
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    conservation scope
                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f8f9fa",
                                padding: "12px",
                                borderRadius: "4px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "4px",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                }}>
                                    Households
                                </div>
                                <div style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#333"
                                }}>
                                    95
                                </div>
                                <div style={{
                                    fontSize: "11px",
                                    color: "#666"
                                }}>
                                    eligible families
                                </div>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "8px"
                        }}>
                            <div style={{
                                backgroundColor: "#d4edda",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                95 HOUSEHOLDS
                            </div>
                            <div style={{
                                backgroundColor: "#cce7ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                ₹9.5L BUDGET
                            </div>
                            <div style={{
                                backgroundColor: "#fff3cd",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                Ongoing DURATION
                            </div>
                            <div style={{
                                backgroundColor: "#e2e3ff",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontSize: "12px",
                                fontWeight: "600"
                            }}>
                                Active STATUS
                            </div>
                        </div>
                    </div>
                    {/* Action Buttons */}
                    <div style={{
                        display: "flex",
                        gap: "8px"
                    }}>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            + ADD TO PLAN
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            • Details
                        </button>
                        <button style={{
                            padding: "8px 16px",
                            backgroundColor: "white",
                            color: "#666",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer"
                        }}>
                            📄 Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DSSSection;
