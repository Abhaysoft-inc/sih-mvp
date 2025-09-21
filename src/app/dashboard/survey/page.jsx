"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MdBarChart,
  MdSync,
  MdAssignment,
  MdMap,
  MdCheckCircle,
  MdPending,
  MdFileCopy,
  MdDashboard,
  MdTrendingUp,
  MdCloudDone,
  MdSchedule,
  MdPersonAdd,
  MdLocationOn,
  MdDescription,
  MdNotifications,
  MdSettings,
  MdRefresh,
  MdApps,
  MdAccountCircle
} from "react-icons/md"

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
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    }}>
      {/* Professional Header - matching tehsil page */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#334155",
        borderBottom: "1px solid #475569",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white"
          }}>
            <MdApps />
          </div>
          <div>
            <div style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "white"
            }}>
             VanAdhikar Survey Dashboard
            </div>
            <div style={{
              fontSize: "12px",
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <MdSchedule style={{ fontSize: "12px" }} />
              Sep 20
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            fontSize: "12px",
            color: "#cbd5e1",
            fontWeight: "500"
          }}>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} PM
          </div>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "500",
            backgroundColor: isOnline ? "#22c55e" : "#ef4444",
            color: "white"
          }}>
            ● Online
          </span>
        </div>
      </div>

      <div style={{
        padding: "20px 24px",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* New Survey Registration Section */}
        <div style={{
          backgroundColor: "#e0f2fe",
          border: "1px solid #0284c7",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px"
            }}>
              <MdPersonAdd style={{ color: "#0284c7", fontSize: "20px" }} />
              <h2 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151",
                margin: 0
              }}>
                New Survey Registration
              </h2>
            </div>
            <p style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: "0 0 8px 0"
            }}>
              Document a new FRA claim with our streamlined, guided registration process
            </p>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "12px",
              color: "#6b7280"
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MdLocationOn style={{ color: "#0284c7" }} /> GPS Enabled
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <MdDescription style={{ color: "#16a34a" }} /> Document Upload
              </span>
            </div>
          </div>
          <Link href="/register/new">
            <button style={{
              backgroundColor: "#0284c7",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <MdAssignment />
              Start New Registration
            </button>
          </Link>
        </div>

        {/* Today's Performance Section */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px"
        }}>
          <h3 style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#374151",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <MdTrendingUp style={{ color: "#0284c7" }} />
            Today's Performance
          </h3>
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: "#6b7280",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer"
          }}>
            <MdRefresh />
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {/* Claims Submitted Today */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize: "12px",
              color: "#6b7280",
              fontWeight: "500",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              CLAIMS SUBMITTED TODAY
            </div>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#374151",
              marginBottom: "8px"
            }}>
              {stats.todaySubmissions}
            </div>
            <div style={{
              fontSize: "12px",
              color: "#16a34a",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <MdCheckCircle />
              Successfully processed
            </div>
            <div style={{
              width: "100%",
              height: "4px",
              backgroundColor: "#f3f4f6",
              borderRadius: "2px",
              marginTop: "12px"
            }}>
              <div style={{
                width: "85%",
                height: "100%",
                backgroundColor: "#16a34a",
                borderRadius: "2px"
              }}></div>
            </div>
          </div>

          {/* Data Synchronization */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize: "12px",
              color: "#6b7280",
              fontWeight: "500",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              DATA SYNCHRONIZATION
            </div>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#374151",
              marginBottom: "8px"
            }}>
              {stats.pendingSync}
            </div>
            <div style={{
              fontSize: "12px",
              color: "#0284c7",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <MdCloudDone />
              All synchronized
            </div>
            <div style={{
              width: "100%",
              height: "4px",
              backgroundColor: "#f3f4f6",
              borderRadius: "2px",
              marginTop: "12px"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#0284c7",
                borderRadius: "2px"
              }}></div>
            </div>
          </div>

          {/* Total Claims Registered */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize: "12px",
              color: "#6b7280",
              fontWeight: "500",
              textTransform: "uppercase",
              marginBottom: "8px"
            }}>
              TOTAL CLAIMS REGISTERED
            </div>
            <div style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#374151",
              marginBottom: "8px"
            }}>
              {stats.totalClaims}
            </div>
            <div style={{
              fontSize: "12px",
              color: "#7c3aed",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <MdCheckCircle />
              {stats.completionRate}% completion rate
            </div>
            <div style={{
              width: "100%",
              height: "4px",
              backgroundColor: "#f3f4f6",
              borderRadius: "2px",
              marginTop: "12px"
            }}>
              <div style={{
                width: `${stats.completionRate}%`,
                height: "100%",
                backgroundColor: "#7c3aed",
                borderRadius: "2px"
              }}></div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <h3 style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#374151",
          margin: "0 0 16px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <MdDashboard style={{ color: "#0284c7" }} />
          Quick Actions
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "24px"
        }}>
          {/* New FRA Claim Registration */}
          <Link href="/register/new" style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              cursor: "pointer"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <MdPersonAdd style={{ color: "#0284c7", fontSize: "24px" }} />
              </div>
              <h4 style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#374151",
                margin: "0 0 8px 0"
              }}>
                New FRA Claim Registration
              </h4>
              <p style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: "0 0 16px 0",
                lineHeight: "1.4"
              }}>
                Document a new Forest Rights Act claim with guided step-by-step process
              </p>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{
                  color: "#0284c7",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  Start Registration →
                </span>
                <div style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#16a34a",
                  borderRadius: "50%"
                }}></div>
              </div>
            </div>
          </Link>

          {/* GPS Land Survey */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            opacity: 0.6
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <MdLocationOn style={{ color: "#9ca3af", fontSize: "24px" }} />
            </div>
            <h4 style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#9ca3af",
              margin: "0 0 8px 0"
            }}>
              GPS Land Survey
            </h4>
            <p style={{
              fontSize: "14px",
              color: "#9ca3af",
              margin: "0 0 16px 0",
              lineHeight: "1.4"
            }}>
              Advanced GPS mapping and boundary survey tools for precise measurements
            </p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{
                color: "#9ca3af",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Coming Soon
              </span>
              <div style={{
                padding: "2px 8px",
                backgroundColor: "#f3f4f6",
                color: "#6b7280",
                fontSize: "12px",
                borderRadius: "12px"
              }}>
                Beta
              </div>
            </div>
          </div>

          {/* Document Review */}
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            opacity: 0.6
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px"
            }}>
              <MdDescription style={{ color: "#9ca3af", fontSize: "24px" }} />
            </div>
            <h4 style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#9ca3af",
              margin: "0 0 8px 0"
            }}>
              Document Review
            </h4>
            <p style={{
              fontSize: "14px",
              color: "#9ca3af",
              margin: "0 0 16px 0",
              lineHeight: "1.4"
            }}>
              Review and validate submitted claims and documentation with AI assistance
            </p>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{
                color: "#9ca3af",
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Coming Soon
              </span>
              <div style={{
                padding: "2px 8px",
                backgroundColor: "#f3f4f6",
                color: "#6b7280",
                fontSize: "12px",
                borderRadius: "12px"
              }}>
                AI
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <h3 style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#374151",
          margin: "0 0 16px 0",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <MdNotifications style={{ color: "#7c3aed" }} />
          Recent Activity
        </h3>

        <div style={{
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          {[
            { time: "2 mins ago", action: "Claim #FRA-2024-047 registered successfully", status: "Completed", color: "#16a34a" },
            { time: "15 mins ago", action: "Document verification completed", status: "Processing", color: "#0284c7" },
            { time: "1 hour ago", action: "GPS coordinates captured for plot survey", status: "Processing", color: "#7c3aed" },
            { time: "2 hours ago", action: "Biometric data processed", status: "Completed", color: "#16a34a" }
          ].map((activity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 20px",
                borderBottom: index < 3 ? "1px solid #f3f4f6" : "none"
              }}
            >
              <div style={{
                width: "4px",
                height: "40px",
                backgroundColor: activity.color,
                borderRadius: "2px"
              }}></div>
              <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: activity.color,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdCheckCircle style={{ color: "white", fontSize: "16px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "500",
                  marginBottom: "4px"
                }}>
                  {activity.action}
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "#6b7280"
                }}>
                  {activity.time}
                </div>
              </div>
              <div style={{
                padding: "4px 12px",
                backgroundColor: activity.status === "Completed" ? "#dcfce7" : "#dbeafe",
                color: activity.status === "Completed" ? "#166534" : "#1e40af",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "12px"
              }}>
                {activity.status}
              </div>
            </div>
          ))}
          <div style={{
            padding: "16px",
            textAlign: "center",
            borderTop: "1px solid #f3f4f6",
            backgroundColor: "#f9fafb"
          }}>
            <button style={{
              color: "#0284c7",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              margin: "0 auto"
            }}>
              View All Activities
              <MdRefresh style={{ fontSize: "14px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}