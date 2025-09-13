import React from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const MappingSection = ({ stats, ActionCard }) => (
    <div>
        <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 16px 0"
        }}>
            Assets Mapping & Satellite Imagery
        </h3>

        {/* Interactive Map Section */}
        <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "20px",
            marginBottom: "24px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
        }}>
            <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#333",
                margin: "0 0 16px 0"
            }}>
                📍 Odisha Villages Interactive Map
            </h4>
            <p style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 16px 0"
            }}>
                Click on any village polygon to view details. Use mouse wheel to zoom and drag to pan.
            </p>
            <Map />
        </div>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px"
        }}>
            <ActionCard
                title="Satellite Imagery Viewer"
                description="View latest satellite imagery for land verification"
                icon="🛰️"
                status={`${stats.satelliteUpdates} recent updates →`}
            />

            <ActionCard
                title="Assets Mapping System"
                description="Map and track forest assets and boundaries"
                icon="🗺️"
                status="Open Mapping Tool →"
            />

            <ActionCard
                title="Land Boundary Analysis"
                description="Analyze land boundaries using GPS and satellite data"
                icon="📐"
                status="Analyze Boundaries →"
            />

            <ActionCard
                title="Change Detection"
                description="Detect land use changes over time using imagery"
                icon="📊"
                status="Run Detection →"
            />
        </div>
    </div>
);

export default MappingSection;
