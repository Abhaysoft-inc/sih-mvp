"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  MdPerson,
  MdDocumentScanner,
  MdFingerprint,
  MdAttachFile,
  MdCheck,
  MdClose,
  MdArrowBack,
  MdArrowForward,
  MdUpload,
  MdCamera,
  MdVerified,
  MdDescription,
  MdPersonPin,
  MdHome,
  MdPhone,
  MdEmail,
  MdLocationOn
} from "react-icons/md"

export default function NewRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanStatus, setScanStatus] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [biometricProgress, setBiometricProgress] = useState(0)
  const [biometricStatus, setBiometricStatus] = useState('')
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
    setScanProgress(0)
    setScanStatus('Initializing camera...')

    try {
      // Step 1: Initialize camera
      await new Promise(resolve => setTimeout(resolve, 800))
      setScanProgress(20)
      setScanStatus('Camera ready. Position document...')

      // Step 2: Document detection
      await new Promise(resolve => setTimeout(resolve, 1200))
      setScanProgress(40)
      setScanStatus('Document detected. Capturing image...')

      // Step 3: Capture image
      await new Promise(resolve => setTimeout(resolve, 800))
      setScanProgress(60)
      setScanStatus('Image captured. Processing...')

      const mockImageData = "data:image/jpeg;base64,mock_image_data"

      // Step 4: OCR Processing
      await new Promise(resolve => setTimeout(resolve, 1500))
      setScanProgress(80)
      setScanStatus('Extracting text from document...')

      // Step 5: Data extraction complete
      await new Promise(resolve => setTimeout(resolve, 800))
      setScanProgress(100)
      setScanStatus('Document scan complete!')

      const ocr = {
        name: "राम कुमार शर्मा",
        fatherName: "श्री मोहन लाल शर्मा",
        address: "ग्राम - रामपुर, तहसील - सदर, जिला - भोपाल",
        documentNumber: "ABCD1234567890",
        dateOfBirth: "15/08/1985"
      }

      const newDocument = {
        type: "identity",
        imageData: mockImageData,
        ocrData: ocr,
        timestamp: new Date().toISOString()
      }

      updateFormData({
        documents: [...(formData.documents || []), newDocument],
        applicantName: ocr.name
      })
      setOcrData(ocr)

    } catch (error) {
      console.error("Document scan failed:", error)
      setScanStatus('Scan failed. Please try again.')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setScanProgress(0)
        setScanStatus('')
      }, 1000)
    }
  }

  const handleBiometricCapture = async (type) => {
    setLoading(true)
    setBiometricProgress(0)

    try {
      if (type === 'photo') {
        setBiometricStatus('Initializing camera for photo capture...')
        await new Promise(resolve => setTimeout(resolve, 800))
        setBiometricProgress(25)

        setBiometricStatus('Please look at the camera...')
        await new Promise(resolve => setTimeout(resolve, 1200))
        setBiometricProgress(50)

        setBiometricStatus('Analyzing face position...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        setBiometricProgress(75)

        setBiometricStatus('Photo captured successfully!')
        await new Promise(resolve => setTimeout(resolve, 500))
        setBiometricProgress(100)

      } else if (type === 'thumbprint') {
        setBiometricStatus('Initializing fingerprint scanner...')
        await new Promise(resolve => setTimeout(resolve, 800))
        setBiometricProgress(20)

        setBiometricStatus('Place thumb on scanner...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        setBiometricProgress(40)

        setBiometricStatus('Scanning fingerprint ridges...')
        await new Promise(resolve => setTimeout(resolve, 1200))
        setBiometricProgress(70)

        setBiometricStatus('Processing biometric data...')
        await new Promise(resolve => setTimeout(resolve, 800))
        setBiometricProgress(90)

        setBiometricStatus('Fingerprint captured successfully!')
        await new Promise(resolve => setTimeout(resolve, 500))
        setBiometricProgress(100)
      }

      const mockBiometricData = `data:image/jpeg;base64,mock_${type}_data_${Date.now()}`

      updateFormData({
        biometrics: {
          ...formData.biometrics,
          [type]: mockBiometricData,
          [`${type}_timestamp`]: new Date().toISOString()
        }
      })

    } catch (error) {
      console.error("Biometric capture failed:", error)
      setBiometricStatus(`${type} capture failed. Please try again.`)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setBiometricProgress(0)
        setBiometricStatus('')
      }, 1500)
    }
  }

  const handleFileUpload = async (file) => {
    setLoading(true)
    setUploadProgress(0)
    setScanStatus('Preparing file upload...')

    try {
      // Simulate file validation
      await new Promise(resolve => setTimeout(resolve, 500))
      setUploadProgress(10)
      setScanStatus('Validating file format...')

      // Simulate upload chunks
      for (let i = 1; i <= 8; i++) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploadProgress(10 + (i * 10))
        setScanStatus(`Uploading... ${10 + (i * 10)}%`)
      }

      // Simulate server processing
      await new Promise(resolve => setTimeout(resolve, 800))
      setUploadProgress(95)
      setScanStatus('Processing uploaded document...')

      await new Promise(resolve => setTimeout(resolve, 500))
      setUploadProgress(100)
      setScanStatus('Upload complete!')

      const newDocument = {
        type: file.type.includes('image') ? 'photo' : 'document',
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        mockData: `uploaded_${Date.now()}`
      }

      updateFormData({
        documents: [...(formData.documents || []), newDocument]
      })

    } catch (error) {
      console.error("Upload failed:", error)
      setScanStatus('Upload failed. Please try again.')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setUploadProgress(0)
        setScanStatus('')
      }, 1000)
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
          <div className="flex flex-col gap-8">
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <MdPerson className="text-xl" />
                  </div>
                  Personal Information
                </h3>
                <p className="text-gray-600 mt-2 ml-16">Please provide your basic details for the FRA claim application</p>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdPersonPin className="text-blue-600" />
                    Full Name *
                  </label>
                  <input
                    value={formData.applicantName}
                    onChange={(e) => updateFormData({ applicantName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdPhone className="text-green-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.applicantPhone}
                    onChange={(e) => updateFormData({ applicantPhone: e.target.value })}
                    placeholder="Enter your phone number"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdEmail className="text-purple-600" />
                    Email Address
                    <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.applicantEmail}
                    onChange={(e) => updateFormData({ applicantEmail: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Land Area */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdHome className="text-orange-600" />
                    Land Area *
                    <span className="text-gray-500 font-normal">(in acres)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.landArea}
                    onChange={(e) => updateFormData({ landArea: e.target.value })}
                    placeholder="Enter land area"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {/* Land Location */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MdLocationOn className="text-red-600" />
                    Land Location *
                  </label>
                  <input
                    value={formData.landLocation}
                    onChange={(e) => updateFormData({ landLocation: e.target.value })}
                    placeholder="Village, Tehsil, District (e.g., Rampur, Sadar, Bhopal)"
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-0 transition-colors duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-blue-50/50 border-t border-blue-100 px-8 py-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MdVerified className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Required Information</p>
                    <p className="text-xs text-blue-600 mt-1">Fields marked with * are mandatory for processing your FRA claim application.</p>
                  </div>
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
                  <MdDocumentScanner style={{ color: "#3b82f6" }} />
                  Document Scanning & OCR
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
                    <div style={{ fontSize: "4rem", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                      <MdCamera style={{ color: "#3b82f6" }} />
                    </div>
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
                  <MdFingerprint style={{ color: "#10b981" }} />
                  Identity Verification
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
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
                      <MdCamera style={{ color: "#10b981" }} />
                    </div>
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
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
                      <MdFingerprint style={{ color: "#8b5cf6" }} />
                    </div>
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
                  <MdAttachFile style={{ color: "#f59e0b" }} />
                  Supporting Documents
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
                    <div style={{ fontSize: "3rem", marginBottom: "0.5rem", display: "flex", justifyContent: "center" }}>
                      <MdUpload style={{ color: "#f59e0b" }} />
                    </div>
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
                  <MdCheck style={{ color: "#059669" }} />
                  Review & Submit
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
                        {formData.documents?.length ?
                          <MdCheck style={{ color: "#059669", fontSize: "1rem" }} /> :
                          <MdClose style={{ color: "#dc2626", fontSize: "1rem" }} />
                        }
                        <span style={{ fontSize: "0.875rem" }}>Document Scanned</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {formData.biometrics?.photo ?
                          <MdCheck style={{ color: "#059669", fontSize: "1rem" }} /> :
                          <MdClose style={{ color: "#dc2626", fontSize: "1rem" }} />
                        }
                        <span style={{ fontSize: "0.875rem" }}>Photo Captured</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        {formData.biometrics?.thumbprint ?
                          <MdCheck style={{ color: "#059669", fontSize: "1rem" }} /> :
                          <MdClose style={{ color: "#dc2626", fontSize: "1rem" }} />
                        }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header with Progress */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/20 sticky top-0 z-10 rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                <MdPersonPin className="text-sm" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">FRA Registration</h1>
              </div>
            </div>
            <div className="text-xs text-gray-600 font-medium">
              Step {currentStep} / {steps.length}
            </div>
          </div>

          {/* Compact Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>

          {/* Mini Step Indicators */}
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${currentStep >= step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500'
                  }`}>
                  {currentStep > step.id ? <MdCheck className="text-xs" /> : step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="pb-24">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl">
          <div className="max-w-4xl mx-auto flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="w-32 md:w-40 h-10 bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 font-medium text-sm text-gray-700 hover:border-gray-400 shadow-md"
              >
                <MdArrowBack className="text-base" />
                Previous
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className={`flex-1 max-w-xs h-10 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${!canProceed()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer hover:shadow-lg'
                  }`}
              >
                Next
                <MdArrowForward className="text-base" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !canProceed()}
                className={`flex-1 max-w-xs h-10 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${loading || !canProceed()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white cursor-pointer hover:shadow-lg'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <MdCheck className="text-base" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
