import React from "react";

const DataManagementSection = ({ stats, ActionCard }) => (
    <div>
        <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 16px 0"
        }}>
            Data Management & Administration
        </h3>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px"
        }}>
            <ActionCard
                title="Villages Management"
                description="Manage village data and administrative boundaries"
                icon="🏘️"
                status={`${stats.villages} villages →`}
            />

            <ActionCard
                title="Surveyor Management"
                description="Manage surveyor assignments and performance"
                icon="👥"
                status={`${stats.activeSurveyors} active surveyors →`}
            />

            <ActionCard
                title="Schemes Administration"
                description="Manage government schemes and eligibility criteria"
                icon="📜"
                status={`${stats.schemes} schemes →`}
            />

            <ActionCard
                title="Data Export & Reports"
                description="Export data and generate comprehensive reports"
                icon="📊"
                status="Generate Reports →"
            />

            <ActionCard
                title="System Configuration"
                description="Configure system settings and administrative parameters"
                icon="⚙️"
                status="Configure System →"
            />

            <ActionCard
                title="Audit Trail"
                description="View system audit logs and user activity"
                icon="📋"
                status="View Audit Logs →"
            />
        </div>
    </div>
);

export default DataManagementSection;
