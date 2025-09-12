"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MainDashboard() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to tehsil page immediately
    router.push('/dashboard/tehsil')
  }, [router])
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{
          maxWidth: "64rem",
          margin: "0 auto",
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <h1 style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 0.25rem 0"
            }}>
              FRA Claims Dashboard
            </h1>
            <p style={{
              color: "#6b7280",
              margin: "0"
            }}>
              Select your module to continue
            </p>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: "64rem",
        margin: "0 auto",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        {/* Welcome Section */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          textAlign: "center"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            margin: "0 0 1rem 0"
          }}>
            Welcome to FRA Claims Management System
          </h2>
          <p style={{
            color: "#6b7280",
            margin: "0 0 2rem 0",
            fontSize: "1.1rem"
          }}>
            Choose your role to access the appropriate tools and features
          </p>
        </div>

        {/* Module Selection */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          {/* Survey Module */}
          <Link href="/dashboard/survey" style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "2px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",
              ":hover": {
                borderColor: "#3b82f6",
                boxShadow: "0 4px 12px 0 rgba(59, 130, 246, 0.15)"
              }
            }}>
              <div style={{
                fontSize: "3rem",
                margin: "0 0 1rem 0"
              }}>📋</div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                margin: "0 0 0.5rem 0",
                color: "#111827"
              }}>
                Survey Module
              </h3>
              <p style={{
                color: "#6b7280",
                margin: "0 0 1rem 0"
              }}>
                Field survey tools for claim registration and documentation
              </p>
              <div style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                display: "inline-block"
              }}>
                Access Survey Dashboard →
              </div>
            </div>
          </Link>


          {/* DSS Module */}
          <Link href="/dss" style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "2px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}>
              <div style={{
                fontSize: "3rem",
                margin: "0 0 1rem 0"
              }}>🧠</div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                margin: "0 0 0.5rem 0",
                color: "#111827"
              }}>
                Decision Support System
              </h3>
              <p style={{
                color: "#6b7280",
                margin: "0 0 1rem 0"
              }}>
                AI-powered scheme optimization and policy interventions
              </p>
              <div style={{
                backgroundColor: "#16a34a",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                display: "inline-block"
              }}>
                Access DSS →
              </div>
            </div>
          </Link>


          {/* Tehsil Module */}
          <Link href="/dashboard/tehsil" style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "2px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              opacity: 0.7
            }}>
              <div style={{
                fontSize: "3rem",
                margin: "0 0 1rem 0"
              }}>🏢</div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                margin: "0 0 0.5rem 0",
                color: "#111827"
              }}>
                Tehsil Module
              </h3>
              <p style={{
                color: "#6b7280",
                margin: "0 0 1rem 0"
              }}>
                Administrative tools for tehsil-level management
              </p>
              <div style={{
                backgroundColor: "#6b7280",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                display: "inline-block"
              }}>
                Coming Soon
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          padding: "1.5rem"
        }}>
          <h3 style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            margin: "0 0 1rem 0"
          }}>
            System Overview
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#3b82f6"
              }}>7</div>
              <p style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                margin: "0"
              }}>Claims Today</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#16a34a"
              }}>✓</div>
              <p style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                margin: "0"
              }}>System Online</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#ea580c"
              }}>0</div>
              <p style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                margin: "0"
              }}>Pending Sync</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
