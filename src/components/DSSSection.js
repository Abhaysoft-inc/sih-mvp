import React from "react";
import RecommendedScheme from "./RecommendedScheme";
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
                <RecommendedScheme
                    schemeName="PM-KISAN"
                    priority="High"
                    priorityColor="#dc3545"
                    matchScore={92}
                    fullName="Pradhan Mantri Kisan Samman Nidhi"
                    location="Bhamragad"
                    description="Excellent match (92%) - FRA patta holders with agricultural land identified. Direct benefit transfer recommended."
                    details="Direct income support of ₹6,000 per year to FRA beneficiaries with agricultural land. Automatic enrollment based on land records."
                    evidence={[
                        { label: "FRA Beneficiaries", value: "127", subtext: "min: 50" },
                        { label: "Agricultural Land", value: "342 ha", subtext: "min: 100 ha" },
                        { label: "Poverty Index", value: "68.0%", subtext: "min: 40.0%" },
                    ]}
                    summary={[
                        { text: "127 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹7.62L BUDGET", color: "#cce7ff" },
                        { text: "Annual DURATION", color: "#fff3cd" },
                        { text: "Ready STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />

                <RecommendedScheme
                    schemeName="Jal Jeevan Mission"
                    priority="High"
                    priorityColor="#dc3545"
                    matchScore={88}
                    fullName="Pradhan Mantri Jal Jeevan Mission"
                    location="Etapalli"
                    description="High match (88%) - Critical water scarcity identified. Priority for piped water supply infrastructure."
                    details="Providing functional household tap connections to every rural household. Includes water quality testing and source sustainability."
                    evidence={[
                        { label: "Water Coverage", value: "23%", subtext: "max: 50%" },
                        { label: "Groundwater Level", value: "0.28", subtext: "max: 0.6" },
                        { label: "Population", value: "1,247", subtext: "min: 500" },
                    ]}
                    summary={[
                        { text: "250 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹12.5L BUDGET", color: "#cce7ff" },
                        { text: "2 Years DURATION", color: "#fff3cd" },
                        { text: "Planning STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />

                <RecommendedScheme
                    schemeName="MGNREGA"
                    priority="Medium"
                    priorityColor="#ffc107"
                    matchScore={75}
                    fullName="Mahatma Gandhi National Rural Employment Guarantee Act"
                    location="Bijapur"
                    description="Good match (75%) - Rural employment opportunities for FRA beneficiaries. Forest conservation work alignment."
                    details="Guaranteed 100 days of wage employment for rural households. Focus on forest conservation and water harvesting projects."
                    evidence={[
                        { label: "Employment Rate", value: "45%", subtext: "target: 60%" },
                        { label: "Forest Area", value: "180 ha", subtext: "conservation scope" },
                        { label: "Households", value: "95", subtext: "eligible families" },
                    ]}
                    summary={[
                        { text: "95 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹9.5L BUDGET", color: "#cce7ff" },
                        { text: "Ongoing DURATION", color: "#fff3cd" },
                        { text: "Active STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />
            </div>



        </div>
    </div>
);

export default DSSSection;
