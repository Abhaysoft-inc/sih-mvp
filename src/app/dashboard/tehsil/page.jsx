"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  MdWaterDrop,
  MdAgriculture,
  MdForest,
  MdBarChart,
  MdCheckCircle,
  MdCancel,
  MdSearch,
  MdLocationOn,
  MdBolt,
  MdDescription,
  MdBuild,
  MdTrendingUp,
  MdFileUpload,
  MdAssignment,
  MdPeople,
  MdMap
} from "react-icons/md"
import TehsilSidebar from "@/components/TehsilSidebar"
import TehsilNavbar from "@/components/TehsilNavbar"
import AnalyticsAndReports from "@/components/AnalyticsAndReports"
import VerificationSection from "@/components/VerificationSection"
import MappingSection from "@/components/MappingSection"
import DataManagementSection from "@/components/DataManagementSection"
import DSSSection from "@/components/DSSSection"
import { useTranslation } from "@/translations/TranslationContext"

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
  const { t } = useTranslation()

  const [stats, setStats] = useState({
    totalClaims: 156,
    pendingVerification: 56,
    verified: 118,
    rejected: 15,
    villages: 12,
    activeSurveyors: 8,
    satelliteUpdates: 5,
    schemes: 4
  })

  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')

  // Function to handle tab change with scroll to top
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // State for DSS form elements
  const [eligibilityCriteria, setEligibilityCriteria] = useState([
    { label: "Low Water Index (< 0.4)", icon: "water", checked: false },
    { label: "Has Agriculture (> 50 ha)", icon: "agriculture", checked: false },
    { label: "Forest Degradation (High)", icon: "forest", checked: false },
    { label: "High Poverty Score (> 50%)", icon: "chart", checked: false }
  ])

  // Function to get the appropriate icon component
  const getIcon = (iconType, className = "text-base") => {
    switch (iconType) {
      case "water":
        return <MdWaterDrop className={className} />
      case "agriculture":
        return <MdAgriculture className={className} />
      case "forest":
        return <MdForest className={className} />
      case "chart":
        return <MdBarChart className={className} />
      case "search":
        return <MdSearch className={className} />
      case "location":
        return <MdLocationOn className={className} />
      case "flash":
        return <MdBolt className={className} />
      case "document":
        return <MdDescription className={className} />
      case "build":
        return <MdBuild className={className} />
      case "trending":
        return <MdTrendingUp className={className} />
      case "check":
        return <MdCheckCircle className={className} />
      case "cancel":
        return <MdCancel className={className} />
      default:
        return <MdBarChart className={className} />
    }
  }

  const [priorityLevel, setPriorityLevel] = useState('High')

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' })

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

  const [popupData, setPopupData] = useState(null)

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
        <TehsilSidebar activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: "20px",
          maxWidth: "calc(100vw - 200px)",
          overflow: "hidden"
        }}>
          {/* Marquee Alert Section */}


          {/* Popup Section */}
          {popupData && (
            <>
              {/* Background Blur */}
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(5px)',
                zIndex: 999
              }} onClick={() => setPopupData(null)}></div>

              {/* Popup Content */}
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                width: '600px',
                maxWidth: '90%'
              }}>
                <h3 style={{ fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>Alert Details</h3>
                <h2>Alert Type: Deforestation</h2>
                <img src={popupData.image} alt="Alert Placeholder" style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '15px', borderRadius: '8px', marginTop: "20px" }} />
                <p style={{ fontSize: '16px', marginBottom: '10px' }}><strong>Coordinates:</strong> {popupData.coordinates}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => setPopupData(null)} style={{
                    flex: 1,
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.3s ease'
                  }}>
                    Close
                  </button>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${popupData.coordinates}`} target="_blank" rel="noopener noreferrer" style={{
                    flex: 1,
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    textAlign: 'center',
                    display: 'inline-block',
                    transition: 'background-color 0.3s ease'
                  }}>
                    View on Maps
                  </a>
                </div>
              </div>
            </>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>

              <div style={{
                backgroundColor: "#f8d7da",
                borderBottom: "1px solid #f5c6cb",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "bold",
                  padding: "4px 8px",
                  borderRadius: "4px"
                }}>Alert</span>

                <marquee style={{ color: "#721c24", fontSize: "14px", fontWeight: "bold" }}>
                  <span onClick={() => setPopupData({
                    image: 'https://imgs.mongabay.com/wp-content/uploads/sites/20/2016/10/01180102/image003.jpg',
                    coordinates: '20.5937, 78.9629'
                  })} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    Illegal activity detected in FRA area. Immediate action required!
                  </span>
                </marquee>
              </div>

              {/* Top Metrics Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px",
                marginBottom: "24px",
                marginTop: "20px"
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
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>{t('dashboard.metrics.totalClaims')}</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>1,247</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>{t('dashboard.metrics.acrossStates')}</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +12.3% {t('dashboard.metrics.fromLastMonth')}
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
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>{t('dashboard.metrics.approvalRate')}</span>
                  </div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>78.5%</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#666" }}>{t('dashboard.metrics.successRate')}</div>
                  <div style={{ fontSize: "11px", color: "#28a745", marginTop: "4px" }}>
                    ↗ +2.7% {t('dashboard.metrics.fromLastMonth')}
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
                    <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>{t('dashboard.metrics.villagesCovered')}</span>
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
                    {t('dashboard.charts.statusDistribution.title')}
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 20px 0"
                  }}>
                    {t('dashboard.charts.statusDistribution.description')}
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

              {/* Additional Charts Section */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Land Type Distribution Bar Chart */}
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
                    {t('dashboard.charts.landDistribution.title')}
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    {t('dashboard.charts.landDistribution.description')}
                  </p>

                  {/* Bar Chart */}
                  <div style={{ marginBottom: "16px" }}>
                    {[
                      { type: t('dashboard.landTypes.forestLand'), value: 45, color: "#16a34a", hectares: "1,847" },
                      { type: t('dashboard.landTypes.agricultural'), value: 35, color: "#f59e0b", hectares: "1,456" },
                      { type: t('dashboard.landTypes.communityForest'), value: 25, color: "#059669", hectares: "987" },
                      { type: t('dashboard.landTypes.mixedUse'), value: 15, color: "#6366f1", hectares: "623" }
                    ].map((item, index) => (
                      <div key={index} style={{ marginBottom: "12px" }}>
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "4px"
                        }}>
                          <span style={{ fontSize: "12px", color: "#333", fontWeight: "500" }}>
                            {item.type}
                          </span>
                          <span style={{ fontSize: "11px", color: "#666" }}>
                            {item.hectares} ha
                          </span>
                        </div>
                        <div style={{
                          width: "100%",
                          height: "18px",
                          backgroundColor: "#f1f5f9",
                          borderRadius: "9px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: `${item.value}%`,
                            height: "100%",
                            backgroundColor: item.color,
                            borderRadius: "9px",
                            transition: "width 0.5s ease"
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    fontSize: "11px",
                    color: "#666",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px"
                  }}>
                    <strong>Total Area:</strong> 4,913 hectares across all land types
                  </div>
                </div>

                {/* Application Timeline Funnel */}
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
                    Application Processing Funnel
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Claims progression through stages
                  </p>

                  {/* Funnel Chart */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      { stage: "Applications Received", count: 1247, width: 100, color: "#3b82f6" },
                      { stage: "Initial Screening", count: 1198, width: 85, color: "#06b6d4" },
                      { stage: "Field Verification", count: 1134, width: 70, color: "#10b981" },
                      { stage: "Committee Review", count: 1089, width: 55, color: "#f59e0b" },
                      { stage: "Final Approval", count: 978, width: 40, color: "#22c55e" }
                    ].map((stage, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: `${stage.width}%`,
                          height: "32px",
                          backgroundColor: stage.color,
                          borderRadius: "16px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "11px",
                          fontWeight: "600",
                          minWidth: "60px"
                        }}>
                          {stage.count}
                        </div>
                        <span style={{ fontSize: "12px", color: "#333", fontWeight: "500" }}>
                          {stage.stage}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    marginTop: "12px",
                    fontSize: "11px",
                    color: "#666",
                    padding: "8px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "4px"
                  }}>
                    <strong>Conversion Rate:</strong> 78.4% from application to approval
                  </div>
                </div>

                {/* Monthly Approval Rate Gauge */}
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
                    Monthly Approval Rate
                  </h3>
                  <p style={{
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0"
                  }}>
                    Current month performance
                  </p>

                  {/* Gauge Chart Simulation */}
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px"
                  }}>
                    <div style={{
                      width: "120px",
                      height: "60px",
                      background: "conic-gradient(from 180deg, #dc2626 0deg 36deg, #f59e0b 36deg 72deg, #22c55e 72deg 180deg)",
                      borderRadius: "120px 120px 0 0",
                      position: "relative",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center"
                    }}>
                      <div style={{
                        width: "80px",
                        height: "40px",
                        backgroundColor: "white",
                        borderRadius: "80px 80px 0 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#22c55e"
                      }}>
                        82%
                      </div>
                      {/* Needle */}
                      <div style={{
                        position: "absolute",
                        bottom: "0",
                        left: "50%",
                        width: "2px",
                        height: "50px",
                        backgroundColor: "#333",
                        transformOrigin: "bottom",
                        transform: "translateX(-50%) rotate(30deg)"
                      }}></div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      fontSize: "10px",
                      color: "#666"
                    }}>
                      <span>Poor (0-40%)</span>
                      <span>Good (40-70%)</span>
                      <span>Excellent (70%+)</span>
                    </div>

                    <div style={{
                      textAlign: "center",
                      padding: "8px",
                      backgroundColor: "#f0fdf4",
                      borderRadius: "4px",
                      border: "1px solid #bbf7d0"
                    }}>
                      <div style={{ fontSize: "12px", fontWeight: "600", color: "#15803d" }}>
                        Performance: Excellent
                      </div>
                      <div style={{ fontSize: "11px", color: "#166534" }}>
                        Target: 75% | Current: 82%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Claims Processing Workflow Timeline */}
              <div style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                marginBottom: "24px"
              }}>
                <h3 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0 0 8px 0"
                }}>
                  Average Processing Timeline
                </h3>
                <p style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: "0 0 20px 0"
                }}>
                  Typical journey of a claim from submission to approval
                </p>

                {/* Timeline */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                  padding: "0 20px"
                }}>
                  {/* Timeline Line */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    right: "20px",
                    height: "2px",
                    backgroundColor: "#e5e7eb",
                    zIndex: 1
                  }}></div>

                  {[
                    { step: "Submit", days: "Day 0", status: "complete", color: "#22c55e" },
                    { step: "Screen", days: "Day 2-3", status: "complete", color: "#22c55e" },
                    { step: "Verify", days: "Day 5-8", status: "complete", color: "#22c55e" },
                    { step: "Review", days: "Day 10-12", status: "current", color: "#f59e0b" },
                    { step: "Approve", days: "Day 14-16", status: "pending", color: "#94a3b8" }
                  ].map((phase, index) => (
                    <div key={index} style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: 2,
                      backgroundColor: "white",
                      padding: "0 8px"
                    }}>
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: phase.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "600",
                        marginBottom: "8px",
                        border: phase.status === 'current' ? "3px solid #fef3c7" : "none"
                      }}>
                        {index + 1}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#333",
                        marginBottom: "2px"
                      }}>
                        {phase.step}
                      </div>
                      <div style={{
                        fontSize: "10px",
                        color: "#666"
                      }}>
                        {phase.days}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "24px",
                  fontSize: "11px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "8px", height: "8px", backgroundColor: "#22c55e", borderRadius: "50%" }}></div>
                    <span>Completed</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "8px", height: "8px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                    <span>In Progress</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "8px", height: "8px", backgroundColor: "#94a3b8", borderRadius: "50%" }}></div>
                    <span>Pending</span>
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
                    { name: "Gond", claims: 234, percentage: "18.8%", icon: <MdPeople /> },
                    { name: "Korku", claims: 189, percentage: "15.2%", icon: <MdPeople /> },
                    { name: "Muria", claims: 156, percentage: "12.5%", icon: <MdPeople /> },
                    { name: "Baiga", claims: 134, percentage: "10.8%", icon: <MdPeople /> },
                    { name: "Others", claims: 534, percentage: "42.7%", icon: <MdPeople /> }
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
                        <span className="flex items-center gap-1">
                          <MdCheckCircle className="text-green-600" /> Approved: {state.approved}%
                        </span>
                        <span className="flex items-center gap-1">
                          <MdTrendingUp className="text-yellow-500" /> Pending: {state.pending}%
                        </span>
                        <span className="flex items-center gap-1">
                          <MdCancel className="text-red-600" /> Rejected: {state.rejected}%
                        </span>
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
                      icon={<MdBarChart />}
                      onClick={() => handleTabChange('dss')}
                      status="View Analytics →"
                    />

                    <ActionCard
                      title="Verification Center"
                      description="Review and verify pending claims with comprehensive tools"
                      icon={<MdSearch />}
                      onClick={() => handleTabChange('verification')}
                      status={`${stats.pendingVerification} pending →`}
                    />

                    <ActionCard
                      title="Assets Mapping"
                      description="Satellite imagery and land assets mapping interface"
                      icon={<MdLocationOn />}
                      onClick={() => handleTabChange('mapping')}
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
                    {
                      icon: <MdLocationOn />,
                      title: "Open FRA Atlas",
                      desc: "Geographic information system",
                      action: () => handleTabChange('mapping')
                    },
                    {
                      icon: <MdBolt />,
                      title: "Run Decision Support",
                      desc: "AI-powered recommendations",
                      action: () => handleTabChange('dss')
                    },
                    {
                      icon: <MdDescription />,
                      title: "Upload Documents",
                      desc: "Batch document processing",
                      action: () => alert('Document upload feature coming soon!')
                    },
                    {
                      icon: <MdBarChart />,
                      title: "Export Report (PDF)",
                      desc: "Generate comprehensive reports",
                      action: () => alert('Report export feature coming soon!')
                    }
                  ].map((action, index) => (
                    <div key={index} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 0",
                      borderBottom: index < 3 ? "1px solid #eee" : "none",
                      cursor: "pointer"
                    }}
                      onClick={action.action}
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
                  icon={<MdBarChart />}
                  status="Generate Report →"
                />

                <ActionCard
                  title="Data Export"
                  description="Export claims data in various formats (CSV, PDF, Excel)"
                  icon={<MdFileUpload />}
                  status="Export Data →"
                />

                <ActionCard
                  title="Custom Analytics"
                  description="Create custom analytics dashboards and visualizations"
                  icon={<MdBuild />}
                  status="Build Dashboard →"
                />

                <ActionCard
                  title="Compliance Reports"
                  description="Generate compliance and audit reports for regulatory requirements"
                  icon={<MdAssignment />}
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
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                        <MdTrendingUp />
                      </div>
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
                      <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                        <MdMap />
                      </div>
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
              getIcon={getIcon}
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

          {/* Satellite Feed Section */}
          {activeTab === 'satelliteFeeds' && (
            <div style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#333",
              }}>
                Satellite Feed
              </h2>
              <p style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: "10px",
              }}>
                This section will display real-time satellite imagery and analytics in the future.
              </p>
              <div style={{
                padding: "10px",
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                textAlign: "center",
                color: "#999",
                fontStyle: "italic",
              }}>
                Future Feature: Integration with live satellite data.
              </div>
            </div>
          )}
        </div> {/* Close Main Content Area */}
      </div> {/* Close Flex Container */}
    </div>
  )
}