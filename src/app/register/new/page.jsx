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
  MdVerified,
  MdDescription,
  MdPersonPin,
  MdHome,
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdCloudUpload,
  MdCheckCircle,
  MdInsertDriveFile
} from "react-icons/md"

export default function NewRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [biometricProgress, setBiometricProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
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
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState(null)
  const [showPreview, setShowPreview] = useState(false)

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

  // File upload function for document scanning
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setLoading(true)
    setUploadProgress(0)
    setUploadStatus('Preparing file for upload...')

    try {
      // Simulate upload progress
      await new Promise(resolve => setTimeout(resolve, 500))
      setUploadProgress(20)
      setUploadStatus('Uploading document...')

      for (let i = 1; i <= 6; i++) {
        await new Promise(resolve => setTimeout(resolve, 300))
        setUploadProgress(20 + (i * 10))
        setUploadStatus(`Uploading... ${20 + (i * 10)}%`)
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      setUploadProgress(90)
      setUploadStatus('Processing document...')

      await new Promise(resolve => setTimeout(resolve, 600))
      setUploadProgress(100)
      setUploadStatus('Document uploaded successfully!')

      // Mock OCR data
      const ocr = {
        name: "राम कुमार शर्मा",
        fatherName: "श्री मोहन लाल शर्मा",
        address: "ग्राम - रामपुर, तहसील - सदर, जिला - भोपाल",
        documentNumber: "ABCD1234567890",
        dateOfBirth: "15/08/1985"
      }

      const newDocument = {
        type: "identity",
        fileName: file.name,
        fileSize: file.size,
        ocrData: ocr,
        timestamp: new Date().toISOString()
      }

      setUploadedFiles([...uploadedFiles, { name: file.name, size: file.size }])
      updateFormData({
        documents: [...(formData.documents || []), newDocument],
        applicantName: ocr.name
      })
      setOcrData(ocr)

    } catch (error) {
      console.error("Upload failed:", error)
      setUploadStatus('Upload failed. Please try again.')
    } finally {
      setTimeout(() => {
        setLoading(false)
        setUploadProgress(0)
        setUploadStatus('')
      }, 1500)
    }
  }

  const handleBiometricCapture = async (type) => {
    if (type === 'photo') {
      try {
        setBiometricStatus('Requesting camera access...')
        setBiometricProgress(20)
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          } 
        })
        
        setStream(mediaStream)
        setShowCamera(true)
        setBiometricStatus('Camera ready - Position your face in the frame')
        setBiometricProgress(50)

        // Auto-capture after 3 seconds
        setTimeout(async () => {
          if (mediaStream) {
            setBiometricStatus('Capturing photo...')
            setBiometricProgress(80)
            
            // Simulate capture
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            setBiometricStatus('Photo captured successfully!')
            setBiometricProgress(100)
            
            // Stop camera
            mediaStream.getTracks().forEach(track => track.stop())
            setShowCamera(false)
            setStream(null)
            
            updateFormData({
              biometrics: {
                ...formData.biometrics,
                photo: {
                  captured: true,
                  timestamp: new Date().toISOString(),
                  quality: 'high'
                }
              }
            })
            
            setTimeout(() => {
              setBiometricProgress(0)
              setBiometricStatus('')
            }, 1500)
          }
        }, 3000)

      } catch (error) {
        console.error("Camera access failed:", error)
        setBiometricStatus('Camera access denied. Please check permissions.')
        setBiometricProgress(0)
      }
    } else if (type === 'thumbprint') {
      setLoading(true)
      setBiometricProgress(0)

      try {
        setBiometricStatus('Initializing fingerprint scanner...')
        await new Promise(resolve => setTimeout(resolve, 800))
        setBiometricProgress(20)

        setBiometricStatus('Please place your thumb on the scanner...')
        await new Promise(resolve => setTimeout(resolve, 1500))
        setBiometricProgress(50)

        setBiometricStatus('Capturing fingerprint pattern...')
        await new Promise(resolve => setTimeout(resolve, 1200))
        setBiometricProgress(80)

        setBiometricStatus('Thumbprint captured successfully!')
        await new Promise(resolve => setTimeout(resolve, 500))
        setBiometricProgress(100)

        updateFormData({
          biometrics: {
            ...formData.biometrics,
            thumbprint: {
              captured: true,
              timestamp: new Date().toISOString(),
              quality: 'high'
            }
          }
        })

      } catch (error) {
        console.error("Biometric capture failed:", error)
        setBiometricStatus('Capture failed. Please try again.')
      } finally {
        setTimeout(() => {
          setLoading(false)
          setBiometricProgress(0)
          setBiometricStatus('')
        }, 1000)
      }
    }
  }

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString('en-IN')
    const currentTime = new Date().toLocaleTimeString('en-IN')
    const claimId = `FRA-${Date.now()}`
    
    return {
      claimId,
      content: `
                          FOREST RIGHTS ACT CLAIM APPLICATION
                          
═══════════════════════════════════════════════════════════════════════════════

CLAIM REGISTRATION ID: ${claimId}
APPLICATION DATE: ${currentDate}
SUBMISSION TIME: ${currentTime}

═══════════════════════════════════════════════════════════════════════════════

                               APPLICANT DETAILS

Name:                    ${formData.applicantName || 'Not Provided'}
Phone Number:            ${formData.applicantPhone || 'Not Provided'}
Email Address:           ${formData.applicantEmail || 'Not Provided'}
Land Area:               ${formData.landArea ? `${formData.landArea} acres` : 'Not Provided'}
Land Location:           ${formData.landLocation || 'Not Provided'}

═══════════════════════════════════════════════════════════════════════════════

                            EXTRACTED DOCUMENT INFORMATION
${ocrData ? `
Name (From Document):    ${ocrData.name}
Father's Name:           ${ocrData.fatherName}
Address:                 ${ocrData.address}
Document Number:         ${ocrData.documentNumber}
Date of Birth:           ${ocrData.dateOfBirth}
` : 'No document information extracted'}

═══════════════════════════════════════════════════════════════════════════════

                              VERIFICATION STATUS

Identity Document:       ${formData.documents?.length > 0 ? '✓ Uploaded' : '✗ Not Uploaded'}
Photo Verification:      ${formData.biometrics?.photo ? '✓ Completed' : '✗ Not Completed'}
Thumbprint Verification: ${formData.biometrics?.thumbprint ? '✓ Completed' : '✗ Not Completed'}

═══════════════════════════════════════════════════════════════════════════════

                              DOCUMENTS SUBMITTED

${uploadedFiles.map(file => `• ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join('\n') || 'No documents uploaded'}

