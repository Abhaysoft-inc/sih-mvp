"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import TehsilSidebar from "@/components/TehsilSidebar"
import TehsilNavbar from "@/components/TehsilNavbar"
import AnalyticsAndReports from "@/components/AnalyticsAndReports"
import VerificationSection from "@/components/VerificationSection"
import MappingSection from "@/components/MappingSection"
import DataManagementSection from "@/components/DataManagementSection"
import DSSSection from "@/components/DSSSection"

// Dynamic import to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
})

export default function TehsilDashboard() {
  const [stats, setStats] = useState({
    totalClaims: 156,
    pendingVerification: 23,
    verified: 118,
    rejected: 15,
    villages: 12,
    activeSurveyors: 8,
    satelliteUpdates: 5,
    schemes: 4
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')

  // State for DSS form elements
  const [eligibilityCriteria, setEligibilityCriteria] = useState([
    { label: "Low Water Index (< 0.4)", icon: "💧", checked: false },
    { label: "Has Agriculture (> 50 ha)", icon: "🌾", checked: false },
    { label: "Forest Degradation (High)", icon: "🌳", checked: false },
    { label: "High Poverty Score (> 50%)", icon: "📊", checked: false }
  ])

  const [priorityLevel, setPriorityLevel] = useState('High')

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timeInterval)
  }, [])

  // Handler functions for form elements
  const handleCriteriaChange = (index) => {
    setEligibilityCriteria(prev =>
      prev.map((criteria, i) =>
        i === index ? { ...criteria, checked: !criteria.checked } : criteria
      )
    )
  }

  const handlePriorityChange = (value) => {
    setPriorityLevel(value)
  }

  const StatusCard = ({ title, value, description, icon, color = "#007bff", status }) => (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "6px",
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
            {title}
          </div>
          <div style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#333",
            lineHeight: "1"
          }}>
            {value}
          </div>
        </div>
        <div style={{
          width: "36px",
          height: "36px",
          backgroundColor: `${color}20`,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px"
        }}>
          {icon}
        </div>
      </div>
      <div style={{
        fontSize: "12px",
        color: color,
        fontWeight: "500"
      }}>
        {status && "● "}{description}
      </div>
    </div>
  )

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        padding: "10px 20px",
        backgroundColor: isActive ? "#007bff" : "transparent",
        color: isActive ? "white" : "#666",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s ease"
      }}
    >
      {label}
    </button>
  )

  const ActionCard = ({ title, description, icon, onClick, disabled = false, status }) => (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "6px",
        padding: "20px",
        cursor: disabled ? "default" : "pointer",
        textAlign: "left",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.2s ease",
        opacity: disabled ? 0.6 : 1
      }}
    >
      <div style={{
        width: "48px",
        height: "48px",
        backgroundColor: disabled ? "#f8f9fa" : "#e7f3ff",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "16px",
        fontSize: "20px"
      }}>
        {icon}
      </div>
      <h4 style={{
        fontSize: "16px",
        fontWeight: "600",
        color: disabled ? "#666" : "#333",
        margin: "0 0 8px 0"
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: "14px",
        color: disabled ? "#999" : "#666",
        margin: "0 0 12px 0",
        lineHeight: "1.4"
      }}>
        {description}
      </p>
      {status && (
        <div style={{
          color: "#007bff",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          {status}
        </div>
      )}
    </div>
  )


  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    }}>
      {/* Navbar */}
      <TehsilNavbar currentTime={currentTime} />

      <div style={{
        display: "flex",
        maxWidth: "none",
        margin: "0"
      }}>
        {/* Sidebar Navigation */}
        <TehsilSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: "20px",
          maxWidth: "calc(100vw - 200px)",
          overflow: "hidden"
        }}>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Top Metrics Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px",
                marginBottom: "24px"
              }}>
                {/* Enhanced metrics with trends */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>Total Claims</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>1,247</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>Across all states</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +12.3% from last month
                  </div>
                </div>

                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>Approval Rate</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>78.5%</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>Success rate</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +2.7% from last month
                  </div>
                </div>

                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>Pending Claims</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>156</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>Awaiting review</div>
                  <div style={{ fontSize: "11px", color: "#007bff", marginTop: "4px" }}>
                    ↗ +8 new claims
                  </div>
                </div>

                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>CFR Area</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>2,847 ha</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>Community forest rights</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +234 ha approved
                  </div>
                </div>

                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>Villages Covered</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>89</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>Tribal settlements</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +3 new villages
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Claims Status Distribution */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    Claims Status Distribution
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 20px 0"
                  }}>
                    Current status of all submitted claims
                  </p>

                  {/* Donut Chart Simulation */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "40px"
                  }}>
                    <div style={{
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: "conic-gradient(#28a745 0deg 245deg, #ffc107 245deg 290deg, #dc3545 290deg 360deg)",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <div style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "white",
                        borderRadius: "50%"
                      }}></div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#28a745", borderRadius: "50%" }}></div>
                        <span style={{ fontSize: "13px", color: "#333" }}>Approved (978)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#ffc107", borderRadius: "50%" }}></div>
                        <span style={{ fontSize: "13px", color: "#333" }}>Under Review (156)</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", backgroundColor: "#dc3545", borderRadius: "50%" }}></div>
                        <span style={{ fontSize: "13px", color: "#333" }}>Rejected (113)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Claims Processing */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    Monthly Claims Processing
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 12px 0"
                  }}>
                    Processing trend over the last 12 months
                  </p>

                  {/* Chart Legend */}
                  <div style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "16px",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "16px",
                        height: "3px",
                        backgroundColor: "#28a745",
                        borderRadius: "2px"
                      }}></div>
                      <span style={{ fontSize: "11px", color: "#333", fontWeight: "500" }}>
                        Green Line: Approved Claims
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "16px",
                        height: "3px",
                        backgroundColor: "#007bff",
                        borderRadius: "2px"
                      }}></div>
                      <span style={{ fontSize: "11px", color: "#333", fontWeight: "500" }}>
                        Blue Line: Total Submissions
                      </span>
                    </div>
                  </div>

                  {/* Line Chart Simulation */}
                  <div style={{
                    height: "180px",
                    position: "relative",
                    border: "1px solid #eee",
                    borderRadius: "4px",
                    background: "linear-gradient(to bottom, #f8f9fa 0%, white 100%)"
                  }}>
                    {/* Y-axis labels */}
                    <div style={{
                      position: "absolute",
                      left: "8px",
                      top: "10px",
                      fontSize: "11px",
                      color: "#666"
                    }}>100</div>
                    <div style={{
                      position: "absolute",
                      left: "15px",
                      top: "50px",
                      fontSize: "11px",
                      color: "#666"
                    }}>75</div>
                    <div style={{
                      position: "absolute",
                      left: "15px",
                      top: "90px",
                      fontSize: "11px",
                      color: "#666"
                    }}>50</div>
                    <div style={{
                      position: "absolute",
                      left: "15px",
                      bottom: "40px",
                      fontSize: "11px",
                      color: "#666"
                    }}>25</div>

                    {/* Chart lines simulation */}
                    <svg style={{ width: "100%", height: "100%" }}>
                      {/* Blue line - Total Submissions */}
                      <polyline
                        points="40,40 80,35 120,45 160,38 200,42 240,35 280,40 320,33 360,38 400,30 440,35 480,28"
                        fill="none"
                        stroke="#007bff"
                        strokeWidth="3"
                        strokeDasharray="none"
                      />
                      {/* Green line - Approved Claims */}
                      <polyline
                        points="40,60 80,55 120,65 160,58 200,62 240,55 280,60 320,53 360,58 400,50 440,55 480,48"
                        fill="none"
                        stroke="#28a745"
                        strokeWidth="3"
                        strokeDasharray="none"
                      />

                      {/* Data points for better visibility */}
                      {[
                        { x: 40, y: 40 }, { x: 80, y: 35 }, { x: 120, y: 45 }, { x: 160, y: 38 },
                        { x: 200, y: 42 }, { x: 240, y: 35 }, { x: 280, y: 40 }, { x: 320, y: 33 },
                        { x: 360, y: 38 }, { x: 400, y: 30 }, { x: 440, y: 35 }, { x: 480, y: 28 }
                      ].map((point, i) => (
                        <circle key={`blue-${i}`} cx={point.x} cy={point.y} r="3" fill="#007bff" />
                      ))}

                      {[
                        { x: 40, y: 60 }, { x: 80, y: 55 }, { x: 120, y: 65 }, { x: 160, y: 58 },
                        { x: 200, y: 62 }, { x: 240, y: 55 }, { x: 280, y: 60 }, { x: 320, y: 53 },
                        { x: 360, y: 58 }, { x: 400, y: 50 }, { x: 440, y: 55 }, { x: 480, y: 48 }
                      ].map((point, i) => (
                        <circle key={`green-${i}`} cx={point.x} cy={point.y} r="3" fill="#28a745" />
                      ))}
                    </svg>

                    {/* X-axis months */}
                    <div style={{
                      position: "absolute",
                      bottom: "5px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 40px",
                      fontSize: "10px",
                      color: "#666"
                    }}>
                      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                    </div>
                  </div>

                  {/* Chart Summary */}
                  <div style={{
                    marginTop: "12px",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                    fontSize: "11px",
                    color: "#666"
                  }}>
                    <strong style={{ color: "#333" }}>Trend Analysis:</strong> Total submissions (blue) show steady growth,
                    while approval rates (green) maintain consistent performance across all months.
                  </div>
                </div>
              </div>

              {/* Lower Section - 3 Columns */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Tribal Community Distribution */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    Tribal Community Distribution
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Claims by tribal communities
                  </p>

                  {[
                    { name: "Gond", claims: 234, percentage: "18.8%", icon: "👥" },
                    { name: "Korku", claims: 189, percentage: "15.2%", icon: "👥" },
                    { name: "Muria", claims: 156, percentage: "12.5%", icon: "👥" },
                    { name: "Baiga", claims: 134, percentage: "10.8%", icon: "👥" },
                    { name: "Others", claims: 534, percentage: "42.7%", icon: "👥" }
                  ].map((community, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: index < 4 ? "1px solid #eee" : "none"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "16px" }}>{community.icon}</span>
                        <div>
                          <div style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}>{community.name}</div>
                          <div style={{ fontSize: "11px", color: "#666" }}>{community.claims} claims</div>
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#007bff" }}>
                        {community.percentage}
                      </div>
                    </div>
                  ))}
                </div>

                {/* State-wise Performance */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    State-wise Performance
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Claims processing by state
                  </p>

                  {[
                    { state: "Madhya Pradesh", approved: 72, pending: 18, rejected: 10 },
                    { state: "Tripura", approved: 85, pending: 10, rejected: 5 },
                    { state: "Odisha", approved: 68, pending: 22, rejected: 10 },
                    { state: "Telangana", approved: 79, pending: 15, rejected: 6 }
                  ].map((state, index) => (
                    <div key={index} style={{ marginBottom: "16px" }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px"
                      }}>
                        <span style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#333"
                        }}>
                          {state.state}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          color: "#666"
                        }}>
                          {state.approved + state.pending + state.rejected} total
                        </span>
                      </div>
                      <div style={{
                        display: "flex",
                        height: "24px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        backgroundColor: "#f8f9fa",
                        marginBottom: "4px"
                      }}>
                        <div style={{
                          width: `${state.approved}%`,
                          backgroundColor: "#28a745",
                          transition: "all 0.3s ease"
                        }}></div>
                        <div style={{
                          width: `${state.pending}%`,
                          backgroundColor: "#ffc107"
                        }}></div>
                        <div style={{
                          width: `${state.rejected}%`,
                          backgroundColor: "#dc3545"
                        }}></div>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "10px",
                        color: "#666"
                      }}>
                        <span>✅ Approved: {state.approved}%</span>
                        <span>⏳ Pending: {state.pending}%</span>
                        <span>❌ Rejected: {state.rejected}%</span>
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div style={{
                    marginTop: "12px",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                    fontSize: "10px"
                  }}>
                    <div style={{ fontWeight: "600", marginBottom: "4px", color: "#333" }}>Legend:</div>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "#28a745", borderRadius: "50%" }}></div>
                        Approved Claims
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "#ffc107", borderRadius: "50%" }}></div>
                        Pending Review
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <div style={{ width: "8px", height: "8px", backgroundColor: "#dc3545", borderRadius: "50%" }}></div>
                        Rejected Claims
                      </span>
                    </div>
                  </div>
                </div>

                {/* Processing Efficiency */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    Processing Efficiency
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Average processing times
                  </p>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "13px", color: "#333" }}>IFR Claims:</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#007bff" }}>12.3 days</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "13px", color: "#333" }}>CFR Claims:</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#007bff" }}>18.7 days</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "13px", color: "#333" }}>CR Claims:</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: "#007bff" }}>15.2 days</span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>
                    <h4 style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                      margin: "0 0 8px 0"
                    }}>
                      Geographic Coverage
                    </h4>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>States:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>3</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>Districts:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>12</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>Villages:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600" }}>89</span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid #eee", paddingTop: "16px", marginTop: "16px" }}>
                    <h4 style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#333",
                      margin: "0 0 8px 0"
                    }}>
                      Quality Metrics
                    </h4>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>Documentation:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#28a745" }}>96%</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>Verification:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#28a745" }}>94%</span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <span style={{ fontSize: "12px", color: "#666" }}>Compliance:</span>
                      <span style={{ fontSize: "12px", fontWeight: "600", color: "#28a745" }}>92%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Overview */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "20px"
              }}>
                {/* Main Quick Actions */}
                <div>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 12px 0"
                  }}>
                    Quick Access
                  </h3>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "16px"
                  }}>
                    <ActionCard
                      title="Decision Support System"
                      description="Advanced analytics and decision-making tools for claim processing"
                      icon="🧠"
                      onClick={() => setActiveTab('dss')}
                      status="View Analytics →"
                    />

                    <ActionCard
                      title="Verification Center"
                      description="Review and verify pending claims with comprehensive tools"
                      icon="🔍"
                      onClick={() => setActiveTab('verification')}
                      status={`${stats.pendingVerification} pending →`}
                    />

                    <ActionCard
                      title="Assets Mapping"
                      description="Satellite imagery and land assets mapping interface"
                      icon="🗺️"
                      onClick={() => setActiveTab('mapping')}
                      status="View Maps →"
                    />
                  </div>
                </div>

                {/* Quick Actions Sidebar */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 8px 0"
                  }}>
                    Quick Actions
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Common tasks and workflows
                  </p>

                  {[
                    { icon: "📍", title: "Open FRA Atlas", desc: "Geographic information system" },
                    { icon: "⚡", title: "Run Decision Support", desc: "AI-powered recommendations" },
                    { icon: "📄", title: "Upload Documents", desc: "Batch document processing" },
                    { icon: "📊", title: "Export Report (PDF)", desc: "Generate comprehensive reports" }
                  ].map((action, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 0",
                      borderBottom: index < 3 ? "1px solid #eee" : "none",
                      cursor: "pointer"
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8f9fa"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px"
                      }}>
                        {action.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#333",
                          marginBottom: "2px"
                        }}>
                          {action.title}
                        </div>
                        <div style={{
                          fontSize: "11px",
                          color: "#666"
                        }}>
                          {action.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#333",
                  margin: "0 0 8px 0"
                }}>
                  Analytics & Reports
                </h2>
                <p style={{
                  fontSize: "14px",
                  color: "#666",
                  margin: "0"
                }}>
                  Comprehensive data analysis and reporting tools
                </p>
              </div>

              {/* Analytics Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginBottom: "24px"
              }}>
                <ActionCard
                  title="Performance Reports"
                  description="Generate detailed performance analytics and trend reports"
                  icon="📊"
                  status="Generate Report →"
                />

                <ActionCard
                  title="Data Export"
                  description="Export claims data in various formats (CSV, PDF, Excel)"
                  icon="📤"
                  status="Export Data →"
                />

                <ActionCard
                  title="Custom Analytics"
                  description="Create custom analytics dashboards and visualizations"
                  icon="🔧"
                  status="Build Dashboard →"
                />

                <ActionCard
                  title="Compliance Reports"
                  description="Generate compliance and audit reports for regulatory requirements"
                  icon="📋"
                  status="View Compliance →"
                />
              </div>

              {/* Charts Section for Analytics */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Claims Trend Analysis */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 16px 0"
                  }}>
                    Annual Claims Trend
                  </h3>

                  <div style={{
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #eee"
                  }}>
                    <div style={{ textAlign: "center", color: "#666" }}>
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>📈</div>
                      <div style={{ fontSize: "14px" }}>Claims trend visualization</div>
                    </div>
                  </div>
                </div>

                {/* Regional Performance */}
                <div style={{
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#333",
                    margin: "0 0 16px 0"
                  }}>
                    Regional Performance Map
                  </h3>

                  <div style={{
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #eee"
                  }}>
                    <div style={{ textAlign: "center", color: "#666" }}>
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>🗺️</div>
                      <div style={{ fontSize: "14px" }}>Regional performance heatmap</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Decision Support System Tab */}
          {activeTab === 'dss' && (
            <DSSSection
              eligibilityCriteria={eligibilityCriteria}
              handleCriteriaChange={handleCriteriaChange}
              priorityLevel={priorityLevel}
              handlePriorityChange={handlePriorityChange}
            />
          )}

          {/* Analytics & Reports Tab */}
          {activeTab === 'analytics' && (
            <AnalyticsAndReports stats={stats} ActionCard={ActionCard} />
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <VerificationSection stats={stats} ActionCard={ActionCard} />
          )}

          {/* Assets & Mapping Tab */}
          {activeTab === 'mapping' && (
            <MappingSection stats={stats} ActionCard={ActionCard} />
          )}

          {/* Data Management Tab */}
          {activeTab === 'management' && (
            <DataManagementSection stats={stats} ActionCard={ActionCard} />
          )}
        </div> {/* Close Main Content Area */}
      </div> {/* Close Flex Container */}
    </div>
  )
}