import React from "react";
import dynamic from "next/dynamic";
import { MdLocationOn, MdSatellite, MdMap, MdStraighten, MdBarChart } from "react-icons/md";

const SatelliteResourceMap = dynamic(() => import("@/components/SatelliteResourceMapNew"), {
    ssr: false,
    loading: () => (
        <div style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: "14px"
        }}>
            <MdSatellite style={{ fontSize: "48px", marginBottom: "12px", color: "#9ca3af" }} />
            Loading satellite imagery and resource polygons...
        </div>
    )
});

const MappingSection = ({ stats, ActionCard }) => (
    <div>
        <h3 style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 16px 0"
        }}>
            Natural Resources Mapping & Satellite Analysis
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
                margin: "0 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
            }}>
                <MdSatellite style={{ color: "#3b82f6" }} />
                Satellite-Based Resource Mapping
            </h4>
            <p style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 16px 0"
            }}>
                View forest cover, water bodies, and natural resources with real-time satellite imagery. Click on polygons to view resource details.
            </p>
            <div style={{
                width: "100%",
                height: "400px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                position: "relative"
            }}>
                <SatelliteResourceMap />

                {/* Resource Legend */}
                <div style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    fontSize: "12px",
                    minWidth: "140px"
                }}>
                    <div style={{ fontWeight: "600", marginBottom: "8px", color: "#333" }}>
                        Resource Legend
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "2px" }}></div>
                        <span style={{ color: "#374151" }}>Forest Cover</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#3b82f6", borderRadius: "2px" }}></div>
                        <span style={{ color: "#374151" }}>Water Bodies</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "2px" }}></div>
                        <span style={{ color: "#374151" }}>Agricultural Land</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#8b5cf6", borderRadius: "2px" }}></div>
                        <span style={{ color: "#374151" }}>Mineral Resources</span>
                    </div>
                </div>
            </div>
        </div>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px"
        }}>
            <ActionCard
                title="Satellite Imagery Viewer"
                description="View latest satellite imagery for land verification"
                icon={<MdSatellite style={{ color: "#8b5cf6" }} />}
                status={`${stats.satelliteUpdates} recent updates →`}
            />

            <ActionCard
                title="Assets Mapping System"
                description="Map and track forest assets and boundaries"
                icon={<MdMap style={{ color: "#10b981" }} />}
                status="Open Mapping Tool →"
            />

            <ActionCard
                title="Land Boundary Analysis"
                description="Analyze land boundaries using GPS and satellite data"
                icon={<MdStraighten style={{ color: "#f59e0b" }} />}
                status="Analyze Boundaries →"
            />

            <ActionCard
                title="Change Detection"
                description="Detect land use changes over time using imagery"
                icon={<MdBarChart style={{ color: "#ef4444" }} />}
                status="Run Detection →"
            />
        </div>
    </div>
);

export default MappingSection;
