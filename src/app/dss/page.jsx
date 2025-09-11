"use client"

import { useState } from "react"

export default function DSSPage() {
  const [activeTab, setActiveTab] = useState("schemes")

  const tabs = [
    { id: "schemes", label: "Scheme Recommendations", icon: "📋" },
    { id: "insights", label: "AI Insights", icon: "🧠" },
    { id: "priorities", label: "Intervention Priorities", icon: "⚡" }
  ]

  const schemes = [
    {
      id: "pm-kisan",
      name: "PM-KISAN",
      description: "FRA patta holders with agricultural land",
      icon: "🌾",
      priority: "High",
      priorityColor: "#10b981",
      priorityBg: "#ecfdf5",
      eligibleBeneficiaries: "3,456",
      potentialBenefit: "₹6,000/year per farmer",
      estimatedCoverage: "87%",
      status: "Ready to Deploy",
      gradient: "from-green-50 to-emerald-50",
      borderColor: "#d1fae5"
    },
    {
      id: "jal-jeevan",
      name: "Jal Jeevan Mission",
      description: "Villages with <50% water coverage",
      icon: "💧",
      priority: "High",
      priorityColor: "#0ea5e9",
      priorityBg: "#f0f9ff",
      eligibleBeneficiaries: "2,134",
      potentialBenefit: "Water connection to every household",
      estimatedCoverage: "65%",
      status: "Survey Required",
      gradient: "from-blue-50 to-cyan-50",
      borderColor: "#bae6fd"
    },
    {
      id: "mgnrega",
      name: "MGNREGA",
      description: "Adult FRA beneficiaries",
      icon: "👥",
      priority: "Medium",
      priorityColor: "#f59e0b",
      priorityBg: "#fffbeb",
      eligibleBeneficiaries: "4,567",
      potentialBenefit: "100 days guaranteed employment",
      estimatedCoverage: "92%",
      status: "Active Enrollment",
      gradient: "from-amber-50 to-yellow-50",
      borderColor: "#fed7aa"
    },
    {
      id: "dajgua",
      name: "DAJGUA Schemes",
      description: "Tribal communities with CFR rights",
      icon: "🏠",
      priority: "High",
      priorityColor: "#8b5cf6",
      priorityBg: "#faf5ff",
      eligibleBeneficiaries: "1,876",
      potentialBenefit: "Integrated tribal development",
      estimatedCoverage: "78%",
      status: "Planning Phase",
      gradient: "from-purple-50 to-violet-50",
      borderColor: "#e9d5ff"
    }
  ]

  const renderSchemeCard = (scheme) => (
    <div key={scheme.id} style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderRadius: "20px",
      border: `2px solid ${scheme.borderColor}`,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
      padding: "28px",
      marginBottom: "28px",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer"
    }}
    >
      {/* Decorative background pattern */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "120px",
        height: "120px",
        background: `linear-gradient(135deg, ${scheme.priorityBg}40, transparent)`,
        borderRadius: "50%",
        zIndex: 0
      }} />
      
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "24px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            background: `linear-gradient(135deg, ${scheme.priorityBg}, ${scheme.priorityBg}80)`,
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: `2px solid ${scheme.borderColor}`
          }}>
            {scheme.icon}
          </div>
          <div>
            <h3 style={{
              fontSize: "22px",
              fontWeight: "800",
              margin: "0 0 6px 0",
              color: "#0f172a",
              letterSpacing: "-0.025em"
            }}>
              {scheme.name}
            </h3>
            <p style={{
              fontSize: "15px",
              color: "#64748b",
              margin: "0",
              fontWeight: "500"
            }}>
              {scheme.description}
            </p>
          </div>
        </div>
        <div style={{
          background: `linear-gradient(135deg, ${scheme.priorityColor}, ${scheme.priorityColor}dd)`,
          color: "white",
          padding: "8px 16px",
          borderRadius: "24px",
          fontSize: "13px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
        }}>
          {scheme.priority}
        </div>
      </div>

      {/* Metrics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "28px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{ 
          textAlign: "center",
          padding: "16px 12px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.8)"
        }}>
          <div style={{
            fontSize: "26px",
            fontWeight: "800",
            color: "#10b981",
            marginBottom: "6px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
          }}>
            {scheme.eligibleBeneficiaries}
          </div>
          <div style={{
            fontSize: "13px",
            color: "#64748b",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Eligible Beneficiaries
          </div>
        </div>
        <div style={{ 
          textAlign: "center",
          padding: "16px 12px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.8)"
        }}>
          <div style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#ea580c",
            marginBottom: "6px",
            lineHeight: "1.2"
          }}>
            {scheme.potentialBenefit}
          </div>
          <div style={{
            fontSize: "13px",
            color: "#64748b",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Potential Benefit
          </div>
        </div>
        <div style={{ 
          textAlign: "center",
          padding: "16px 12px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.8)"
        }}>
          <div style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#0ea5e9",
            marginBottom: "6px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
          }}>
            {scheme.estimatedCoverage}
          </div>
          <div style={{
            fontSize: "13px",
            color: "#64748b",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Est. Coverage
          </div>
        </div>
        <div style={{ 
          textAlign: "center",
          padding: "16px 12px",
          background: "rgba(255, 255, 255, 0.6)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.8)"
        }}>
          <div style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "#1e293b",
            marginBottom: "6px",
            lineHeight: "1.2"
          }}>
            {scheme.status}
          </div>
          <div style={{
            fontSize: "13px",
            color: "#64748b",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            Status
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        gap: "16px",
        position: "relative",
        zIndex: 1
      }}>
        <button style={{
          flex: 1,
          height: "48px",
          background: `linear-gradient(135deg, ${scheme.priorityColor}, ${scheme.priorityColor}dd)`,
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: "700",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          textTransform: "uppercase",
          letterSpacing: "0.025em"
        }}
        >
          🎯 Generate Action Plan
        </button>
        <button style={{
          flex: 1,
          height: "48px",
          background: "rgba(255, 255, 255, 0.9)",
          color: "#64748b",
          border: `2px solid ${scheme.borderColor}`,
          borderRadius: "12px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          textTransform: "uppercase",
          letterSpacing: "0.025em"
        }}
        >
          View Details
        </button>
      </div>
    </div>
  )

  const renderAIInsights = () => (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderRadius: "24px",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05)",
      padding: "32px",
      marginBottom: "32px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background */}
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "150px",
        height: "150px",
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)",
        borderRadius: "50%"
      }} />
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "28px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          width: "64px",
          height: "64px",
          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
        }}>
          🧠
        </div>
        <h3 style={{
          fontSize: "28px",
          fontWeight: "800",
          margin: "0",
          color: "#0f172a",
          letterSpacing: "-0.025em"
        }}>
          AI-Powered Insights
        </h3>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "24px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
          border: "2px solid #bbf7d0",
          borderRadius: "20px",
          padding: "28px",
          position: "relative",
          overflow: "hidden",
        }}
        >
          <div style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)",
            borderRadius: "50%"
          }} />
          <h4 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#166534",
            margin: "0 0 16px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            🎯 Optimization Opportunities
          </h4>
          <p style={{
            fontSize: "16px",
            color: "#166534",
            margin: "0",
            lineHeight: "1.6",
            fontWeight: "500"
          }}>
            Identified 15 villages with overlapping scheme eligibility that can be optimized for better resource allocation.
          </p>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
          border: "2px solid #bfdbfe",
          borderRadius: "20px",
          padding: "28px",
          position: "relative",
          overflow: "hidden",
        }}
        >
          <div style={{
            position: "absolute",
            top: "-20px",
            right: "-20px",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)",
            borderRadius: "50%"
          }} />
          <h4 style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1d4ed8",
            margin: "0 0 16px 0",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            📊 Coverage Analysis
          </h4>
          <p style={{
            fontSize: "16px",
            color: "#1d4ed8",
            margin: "0",
            lineHeight: "1.6",
            fontWeight: "500"
          }}>
            Current coverage stands at 78% across all schemes. Target villages identified for 95% coverage.
          </p>
        </div>
      </div>
    </div>
  )

  const renderInterventionPriorities = () => (
    <div style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      borderRadius: "24px",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05)",
      padding: "32px",
      marginBottom: "32px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background */}
      <div style={{
        position: "absolute",
        top: "-50px",
        left: "-50px",
        width: "150px",
        height: "150px",
        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), transparent)",
        borderRadius: "50%"
      }} />
      
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "28px",
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          width: "64px",
          height: "64px",
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          boxShadow: "0 8px 20px rgba(245, 158, 11, 0.3)"
        }}>
          ⚡
        </div>
        <h3 style={{
          fontSize: "28px",
          fontWeight: "800",
          margin: "0",
          color: "#0f172a",
          letterSpacing: "-0.025em"
        }}>
          Intervention Priorities
        </h3>
      </div>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px",
        position: "relative",
        zIndex: 1
      }}>
        {[
          { priority: 1, title: "High-Impact Water Infrastructure", impact: "Critical", villages: "23 villages", color: "#dc2626", bgColor: "#fef2f2" },
          { priority: 2, title: "Agricultural Support Programs", impact: "High", villages: "45 villages", color: "#d97706", bgColor: "#fef3c7" },
          { priority: 3, title: "Employment Generation", impact: "Medium", villages: "67 villages", color: "#16a34a", bgColor: "#f0fdf4" }
        ].map((item, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))",
            borderRadius: "16px",
            border: "2px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)"
          }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "white",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "800",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
              }}>
                {item.priority}
              </div>
              <div>
                <h4 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  margin: "0 0 6px 0",
                  color: "#0f172a",
                  letterSpacing: "-0.025em"
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: "16px",
                  color: "#64748b",
                  margin: "0",
                  fontWeight: "500"
                }}>
                  {item.villages}
                </p>
              </div>
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${item.bgColor}, ${item.bgColor}80)`,
              color: item.color,
              padding: "8px 20px",
              borderRadius: "24px",
              fontSize: "14px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              border: `2px solid ${item.color}20`,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }}>
              {item.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "schemes":
        return schemes.map(renderSchemeCard)
      case "insights":
        return renderAIInsights()
      case "priorities":
        return renderInterventionPriorities()
      default:
        return null
    }
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      position: "relative"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
        zIndex: 0
      }} />
      
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "32px",
        position: "relative",
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05)",
          padding: "40px",
          marginBottom: "32px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "200px",
            height: "200px",
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)",
            borderRadius: "50%"
          }} />
          <div style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "150px",
            height: "150px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent)",
            borderRadius: "50%"
          }} />
          
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px",
            position: "relative",
            zIndex: 1
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
            }}>
              🧠
            </div>
            <h1 style={{
              fontSize: "32px",
              fontWeight: "800",
              margin: "0",
              color: "#0f172a",
              letterSpacing: "-0.025em",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              AI-Powered Decision Support System
            </h1>
          </div>
          <p style={{
            fontSize: "18px",
            color: "#64748b",
            margin: "0",
            maxWidth: "700px",
            margin: "0 auto",
            fontWeight: "500",
            lineHeight: "1.6"
          }}>
            Leveraging machine learning and spatial analysis to optimize scheme layering and policy interventions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)",
          padding: "12px",
          marginBottom: "32px",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            display: "flex",
            gap: "8px"
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  height: "56px",
                  background: activeTab === tab.id 
                    ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" 
                    : "rgba(255, 255, 255, 0.7)",
                  color: activeTab === tab.id ? "white" : "#64748b",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: activeTab === tab.id 
                    ? "0 8px 20px rgba(59, 130, 246, 0.3)" 
                    : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  textTransform: "uppercase",
                  letterSpacing: "0.025em"
                }}
              >
                <span style={{ fontSize: "18px" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
