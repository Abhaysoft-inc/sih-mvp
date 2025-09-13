import React from "react";

const VerificationSection = ({ stats, ActionCard }) => (
    <div>
        <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 16px 0"
        }}>
            Verification Center
        </h3>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
        }}>
            <ActionCard
                title="Pending Claims Review"
                description="Review and verify pending FRA claims with documentation"
                icon="📋"
                status={`${stats.pendingVerification} pending review →`}
            />

            <ActionCard
                title="Document Verification"
                description="Verify submitted documents and certificates"
                icon="📑"
                status="Verify Documents →"
            />

            <ActionCard
                title="Field Verification"
                description="Coordinate field verification with surveyors"
                icon="🔍"
                status="Schedule Verification →"
            />

            <ActionCard
                title="Updation Requests"
                description="Process requests for claim updates and modifications"
                icon="✏️"
                status="Process Updates →"
            />
        </div>

        {/* Verification Queue */}
        <div style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "20px"
        }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
                <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0"
                }}>
                    Verification Queue
                </h4>
            </div>

            {[
                { id: "FRA-2024-048", applicant: "Rajesh Kumar", village: "Banswara", priority: "High", days: 2 },
                { id: "FRA-2024-049", applicant: "Sita Devi", village: "Kumbhalgarh", priority: "Medium", days: 5 },
                { id: "FRA-2024-050", applicant: "Mohan Singh", village: "Pratapgarh", priority: "Low", days: 8 }
            ].map((claim, index) => (
                <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    borderBottom: index < 2 ? "1px solid #eee" : "none"
                }}>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "4px"
                        }}>
                            {claim.id} - {claim.applicant}
                        </div>
                        <div style={{
                            fontSize: "12px",
                            color: "#666"
                        }}>
                            Village: {claim.village} • {claim.days} days pending
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                    }}>
                        <span style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "500",
                            backgroundColor: claim.priority === 'High' ? '#fef2f2' : claim.priority === 'Medium' ? '#fefce8' : '#f0fdf4',
                            color: claim.priority === 'High' ? '#dc2626' : claim.priority === 'Medium' ? '#ca8a04' : '#16a34a'
                        }}>
                            {claim.priority}
                        </span>
                        <button style={{
                            padding: "6px 12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "12px",
                            cursor: "pointer"
                        }}>
                            Review
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default VerificationSection;
