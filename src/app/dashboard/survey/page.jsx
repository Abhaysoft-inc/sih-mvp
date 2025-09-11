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
      gap: "6px",
      padding: "6px 12px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "500",
      backgroundColor: isOnline ? "#d4edda" : "#f8d7da",
      color: isOnline ? "#155724" : "#721c24",
      border: `1px solid ${isOnline ? "#c3e6cb" : "#f5c6cb"}`
    }}>
      <div style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        backgroundColor: isOnline ? "#28a745" : "#dc3545"
      }} />
      <span>{isOnline ? "Online" : "Offline"}</span>
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
          maxWidth: "1200px",
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
              backgroundColor: "#007bff",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              color: "white"
            }}>
              📊
            </div>
            <div>
              <h1 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#333",
                margin: "0",
                lineHeight: "1.2"
              }}>
                Survey Dashboard
              </h1>
              <div style={{
                color: "#666",
                fontSize: "13px",
                marginTop: "1px"
              }}>
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ 
              fontSize: "13px", 
              color: "#666",
              fontWeight: "500"
            }}>
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
            <StatusIndicator isOnline={isOnline} />
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px"
      }}>
        {/* Primary Action Section */}
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
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div>
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
                margin: "0 0 6px 0"
              }}>
                New Survey Registration
              </h2>
              <p style={{
                color: "#666",
                margin: "0",
                fontSize: "14px"
              }}>
                Document a new FRA claim with streamlined registration process
              </p>
            </div>
            <Link href="/register/new" style={{ textDecoration: "none" }}>
              <button style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span>+</span>
                Start New Registration
              </button>
            </Link>
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={{ marginBottom: "12px" }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            margin: "0"
          }}>
            Today's Performance
          </h3>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {/* Today's Submissions */}
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
                  Claims Submitted Today
                </div>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1"
                }}>
                  {stats.todaySubmissions}
                </div>
              </div>
              <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#e8f5e8",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                📈
              </div>
            </div>
            <div style={{
              fontSize: "12px",
              color: "#28a745",
              fontWeight: "500"
            }}>
              ✓ Successfully processed and verified
            </div>
          </div>

          {/* Sync Status */}
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
                  Data Synchronization
                </div>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1"
                }}>
                  {stats.pendingSync}
                </div>
              </div>
              <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: stats.pendingSync === 0 ? "#e8f4fd" : "#fff3cd",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                {stats.pendingSync === 0 ? "✅" : "⏳"}
              </div>
            </div>
            <div style={{
              fontSize: "12px",
              color: stats.pendingSync === 0 ? "#007bff" : "#856404",
              fontWeight: "500"
            }}>
              {stats.pendingSync === 0 ? "✓ All data synchronized" : "⚠ Items waiting to sync"}
            </div>
          </div>

          {/* Total Progress */}
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
                  Total Claims Registered
                </div>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#333",
                  lineHeight: "1"
                }}>
                  {stats.totalClaims}
                </div>
              </div>
              <div style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#f3e8ff",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                📊
              </div>
            </div>
            <div style={{
              fontSize: "12px",
              color: "#6f42c1",
              fontWeight: "500"
            }}>
              ✓ {stats.completionRate}% completion rate
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 12px 0"
          }}>
            Quick Actions
          </h3>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px"
          }}>
            {/* New Registration Card */}
            <Link href="/register/new" style={{ textDecoration: "none" }}>
              <div style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "20px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                transition: "box-shadow 0.2s ease"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  fontSize: "20px"
                }}>
                  📝
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0 0 8px 0"
                }}>
                  New FRA Claim Registration
                </h4>
                <p style={{
                  fontSize: "14px",
                  color: "#666",
                  margin: "0 0 12px 0",
                  lineHeight: "1.4"
                }}>
                  Document a new Forest Rights Act claim with guided step-by-step process
                </p>
                <div style={{
                  color: "#007bff",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  Start Registration →
                </div>
              </div>
            </Link>
            
            {/* GPS Survey Card */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "20px",
              textAlign: "left",
              opacity: 0.6,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "20px"
              }}>
                🗺️
              </div>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#666",
                margin: "0 0 8px 0"
              }}>
                GPS Land Survey
              </h4>
              <p style={{
                fontSize: "14px",
                color: "#999",
                margin: "0 0 12px 0",
                lineHeight: "1.4"
              }}>
                Advanced GPS mapping and boundary survey tools
              </p>
              <div style={{
                color: "#999",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Coming Soon
              </div>
            </div>

            {/* Document Review Card */}
            <div style={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "20px",
              textAlign: "left",
              opacity: 0.6,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "20px"
              }}>
                📄
              </div>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#666",
                margin: "0 0 8px 0"
              }}>
                Document Review
              </h4>
              <p style={{
                fontSize: "14px",
                color: "#999",
                margin: "0 0 12px 0",
                lineHeight: "1.4"
              }}>
                Review and validate submitted claims and documentation
              </p>
              <div style={{
                color: "#999",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: "24px" }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            margin: "0 0 12px 0"
          }}>
            Recent Activity
          </h3>
          
          <div style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            {[
              { time: "2 mins ago", action: "Claim #FRA-2024-047 registered successfully", status: "success" },
              { time: "15 mins ago", action: "Document verification completed", status: "info" },
              { time: "1 hour ago", action: "GPS coordinates captured for plot survey", status: "info" },
              { time: "2 hours ago", action: "Biometric data processed", status: "success" }
            ].map((activity, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderBottom: index < 3 ? "1px solid #eee" : "none"
              }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: activity.status === 'success' ? '#28a745' : '#007bff',
                  borderRadius: "50%",
                  flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "14px",
                    color: "#333",
                    fontWeight: "500"
                  }}>
                    {activity.action}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#666",
                    marginTop: "2px"
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
  )
}