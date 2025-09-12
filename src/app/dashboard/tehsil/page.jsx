"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

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
      {/* Header */}
      <div style={{
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        padding: "16px 0"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#28a745",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "white"
            }}>
              🏛️
            </div>
            <div>
              <h1 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#333",
                margin: "0",
                lineHeight: "1.2"
              }}>
                Regional Officer Dashboard
              </h1>
              <div style={{
                color: "#666",
                fontSize: "13px",
                marginTop: "1px"
              }}>
                DSS, Verification & Administrative Management
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ 
              fontSize: "13px", 
              color: "#666",
              fontWeight: "500"
            }}>
              {currentTime.toLocaleString('en-US', { 
                weekday: 'short',
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb"
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#28a745"
              }} />
              <span>Active</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px"
      }}>
        {/* Tab Navigation */}
        <div style={{ 
          display: "flex", 
          gap: "8px", 
          marginBottom: "20px",
          flexWrap: "wrap"
        }}>
          <TabButton 
            id="overview" 
            label="Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="dss" 
            label="Decision Support System" 
            isActive={activeTab === 'dss'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="analytics" 
            label="Analytics & Reports" 
            isActive={activeTab === 'analytics'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="verification" 
            label="Verification Center" 
            isActive={activeTab === 'verification'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="mapping" 
            label="Assets & Mapping" 
            isActive={activeTab === 'mapping'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            id="management" 
            label="Data Management" 
            isActive={activeTab === 'management'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              marginBottom: "24px"
            }}>
              <StatusCard
                title="Total Claims"
                value={stats.totalClaims}
                description="All registered claims"
                icon="📊"
                color="#007bff"
                status={true}
              />
              <StatusCard
                title="Pending Verification"
                value={stats.pendingVerification}
                description="Awaiting review"
                icon="⏳"
                color="#ffc107"
                status={true}
              />
              <StatusCard
                title="Verified Claims"
                value={stats.verified}
                description="Successfully verified"
                icon="✅"
                color="#28a745"
                status={true}
              />
              <StatusCard
                title="Active Villages"
                value={stats.villages}
                description="Under jurisdiction"
                icon="🏘️"
                color="#17a2b8"
                status={true}
              />
            </div>

            {/* Quick Actions Overview */}
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
          </>
        )}

        {/* Decision Support System Tab */}
        {activeTab === 'dss' && (
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
              
              <div style={{
                fontSize: "14px",
                color: "#666"
              }}>
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

            {/* Main DSS Interface */}
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
                    <div style={{
                      textAlign: "right"
                    }}>
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
                    <div style={{
                      textAlign: "right"
                    }}>
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
                    <div style={{
                      textAlign: "right"
                    }}>
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
        )}

        {/* Analytics & Reports Tab */}
        {activeTab === 'analytics' && (
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
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
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
        )}

        {/* Assets & Mapping Tab */}
        {activeTab === 'mapping' && (
          <div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#333",
              margin: "0 0 16px 0"
            }}>
              Assets Mapping & Satellite Imagery
            </h3>
            
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
        )}

        {/* Data Management Tab */}
        {activeTab === 'management' && (
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
        )}
      </div>
    </div>
  )
}