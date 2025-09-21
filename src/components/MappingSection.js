import React from "react";
import dynamic from "next/dynamic";
import { MdLocationOn, MdSatellite, MdMap, MdStraighten, MdBarChart, MdForest, MdWaterDrop, MdAgriculture, MdDiamond, MdAssessment } from "react-icons/md";

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

        {/* Resource Mapping Statistics */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "24px"
        }}>
            {/* Total Mapped Area */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "4px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Total Mapped Area
                        </div>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#333",
                            lineHeight: "1"
                        }}>
                            12,847 ha
                        </div>
                    </div>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#10b98120",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                    }}>
                        <MdMap style={{ color: "#10b981" }} />
                    </div>
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#10b981",
                    fontWeight: "500"
                }}>
                    ● +234 ha mapped this month
                </div>
            </div>

            {/* Forest Resources */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "4px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Forest Resources
                        </div>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#333",
                            lineHeight: "1"
                        }}>
                            8,234 ha
                        </div>
                    </div>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#22c55e20",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                    }}>
                        <MdForest style={{ color: "#22c55e" }} />
                    </div>
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#22c55e",
                    fontWeight: "500"
                }}>
                    ● 64% of total mapped area
                </div>
            </div>

            {/* Water Bodies */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "4px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Water Bodies
                        </div>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#333",
                            lineHeight: "1"
                        }}>
                            1,456 ha
                        </div>
                    </div>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#3b82f620",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                    }}>
                        <MdWaterDrop style={{ color: "#3b82f6" }} />
                    </div>
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#3b82f6",
                    fontWeight: "500"
                }}>
                    ● 11% of total mapped area
                </div>
            </div>

            {/* Agricultural Land */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "4px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Agricultural Land
                        </div>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#333",
                            lineHeight: "1"
                        }}>
                            2,789 ha
                        </div>
                    </div>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#f59e0b20",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                    }}>
                        <MdAgriculture style={{ color: "#f59e0b" }} />
                    </div>
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#f59e0b",
                    fontWeight: "500"
                }}>
                    ● 22% of total mapped area
                </div>
            </div>

            {/* Mineral Resources */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px"
                }}>
                    <div>
                        <div style={{
                            fontSize: "13px",
                            color: "#666",
                            marginBottom: "4px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Mineral Resources
                        </div>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#333",
                            lineHeight: "1"
                        }}>
                            368 ha
                        </div>
                    </div>
                    <div style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: "#8b5cf620",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                    }}>
                        <MdDiamond style={{ color: "#8b5cf6" }} />
                    </div>
                </div>
                <div style={{
                    fontSize: "12px",
                    color: "#8b5cf6",
                    fontWeight: "500"
                }}>
                    ● 3% of total mapped area
                </div>
            </div>
        </div>

        {/* Resource Quality & Coverage Metrics */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "24px"
        }}>
            {/* Mapping Quality Metrics */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 16px 0"
                }}>
                    Mapping Quality Metrics
                </h4>

                <div style={{ marginBottom: "16px" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                    }}>
                        <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                            Satellite Resolution
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#059669" }}>
                            10m/pixel
                        </span>
                    </div>
                    <div style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "4px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: "92%",
                            height: "100%",
                            backgroundColor: "#059669",
                            borderRadius: "4px"
                        }}></div>
                    </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                    }}>
                        <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                            Mapping Accuracy
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#059669" }}>
                            94.7%
                        </span>
                    </div>
                    <div style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "4px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: "95%",
                            height: "100%",
                            backgroundColor: "#059669",
                            borderRadius: "4px"
                        }}></div>
                    </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px"
                    }}>
                        <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                            Coverage Completeness
                        </span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#f59e0b" }}>
                            87.3%
                        </span>
                    </div>
                    <div style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "4px",
                        overflow: "hidden"
                    }}>
                        <div style={{
                            width: "87%",
                            height: "100%",
                            backgroundColor: "#f59e0b",
                            borderRadius: "4px"
                        }}></div>
                    </div>
                </div>

                <div style={{
                    padding: "12px",
                    backgroundColor: "#f0fdf4",
                    borderRadius: "6px",
                    border: "1px solid #bbf7d0"
                }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#15803d" }}>
                        Quality Status: Excellent
                    </div>
                    <div style={{ fontSize: "11px", color: "#166534", marginTop: "2px" }}>
                        Last updated: 2 days ago | Next update: 5 days
                    </div>
                </div>
            </div>

            {/* Resource Distribution Chart */}
            <div style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 16px 0"
                }}>
                    Resource Distribution
                </h4>

                {/* Pie Chart Simulation */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    marginBottom: "20px"
                }}>
                    <div style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        background: "conic-gradient(#22c55e 0deg 230deg, #f59e0b 230deg 310deg, #3b82f6 310deg 350deg, #8b5cf6 350deg 360deg)",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#333"
                        }}>
                            12,847 ha
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#22c55e", borderRadius: "50%" }}></div>
                            <span style={{ fontSize: "12px", color: "#333" }}>Forest (64%)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                            <span style={{ fontSize: "12px", color: "#333" }}>Agricultural (22%)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#3b82f6", borderRadius: "50%" }}></div>
                            <span style={{ fontSize: "12px", color: "#333" }}>Water (11%)</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "12px", height: "12px", backgroundColor: "#8b5cf6", borderRadius: "50%" }}></div>
                            <span style={{ fontSize: "12px", color: "#333" }}>Mineral (3%)</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    padding: "12px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0"
                }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#334155", marginBottom: "4px" }}>
                        Resource Insights
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                        • Forest cover increased by 2.3% this year<br />
                        • 15 new water bodies identified<br />
                        • Mineral deposits verified in 3 locations
                    </div>
                </div>
            </div>
        </div>

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
                description="View latest satellite imagery for land verification and resource identification"
                icon={<MdSatellite style={{ color: "#8b5cf6" }} />}
                status={`${stats.satelliteUpdates} recent updates →`}
            />

            <ActionCard
                title="Forest Resources Mapper"
                description="Map and monitor forest cover, tree density, and biodiversity zones"
                icon={<MdForest style={{ color: "#22c55e" }} />}
                status="8,234 ha mapped →"
            />

            <ActionCard
                title="Water Resources Tracker"
                description="Identify and monitor water bodies, seasonal patterns, and quality"
                icon={<MdWaterDrop style={{ color: "#3b82f6" }} />}
                status="1,456 ha tracked →"
            />

            <ActionCard
                title="Agricultural Land Monitor"
                description="Track agricultural land use, crop patterns, and productivity"
                icon={<MdAgriculture style={{ color: "#f59e0b" }} />}
                status="2,789 ha monitored →"
            />

            <ActionCard
                title="Mineral Resource Survey"
                description="Geological surveys and mineral deposit identification"
                icon={<MdDiamond style={{ color: "#8b5cf6" }} />}
                status="368 ha surveyed →"
            />

            <ActionCard
                title="Land Boundary Analysis"
                description="Analyze land boundaries using GPS and satellite data"
                icon={<MdStraighten style={{ color: "#f59e0b" }} />}
                status="Analyze Boundaries →"
            />

            <ActionCard
                title="Change Detection System"
                description="Detect land use changes over time using multi-temporal imagery"
                icon={<MdBarChart style={{ color: "#ef4444" }} />}
                status="Run Detection →"
            />

            <ActionCard
                title="Resource Quality Assessment"
                description="Assess and grade natural resource quality and sustainability"
                icon={<MdAssessment style={{ color: "#059669" }} />}
                status="Quality: 94.7% →"
            />
        </div>
    </div>
);

export default MappingSection;
