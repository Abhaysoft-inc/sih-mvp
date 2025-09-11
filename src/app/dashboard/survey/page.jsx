"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SurveyDashboard() {
  const [stats, setStats] = useState({ 
    todaySubmissions: 7, 
    pendingSync: 0, 
    totalClaims: 142,
    completionRate: 89
  })
  const [isOnline, setIsOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      clearInterval(timeInterval)
    }
  }, [])

  const StatusIndicator = ({ isOnline }) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      backgroundColor: isOnline ? "#f0fdf4" : "#fef2f2",
      color: isOnline ? "#15803d" : "#dc2626",
      border: `1px solid ${isOnline ? "#bbf7d0" : "#fecaca"}`,
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
    }}>
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: isOnline ? "#15803d" : "#dc2626",
        animation: isOnline ? "pulse 2s infinite" : "none"
      }} />
      <span>{isOnline ? "Online" : "Offline"}</span>
    </div>
  )

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#fafafa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .card-hover {
          transition: all 0.2s ease-in-out;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
        }
        
        .button-hover {
          transition: all 0.15s ease;
        }
        
        .button-hover:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .quick-action:hover {
          background-color: #f8fafc !important;
          border-color: #cbd5e1 !important;
        }
      `}</style>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#3b82f6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "white"
            }}>
              📋
            </div>
            <div>
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#1e293b",
                margin: "0 0 4px 0",
                letterSpacing: "-0.025em"
              }}>
                Field Survey Dashboard
              </h1>
              <p style={{
                color: "#64748b",
                margin: "0",
                fontSize: "15px"
              }}>
                Welcome back! Today is {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ 
              fontSize: "14px", 
              color: "#64748b",
              textAlign: "right"
            }}>
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
            <StatusIndicator isOnline={isOnline} />
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "32px"
      }}>
        {/* Primary Action Card */}
        <div className="card-hover" style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          padding: "40px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
        }}>
          <div style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            filter: "blur(60px)"
          }} />
          <div style={{
            position: "relative",
            zIndex: 1
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px auto",
              fontSize: "36px",
              backdropFilter: "blur(10px)"
            }}>
              ➕
            </div>
            <h2 style={{
              fontSize: "32px",
              fontWeight: "700",
              margin: "0 0 12px 0",
              letterSpacing: "-0.025em"
            }}>
              Ready for Your Next Survey?
            </h2>
            <p style={{
              fontSize: "18px",
              opacity: 0.9,
              margin: "0 0 32px 0",
              lineHeight: "1.6"
            }}>
              Start documenting a new FRA claim with our streamlined registration process
            </p>
            <Link href="/register/new" style={{ textDecoration: "none" }}>
              <button className="button-hover" style={{
                backgroundColor: "white",
                color: "#667eea",
                border: "none",
                borderRadius: "12px",
                padding: "16px 32px",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
              }}>
                <span style={{ fontSize: "20px" }}>📝</span>
                Begin New Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Performance Overview */}
        <div style={{ marginBottom: "8px" }}>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1e293b",
            margin: "0 0 16px 0"
          }}>
            Today's Performance
          </h3>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {/* Today's Submissions */}
          <div className="card-hover" style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            overflow: "hidden"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              padding: "20px 24px 16px 24px",
              color: "white"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px"
              }}>
                <span style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  opacity: 0.9
                }}>
                  Claims Submitted Today
                </span>
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "20px"
                }}>
                  📊
                </div>
              </div>
              <div style={{
                fontSize: "36px",
                fontWeight: "700",
                margin: "0"
              }}>
                {stats.todaySubmissions}
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#10b981",
                  borderRadius: "50%"
                }} />
                <span style={{
                  fontSize: "14px",
                  color: "#64748b"
                }}>
                  Successfully processed and verified
                </span>
              </div>
            </div>
          </div>

          {/* Sync Status */}
          <div className="card-hover" style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            overflow: "hidden"
          }}>
            <div style={{
              background: stats.pendingSync === 0 
                ? "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
                : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              padding: "20px 24px 16px 24px",
              color: "white"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px"
              }}>
                <span style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  opacity: 0.9
                }}>
                  Data Synchronization
                </span>
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "20px"
                }}>
                  {stats.pendingSync === 0 ? "✅" : "⏳"}
                </div>
              </div>
              <div style={{
                fontSize: "36px",
                fontWeight: "700",
                margin: "0"
              }}>
                {stats.pendingSync}
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: stats.pendingSync === 0 ? "#06b6d4" : "#f59e0b",
                  borderRadius: "50%"
                }} />
                <span style={{
                  fontSize: "14px",
                  color: "#64748b"
                }}>
                  {stats.pendingSync === 0 ? "All data synchronized" : "Items waiting to sync"}
                </span>
              </div>
            </div>
          </div>

          {/* Total Progress */}
          <div className="card-hover" style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            overflow: "hidden"
          }}>
            <div style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              padding: "20px 24px 16px 24px",
              color: "white"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "12px"
              }}>
                <span style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  opacity: 0.9
                }}>
                  Total Claims Registered
                </span>
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "8px",
                  fontSize: "20px"
                }}>
                  📈
                </div>
              </div>
              <div style={{
                fontSize: "36px",
                fontWeight: "700",
                margin: "0"
              }}>
                {stats.totalClaims}
              </div>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#8b5cf6",
                  borderRadius: "50%"
                }} />
                <span style={{
                  fontSize: "14px",
                  color: "#64748b"
                }}>
                  {stats.completionRate}% completion rate
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div>
          <h3 style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#1e293b",
            margin: "0 0 20px 0"
          }}>
            Quick Actions
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px"
          }}>
            {/* New Registration Card */}
            <Link href="/register/new" style={{ textDecoration: "none" }}>
              <div className="card-hover quick-action" style={{
                backgroundColor: "white",
                borderRadius: "16px",
                border: "2px solid #e2e8f0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                padding: "28px",
                cursor: "pointer",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  height: "4px",
                  background: "linear-gradient(90deg, #3b82f6, #1d4ed8)"
                }} />
                <div style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  fontSize: "28px",
                  border: "2px solid #dbeafe"
                }}>
                  📝
                </div>
                <h4 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e293b",
                  margin: "0 0 12px 0"
                }}>
                  New FRA Claim Registration
                </h4>
                <p style={{
                  fontSize: "14px",
                  color: "#64748b",
                  margin: "0 0 20px 0",
                  lineHeight: "1.5"
                }}>
                  Document a new Forest Rights Act claim with guided step-by-step process
                </p>
                <div style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "500",
                  display: "inline-block"
                }}>
                  Start Registration →
                </div>
              </div>
            </Link>
            
            {/* GPS Survey Card */}
            <div className="card-hover" style={{
              backgroundColor: "white",
              borderRadius: "16px",
              border: "2px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              padding: "28px",
              textAlign: "center",
              position: "relative",
              opacity: 0.7
            }}>
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "4px",
                backgroundColor: "#94a3b8"
              }} />
              <div style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#f1f5f9",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                fontSize: "28px",
                border: "2px solid #e2e8f0"
              }}>
                🗺️
              </div>
              <h4 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 12px 0"
              }}>
                GPS Land Survey
              </h4>
              <p style={{
                fontSize: "14px",
                color: "#94a3b8",
                margin: "0 0 20px 0",
                lineHeight: "1.5"
              }}>
                Advanced GPS mapping and boundary survey tools (Coming Soon)
              </p>
              <div style={{
                backgroundColor: "#94a3b8",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "500",
                display: "inline-block"
              }}>
                Coming Soon
              </div>
            </div>

            {/* Document Review Card */}
            <div className="card-hover" style={{
              backgroundColor: "white",
              borderRadius: "16px",
              border: "2px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              padding: "28px",
              textAlign: "center",
              position: "relative",
              opacity: 0.7
            }}>
              <div style={{
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "4px",
                backgroundColor: "#94a3b8"
              }} />
              <div style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#f1f5f9",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                fontSize: "28px",
                border: "2px solid #e2e8f0"
              }}>
                📄
              </div>
              <h4 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#64748b",
                margin: "0 0 12px 0"
              }}>
                Document Review
              </h4>
              <p style={{
                fontSize: "14px",
                color: "#94a3b8",
                margin: "0 0 20px 0",
                lineHeight: "1.5"
              }}>
                Review and validate submitted claims and documentation
              </p>
              <div style={{
                backgroundColor: "#94a3b8",
                color: "white",
                padding: "12px 24px",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "500",
                display: "inline-block"
              }}>
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* System Status & Information */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "24px"
        }}>
          {/* System Health */}
          <div className="card-hover" style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            padding: "28px"
          }}>
            <div style={{ marginBottom: "20px" }}>
              <h4 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1e293b",
                margin: "0 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <span style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px"
                }}>
                  ⚡
                </span>
                System Status
              </h4>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px"
              }}>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#475569" }}>
                  Network Connection
                </span>
                <StatusIndicator isOnline={isOnline} />
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px"
              }}>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#475569" }}>
                  Storage Available
                </span>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 12px",
                  backgroundColor: "#f0fdf4",
                  color: "#15803d",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "1px solid #bbf7d0"
                }}>
                  <div style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#15803d",
                    borderRadius: "50%"
                  }} />
                  98% Free
                </div>
              </div>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                backgroundColor: "#f8fafc",
                borderRadius: "10px"
              }}>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#475569" }}>
                  Last Data Sync
                </span>
                <span style={{
                  fontSize: "14px",
                  color: isOnline ? "#15803d" : "#64748b",
                  fontWeight: "500"
                }}>
                  {isOnline ? "Just now" : "Waiting for connection"}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-hover" style={{
            backgroundColor: "white",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            padding: "28px"
          }}>
            <h4 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#1e293b",
              margin: "0 0 20px 0",
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <span style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#fef3c7",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                📋
              </span>
              Recent Activity
            </h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { time: "2 mins ago", action: "Claim #FRA-2024-047 registered successfully", type: "success" },
                { time: "15 mins ago", action: "Document verification completed", type: "info" },
                { time: "1 hour ago", action: "GPS coordinates captured for plot survey", type: "info" },
                { time: "2 hours ago", action: "Biometric data processed", type: "success" }
              ].map((activity, index) => (
                <div key={index} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: "#fafafa",
                  borderRadius: "10px",
                  borderLeft: `3px solid ${activity.type === 'success' ? '#10b981' : '#3b82f6'}`
                }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: activity.type === 'success' ? '#10b981' : '#3b82f6',
                    borderRadius: "50%",
                    marginTop: "6px",
                    flexShrink: 0
                  }} />
                  <div>
                    <div style={{
                      fontSize: "14px",
                      color: "#1e293b",
                      fontWeight: "500",
                      marginBottom: "2px"
                    }}>
                      {activity.action}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#64748b"
                    }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}