═══════════════════════════════════════════════════════════════════════════════

                                 DECLARATION

I hereby declare that the information provided in this application is true and 
correct to the best of my knowledge. I understand that any false information 
may lead to rejection of this claim.

Applicant Name: ${formData.applicantName || 'Not Provided'}
Date: ${currentDate}
Digital Submission ID: ${claimId}

═══════════════════════════════════════════════════════════════════════════════

This is a computer-generated document. No signature is required.
Generated on: ${currentDate} at ${currentTime}
System: FRA Claim Registration Portal

═══════════════════════════════════════════════════════════════════════════════
      `
    }
  }

  const downloadPDF = (content, claimId) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `FRA_Claim_Application_${claimId}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleSubmit = async () => {
    // Show preview instead of automatically downloading
    setShowPreview(true)
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert('Application submitted successfully!')
      
      // Redirect to dashboard
      router.push('/dashboard/survey')
    } catch (error) {
      console.error("Submission failed:", error)
      alert('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdPerson style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0
                }}>
                  Applicant Details
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Enter the basic information of the applicant
                </p>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px"
            }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Applicant Name
                </label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => updateFormData({ applicantName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.applicantPhone}
                  onChange={(e) => updateFormData({ applicantPhone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.applicantEmail}
                  onChange={(e) => updateFormData({ applicantEmail: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Land Area (in acres)
                </label>
                <input
                  type="number"
                  value={formData.landArea}
                  onChange={(e) => updateFormData({ landArea: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                  placeholder="Enter land area"
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Land Location
                </label>
                <textarea
                  value={formData.landLocation}
                  onChange={(e) => updateFormData({ landLocation: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    minHeight: "80px",
                    resize: "vertical"
                  }}
                  placeholder="Provide detailed location description"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdDocumentScanner style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0
                }}>
                  Document Scanning
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Upload identity documents for verification
                </p>
              </div>
            </div>

            {!loading && uploadedFiles.length === 0 && (
              <div style={{
                border: "2px dashed #d1d5db",
                borderRadius: "8px",
                padding: "48px 24px",
                textAlign: "center",
                backgroundColor: "#f9fafb"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <MdCloudUpload style={{ fontSize: "32px", color: "#6b7280" }} />
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 8px 0"
                }}>
                  Upload Document
                </h4>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 24px 0"
                }}>
                  Select an identity document (Aadhaar, Voter ID, etc.)
                </p>
                <label style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#334155",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease"
                }}>
                  <MdUpload style={{ fontSize: "16px" }} />
                  Choose File
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            )}

            {loading && (
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "32px",
                textAlign: "center"
              }}>
                <div style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#334155",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <MdCloudUpload style={{ fontSize: "32px", color: "white" }} />
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 16px 0"
                }}>
                  {uploadStatus}
                </h4>
                <div style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginBottom: "8px"
                }}>
                  <div style={{
                    width: `${uploadProgress}%`,
                    height: "100%",
                    backgroundColor: "#334155",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}></div>
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280"
                }}>
                  {uploadProgress}% completed
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && !loading && (
              <div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 16px 0"
                }}>
                  Uploaded Documents
                </h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    marginBottom: "12px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#16a34a",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <MdInsertDriveFile style={{ color: "white", fontSize: "20px" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151"
                      }}>
                        {file.name}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280"
                      }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "#dcfce7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <MdCheckCircle style={{ color: "#16a34a", fontSize: "16px" }} />
                    </div>
                  </div>
                ))}

                {ocrData && (
                  <div style={{
                    marginTop: "24px",
                    padding: "20px",
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #bbf7d0",
                    borderRadius: "8px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#374151",
                      margin: "0 0 16px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <MdVerified style={{ color: "#16a34a" }} />
                      Extracted Information
                    </h4>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "16px"
                    }}>
                      <div>
                        <label style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase"
                        }}>
                          Name
                        </label>
                        <div style={{
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500"
                        }}>
                          {ocrData.name}
                        </div>
                      </div>
                      <div>
                        <label style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase"
                        }}>
                          Father's Name
                        </label>
                        <div style={{
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500"
                        }}>
                          {ocrData.fatherName}
                        </div>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase"
                        }}>
                          Address
                        </label>
                        <div style={{
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500"
                        }}>
                          {ocrData.address}
                        </div>
                      </div>
                      <div>
                        <label style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase"
                        }}>
                          Document Number
                        </label>
                        <div style={{
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500"
                        }}>
                          {ocrData.documentNumber}
                        </div>
                      </div>
                      <div>
                        <label style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#6b7280",
                          textTransform: "uppercase"
                        }}>
                          Date of Birth
                        </label>
                        <div style={{
                          fontSize: "14px",
                          color: "#374151",
                          fontWeight: "500"
                        }}>
                          {ocrData.dateOfBirth}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      case 3:
        return (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdVerified style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0
                }}>
                  Identity Verification
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Capture biometric data for verification
                </p>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px"
            }}>
              {/* Live Photo Capture */}
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center"
              }}>
                {showCamera ? (
                  <div style={{
                    marginBottom: "16px"
                  }}>
                    <video
                      ref={(video) => {
                        if (video && stream) {
                          video.srcObject = stream
                          video.play()
                        }
                      }}
                      style={{
                        width: "100%",
                        maxWidth: "240px",
                        height: "180px",
                        borderRadius: "8px",
                        backgroundColor: "#000",
                        marginBottom: "12px",
                        objectFit: "cover"
                      }}
                      autoPlay
                      muted
                    />
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px"
                    }}>
                      {biometricStatus}
                    </div>
                    <div style={{
                      width: "100%",
                      height: "4px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "2px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${biometricProgress}%`,
                        height: "100%",
                        backgroundColor: "#334155",
                        borderRadius: "2px",
                        transition: "width 0.3s ease"
                      }}></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: formData.biometrics?.photo ? "#dcfce7" : "#f3f4f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px"
                    }}>
                      <MdPerson style={{
                        fontSize: "40px",
                        color: formData.biometrics?.photo ? "#16a34a" : "#6b7280"
                      }} />
                    </div>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#374151",
                      margin: "0 0 8px 0"
                    }}>
                      Live Photo Capture
                    </h4>
                    {biometricStatus && !formData.biometrics?.photo ? (
                      <div>
                        <div style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          marginBottom: "16px"
                        }}>
                          {biometricStatus}
                        </div>
                        <div style={{
                          width: "100%",
                          height: "6px",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "3px",
                          overflow: "hidden"
                        }}>
                          <div style={{
                            width: `${biometricProgress}%`,
                            height: "100%",
                            backgroundColor: "#334155",
                            borderRadius: "3px",
                            transition: "width 0.3s ease"
                          }}></div>
                        </div>
                      </div>
                    ) : formData.biometrics?.photo ? (
                      <div style={{
                        color: "#16a34a",
                        fontSize: "14px",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}>
                        <MdCheckCircle />
                        Photo Captured ✓
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBiometricCapture('photo')}
                        disabled={loading}
                        style={{
                          backgroundColor: "#334155",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "12px 24px",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer"
                        }}
                      >
                        Capture Photo
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Thumbprint Capture */}
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: formData.biometrics?.thumbprint ? "#dcfce7" : "#f3f4f6",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px"
                }}>
                  <MdFingerprint style={{
                    fontSize: "40px",
                    color: formData.biometrics?.thumbprint ? "#16a34a" : "#6b7280"
                  }} />
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 8px 0"
                }}>
                  Thumbprint Capture
                </h4>
                {loading && biometricStatus.includes('fingerprint') ? (
                  <div>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "16px"
                    }}>
                      {biometricStatus}
                    </div>
                    <div style={{
                      width: "100%",
                      height: "6px",
                      backgroundColor: "#f3f4f6",
                      borderRadius: "3px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${biometricProgress}%`,
                        height: "100%",
                        backgroundColor: "#334155",
                        borderRadius: "3px",
                        transition: "width 0.3s ease"
                      }}></div>
                    </div>
                  </div>
                ) : formData.biometrics?.thumbprint ? (
                  <div style={{
                    color: "#16a34a",
                    fontSize: "14px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}>
                    <MdCheckCircle />
                    Thumbprint Captured ✓
                  </div>
                ) : (
                  <button
                    onClick={() => handleBiometricCapture('thumbprint')}
                    disabled={loading}
                    style={{
                      backgroundColor: "#334155",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px 24px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer"
                    }}
                  >
                    Capture Thumbprint
                  </button>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdAttachFile style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0
                }}>
                  Supporting Documents
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Upload additional supporting documents
                </p>
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px"
            }}>
              {[
                { name: "Land Revenue Records", required: true },
                { name: "Community Certificate", required: true },
                { name: "Forest Settlement Records", required: false },
                { name: "Survey Settlement Records", required: false }
              ].map((doc, index) => (
                <div key={index} style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px"
                  }}>
                    <h4 style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      margin: 0
                    }}>
                      {doc.name}
                    </h4>
                    {doc.required && (
                      <span style={{
                        fontSize: "12px",
                        color: "#dc2626",
                        backgroundColor: "#fef2f2",
                        padding: "2px 8px",
                        borderRadius: "12px"
                      }}>
                        Required
                      </span>
                    )}
                  </div>
                  <label style={{
                    display: "block",
                    width: "100%",
                    padding: "12px",
                    border: "2px dashed #d1d5db",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#6b7280",
                    cursor: "pointer"
                  }}>
                    <MdUpload style={{ marginRight: "6px" }} />
                    Choose File
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#334155",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <MdCheck style={{ color: "white", fontSize: "24px" }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0
                }}>
                  Review & Submit
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  Review all information before submission
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              {/* Applicant Details Summary */}
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px"
              }}>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 12px 0"
                }}>
                  Applicant Details
                </h4>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                  fontSize: "14px"
                }}>
                  <div>
                    <span style={{ color: "#6b7280" }}>Name: </span>
                    <span style={{ color: "#374151", fontWeight: "500" }}>
                      {formData.applicantName || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Phone: </span>
                    <span style={{ color: "#374151", fontWeight: "500" }}>
                      {formData.applicantPhone || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Email: </span>
                    <span style={{ color: "#374151", fontWeight: "500" }}>
                      {formData.applicantEmail || "Not provided"}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: "#6b7280" }}>Land Area: </span>
                    <span style={{ color: "#374151", fontWeight: "500" }}>
                      {formData.landArea ? `${formData.landArea} acres` : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Document Status */}
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px"
              }}>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  margin: "0 0 12px 0"
                }}>
                  Documents & Verification
                </h4>
                <div style={{ display: "grid", gap: "8px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {formData.documents?.length > 0 ? (
                      <>
                        <MdCheckCircle style={{ color: "#16a34a" }} />
                        <span style={{ color: "#374151" }}>Identity Document: Uploaded</span>
                      </>
                    ) : (
                      <>
                        <MdClose style={{ color: "#dc2626" }} />
                        <span style={{ color: "#374151" }}>Identity Document: Not uploaded</span>
                      </>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {formData.biometrics?.photo ? (
                      <>
                        <MdCheckCircle style={{ color: "#16a34a" }} />
                        <span style={{ color: "#374151" }}>Photo Verification: Completed</span>
                      </>
                    ) : (
                      <>
                        <MdClose style={{ color: "#dc2626" }} />
                        <span style={{ color: "#374151" }}>Photo Verification: Not completed</span>
                      </>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {formData.biometrics?.thumbprint ? (
                      <>
                        <MdCheckCircle style={{ color: "#16a34a" }} />
                        <span style={{ color: "#374151" }}>Thumbprint Verification: Completed</span>
                      </>
                    ) : (
                      <>
                        <MdClose style={{ color: "#dc2626" }} />
                        <span style={{ color: "#374151" }}>Thumbprint Verification: Not completed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "16px 32px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? "Submitting..." : "Submit Registration"}
                {!loading && <MdCheck />}
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    }}>
      {/* Professional Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#334155",
        borderBottom: "1px solid #475569"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <button
            onClick={() => router.push('/dashboard/survey')}
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              cursor: "pointer"
            }}
          >
            <MdArrowBack />
          </button>
          <div>
            <div style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "white"
            }}>
              FRA Registration
            </div>
            <div style={{
              fontSize: "12px",
              color: "#cbd5e1"
            }}>
              Step {currentStep} of {steps.length} - {steps[currentStep - 1]?.title}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        backgroundColor: "white",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
          position: "relative"
        }}>
          {/* Connecting Line */}
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            height: "2px",
            backgroundColor: "#e5e7eb",
            zIndex: 1
          }} />
          <div style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            height: "2px",
            backgroundColor: "#334155",
            zIndex: 2,
            transition: "width 0.3s ease"
          }} />
          
          {steps.map((step, index) => (
            <div
              key={step.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                position: "relative",
                zIndex: 3
              }}
            >
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: step.id <= currentStep ? "#334155" : "#e5e7eb",
                color: step.id <= currentStep ? "white" : "#6b7280",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
                border: "2px solid white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
              }}>
                {step.id < currentStep ? <MdCheck /> : step.id}
              </div>
              <div style={{
                fontSize: "12px",
                color: step.id <= currentStep ? "#374151" : "#6b7280",
                fontWeight: step.id === currentStep ? "600" : "400",
                textAlign: "center",
                lineHeight: "1.3",
                maxWidth: "120px"
              }}>
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        padding: "24px",
        maxWidth: "1000px",
        margin: "0 auto"
      }}>
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "24px"
        }}>
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: currentStep === 1 ? "#f3f4f6" : "white",
              color: currentStep === 1 ? "#9ca3af" : "#374151",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: currentStep === 1 ? "not-allowed" : "pointer"
            }}
          >
            <MdArrowBack />
            Previous
          </button>

          <button
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            disabled={currentStep === steps.length}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: currentStep === steps.length ? "#f3f4f6" : "#334155",
              color: currentStep === steps.length ? "#9ca3af" : "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: currentStep === steps.length ? "not-allowed" : "pointer"
            }}
          >
            Next
            <MdArrowForward />
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            margin: "20px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h2 style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#1f2937",
                margin: 0
              }}>
                Application Preview
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  padding: "8px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#6b7280"
                }}
              >
                <MdClose size={24} />
              </button>
            </div>

            <div style={{
              backgroundColor: "#f9fafb",
              padding: "20px",
              borderRadius: "6px",
              marginBottom: "20px",
              fontFamily: "monospace",
              fontSize: "12px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              maxHeight: "400px",
              overflow: "auto",
              border: "1px solid #e5e7eb"
            }}>
              {generatePDFContent().content}
            </div>

            <div style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end"
            }}>
              <button
                onClick={() => {
                  const pdfData = generatePDFContent()
                  downloadPDF(pdfData.content, pdfData.claimId)
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                <MdCloudUpload />
                Download PDF
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: loading ? "#9ca3af" : "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <MdCheckCircle />
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}