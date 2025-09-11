"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantPhone: "",
    applicantEmail: "",
    landArea: "",
    landLocation: "",
    documents: [],
    biometrics: {},
    status: 'draft'
  })
  const [ocrData, setOcrData] = useState(null)
  
  const router = useRouter()

  const steps = [
    { id: 1, title: "Applicant Details" },
    { id: 2, title: "Document Scan" },
    { id: 3, title: "Identity Verification" },
    { id: 4, title: "Supporting Documents" },
    { id: 5, title: "Review & Submit" },
  ]

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleDocumentScan = async () => {
    setLoading(true)
    try {
      // Simulate document scanning
      await new Promise(resolve => setTimeout(resolve, 1000))
      const mockImageData = "data:image/jpeg;base64,mock_image_data"
      
      const newDocument = {
        type: "identity",
        imageData: mockImageData
      }
      
      updateFormData({
        documents: [...(formData.documents || []), newDocument]
      })
      
      // Simulate OCR extraction
      await new Promise(resolve => setTimeout(resolve, 1500))
      const ocr = {
        name: "राम कुमार शर्मा",
        fatherName: "श्री मोहन लाल शर्मा",
        address: "ग्राम - रामपुर, तहसील - सदर, जिला - भोपाल",
        documentNumber: "ABCD1234567890",
        dateOfBirth: "15/08/1985"
      }
      setOcrData(ocr)
      updateFormData({
        applicantName: ocr.name
      })
      
    } catch (error) {
      console.error("Document scan failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBiometricCapture = async (type) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockBiometricData = "data:image/jpeg;base64,mock_biometric_data"
      
      updateFormData({
        biometrics: {
          ...formData.biometrics,
          [type]: mockBiometricData
        }
      })
    } catch (error) {
      console.error("Biometric capture failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, just redirect back to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error("Submit failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}>
              <div style={{ 
                padding: "24px 32px 20px 32px",
                borderBottom: "1px solid #f1f5f9"
              }}>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#1e293b"
                }}>
                  <span style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#eff6ff",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    👤
                  </span>
                  Applicant Information
                </h3>
              </div>
              <div style={{
                padding: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151"
                  }}>
                    Full Name *
                  </label>
                  <input
                    value={formData.applicantName}
                    onChange={(e) => updateFormData({ applicantName: e.target.value })}
                    placeholder="Enter applicant's full name"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151"
                  }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.applicantPhone}
                    onChange={(e) => updateFormData({ applicantPhone: e.target.value })}
                    placeholder="Enter phone number"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151"
                  }}>
                    Email Address
                    <span style={{ color: "#64748b", fontWeight: "400" }}> (Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.applicantEmail}
                    onChange={(e) => updateFormData({ applicantEmail: e.target.value })}
                    placeholder="Enter email address"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151"
                  }}>
                    Land Area *
                    <span style={{ color: "#64748b", fontWeight: "400" }}> (in acres)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landArea}
                    onChange={(e) => updateFormData({ landArea: e.target.value })}
                    placeholder="Enter land area"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#374151"
                  }}>
                    Land Location *
                  </label>
                  <input
                    value={formData.landLocation}
                    onChange={(e) => updateFormData({ landLocation: e.target.value })}
                    placeholder="Village, Tehsil, District (e.g., Rampur, Sadar, Bhopal)"
                    style={{
                      width: "100%",
                      height: "48px",
                      padding: "12px 16px",
                      border: "2px solid #e2e8f0",
                      borderRadius: "10px",
                      fontSize: "15px",
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                    onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  📄 Document Scanning & OCR
                </h3>
              </div>
              <div style={{
                padding: "0 1.5rem 1.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem"
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "0.75rem",
                    padding: "2rem",
                    marginBottom: "1rem"
                  }}>
                    <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📷</div>
                    <p style={{ color: "#6b7280", marginBottom: "1rem", margin: "0 0 1rem 0" }}>
                      Position document in camera view
                    </p>
                    <button 
                      onClick={handleDocumentScan} 
                      disabled={loading}
                      style={{
                        width: "100%",
                        height: "3rem",
                        backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        fontWeight: "500",
                        cursor: loading ? "not-allowed" : "pointer"
                      }}
                    >
                      {loading ? "Scanning..." : "Scan Document"}
                    </button>
                  </div>
                </div>
                
                {ocrData && (
                  <div style={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "0.75rem",
                    padding: "1rem"
                  }}>
                    <h4 style={{
                      fontWeight: "600",
                      color: "#166534",
                      marginBottom: "0.5rem",
                      margin: "0 0 0.5rem 0"
                    }}>
                      Extracted Information:
                    </h4>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      fontSize: "0.875rem"
                    }}>
                      <p style={{ margin: "0" }}><strong>Name:</strong> {ocrData.name}</p>
                      <p style={{ margin: "0" }}><strong>Father's Name:</strong> {ocrData.fatherName}</p>
                      <p style={{ margin: "0" }}><strong>Address:</strong> {ocrData.address}</p>
                      <p style={{ margin: "0" }}><strong>Document Number:</strong> {ocrData.documentNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  📷 Identity Verification
                </h3>
              </div>
              <div style={{
                padding: "0 1.5rem 1.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem"
              }}>
                <div>
                  <h4 style={{ fontWeight: "600", marginBottom: "0.75rem", margin: "0 0 0.75rem 0" }}>
                    Live Photo Capture
                  </h4>
                  <div style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📷</div>
                    <button 
                      onClick={() => handleBiometricCapture('photo')} 
                      disabled={loading}
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        cursor: loading ? "not-allowed" : "pointer"
                      }}
                    >
                      {formData.biometrics?.photo ? "Photo Captured ✓" : "Capture Photo"}
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 style={{ fontWeight: "600", marginBottom: "0.75rem", margin: "0 0 0.75rem 0" }}>
                    Thumbprint Capture
                  </h4>
                  <div style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>👆</div>
                    <button 
                      onClick={() => handleBiometricCapture('thumbprint')} 
                      disabled={loading}
                      style={{
                        width: "100%",
                        height: "2.5rem",
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.375rem",
                        cursor: loading ? "not-allowed" : "pointer"
                      }}
                    >
                      {formData.biometrics?.thumbprint ? "Thumbprint Captured ✓" : "Capture Thumbprint"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  📤 Supporting Documents
                </h3>
              </div>
              <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <p style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    margin: "0"
                  }}>
                    Add photos of supporting documents (land records, previous permits, etc.)
                  </p>
                  
                  <div style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "0.75rem",
                    padding: "2rem",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>📤</div>
                    <button style={{
                      width: "100%",
                      height: "3rem",
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      fontSize: "1.125rem",
                      cursor: "pointer"
                    }}>
                      Add Document Photos
                    </button>
                  </div>
                  
                  <div style={{
                    fontSize: "0.875rem",
                    color: "#6b7280"
                  }}>
                    {formData.documents?.length || 0} documents uploaded
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ padding: "1.5rem 1.5rem 0.5rem 1.5rem" }}>
                <h3 style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  ✅ Review & Submit
                </h3>
              </div>
              <div style={{
                padding: "0 1.5rem 1.5rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                  <div style={{
                    backgroundColor: "#f9fafb",
                    padding: "1rem",
                    borderRadius: "0.75rem"
                  }}>
                    <h4 style={{
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      margin: "0 0 0.5rem 0"
                    }}>
                      Applicant Details
                    </h4>
                    <p style={{ margin: "0" }}><strong>Name:</strong> {formData.applicantName}</p>
                    <p style={{ margin: "0" }}><strong>Phone:</strong> {formData.applicantPhone}</p>
                    <p style={{ margin: "0" }}><strong>Land Area:</strong> {formData.landArea} acres</p>
                    <p style={{ margin: "0" }}><strong>Location:</strong> {formData.landLocation}</p>
                  </div>
                  
                  <div style={{
                    backgroundColor: "#f9fafb",
                    padding: "1rem",
                    borderRadius: "0.75rem"
                  }}>
                    <h4 style={{
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      margin: "0 0 0.5rem 0"
                    }}>
                      Verification Status
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {formData.documents?.length ? "✅" : "❌"}
                        <span style={{ fontSize: "0.875rem" }}>Document Scanned</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {formData.biometrics?.photo ? "✅" : "❌"}
                        <span style={{ fontSize: "0.875rem" }}>Photo Captured</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {formData.biometrics?.thumbprint ? "✅" : "❌"}
                        <span style={{ fontSize: "0.875rem" }}>Thumbprint Captured</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{ paddingTop: "1rem" }}>
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    style={{
                      width: "100%",
                      height: "3.5rem",
                      backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "0.375rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: loading ? "not-allowed" : "pointer"
                    }}
                  >
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.applicantName && formData.applicantPhone && formData.landArea && formData.landLocation
      case 2:
        return formData.documents?.length
      case 3:
        return formData.biometrics?.photo && formData.biometrics?.thumbprint
      case 4:
        return true // Documents are optional
      case 5:
        return true
      default:
        return false
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <div style={{
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem"
      }}>
        {/* Header with Progress */}
        <div style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 10,
          paddingBottom: "1rem",
          borderRadius: "0.75rem",
          padding: "1rem",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem"
          }}>
            <h1 style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              margin: "0"
            }}>
              New Registration
            </h1>
            <span style={{
              fontSize: "0.875rem",
              color: "#6b7280"
            }}>
              Step {currentStep} of {steps.length}
            </span>
          </div>
          
          <div style={{
            width: "100%",
            height: "0.5rem",
            backgroundColor: "#e5e7eb",
            borderRadius: "0.25rem",
            marginBottom: "1rem"
          }}>
            <div style={{
              width: `${(currentStep / steps.length) * 100}%`,
              height: "100%",
              backgroundColor: "#3b82f6",
              borderRadius: "0.25rem",
              transition: "width 0.3s ease"
            }} />
          </div>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.875rem"
          }}>
            <span style={{ fontWeight: "500" }}>
              {steps.find(s => s.id === currentStep)?.title}
            </span>
            {formData.applicantName && (
              <>
                <span style={{ color: "#9ca3af" }}>•</span>
                <span style={{ color: "#6b7280" }}>{formData.applicantName}</span>
              </>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ paddingBottom: "5rem" }}>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          padding: "1rem"
        }}>
          <div style={{
            maxWidth: "32rem",
            margin: "0 auto",
            display: "flex",
            gap: "1rem"
          }}>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{
                  flex: 1,
                  height: "2.5rem",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  cursor: "pointer"
                }}
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                style={{
                  flex: 1,
                  height: "2.5rem",
                  backgroundColor: !canProceed() ? "#9ca3af" : "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: !canProceed() ? "not-allowed" : "pointer"
                }}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
