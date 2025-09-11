"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [surveyorId, setSurveyorId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (surveyorId === "surveyor123" && password === "password") {
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)",
      padding: "24px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "480px"
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e2e8f0",
          overflow: "hidden"
        }}>
          {/* Header Section */}
          <div style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            padding: "40px 32px",
            textAlign: "center",
            color: "white"
          }}>
            <div style={{
              margin: "0 auto 20px auto",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              padding: "16px",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ 
                fontSize: "32px"
              }}>👤</div>
            </div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              margin: "0 0 8px 0",
              letterSpacing: "-0.025em"
            }}>
              Surveyor Field Login
            </h1>
            <p style={{
              fontSize: "16px",
              margin: "0",
              opacity: 0.9
            }}>
              Sign in to access FRA Claims Registration
            </p>
          </div>
          
          {/* Form Section */}
          <div style={{ padding: "40px 32px" }}>
            <form onSubmit={handleLogin}>
              {error && (
                <div style={{
                  backgroundColor: "#fef2f2",
                  border: "2px solid #fecaca",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    fontSize: "20px"
                  }}>⚠️</div>
                  <p style={{ 
                    color: "#dc2626", 
                    fontSize: "14px", 
                    margin: "0",
                    fontWeight: "500"
                  }}>
                    {error}
                  </p>
                </div>
              )}
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "24px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Surveyor ID
                  </label>
                  <input
                    type="text"
                    value={surveyorId}
                    onChange={(e) => setSurveyorId(e.target.value)}
                    placeholder="Enter your surveyor ID"
                    required
                    style={{
                      width: "100%",
                      height: "56px",
                      padding: "16px 20px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      backgroundColor: "#f8fafc",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: "100%",
                      height: "56px",
                      padding: "16px 20px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      fontSize: "16px",
                      outline: "none",
                      transition: "all 0.2s ease",
                      backgroundColor: "#f8fafc",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    height: "56px",
                    background: loading ? "#94a3b8" : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    transition: "all 0.2s ease",
                    boxShadow: loading ? "none" : "0 4px 15px rgba(59, 130, 246, 0.3)"
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                      }} />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "20px" }}>🔐</span>
                      Sign In
                    </>
                  )}
                </button>
              </div>
            </form>
            
            {/* Demo Credentials */}
            <div style={{
              marginTop: "32px",
              padding: "20px",
              backgroundColor: "#f1f5f9",
              borderRadius: "12px",
              border: "1px solid #e2e8f0"
            }}>
              <div style={{
                fontSize: "12px",
                color: "#64748b",
                textAlign: "center",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}>
                <span style={{ fontSize: "14px" }}>ℹ️</span>
                Demo credentials: surveyor123 / password
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
