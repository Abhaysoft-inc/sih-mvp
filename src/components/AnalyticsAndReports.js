import React from "react";

const AnalyticsAndReports = ({ stats, ActionCard }) => (
    <div>
        <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 16px 0"
        }}>
            Analytics & Performance Reports
        </h3>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
        }}>
            <ActionCard
                title="Village Analytics"
                description="Comprehensive village-wise claim analytics and reports"
                icon="📊"
                status={`${stats.villages} villages →`}
            />

            <ActionCard
                title="Performance Reports"
                description="Generate detailed performance and compliance reports"
                icon="📈"
                status="Generate Reports →"
            />

            <ActionCard
                title="Trend Analysis"
                description="Analyze trends in claim submissions and approvals"
                icon="📉"
                status="View Trends →"
            />

            <ActionCard
                title="Compliance Dashboard"
                description="Monitor compliance with FRA guidelines and timelines"
                icon="✅"
                status="Check Compliance →"
            />
        </div>

        {/* Analytics Dashboard */}
        <div style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
            <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#333",
                margin: "0 0 16px 0"
            }}>
                Real-time Analytics Overview
            </h4>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px"
            }}>
                <div style={{ textAlign: "center", padding: "16px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#007bff" }}>
                        {Math.round((stats.verified / stats.totalClaims) * 100)}%
                    </div>
                    <div style={{ fontSize: "14px", color: "#666" }}>Verification Rate</div>
                </div>

                <div style={{ textAlign: "center", padding: "16px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#28a745" }}>
                        {stats.activeSurveyors}
                    </div>
                    <div style={{ fontSize: "14px", color: "#666" }}>Active Surveyors</div>
                </div>

                <div style={{ textAlign: "center", padding: "16px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#17a2b8" }}>
                        {stats.satelliteUpdates}
                    </div>
                    <div style={{ fontSize: "14px", color: "#666" }}>Daily Satellite Updates</div>
                </div>

                <div style={{ textAlign: "center", padding: "16px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "700", color: "#ffc107" }}>
                        2.3 days
                    </div>
                    <div style={{ fontSize: "14px", color: "#666" }}>Avg. Processing Time</div>
                </div>
            </div>
        </div>
    </div>
);

export default AnalyticsAndReports;
