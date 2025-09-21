import React, { useState } from "react";
import {
  MdCheckCircle,
  MdCancel,
  MdVisibility,
  MdDownload,
  MdSchedule,
  MdEdit,
  MdLocationOn,
  MdPerson,
  MdDescription,
  MdClose,
  MdCheck,
  MdWarning,
  MdInfo
} from "react-icons/md";

const VerificationSection = ({ stats, ActionCard }) => {
  const [activeView, setActiveView] = useState('queue') // queue, review, documents, field, updates
  const [selectedClaim, setSelectedClaim] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState({})
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample claims data
  const [claimsData, setClaimsData] = useState([
    { 
      id: "FRA-2024-048", 
      applicant: "Rajesh Kumar", 
      village: "Banswara", 
      priority: "A+", 
      days: 2,
      landArea: "3.5 acres",
      documents: ["Identity Proof", "Land Records", "Community Certificate"],
      status: "Pending Review",
      phone: "+91-9876543210",
      submissionDate: "2024-09-19"
    },
    { 
      id: "FRA-2024-049", 
      applicant: "Sita Devi", 
      village: "Kumbhalgarh", 
      priority: "A", 
      days: 5,
      landArea: "2.1 acres",
      documents: ["Identity Proof", "Land Records"],
      status: "Document Verification",
      phone: "+91-9876543211",
      submissionDate: "2024-09-16"
    },
    { 
      id: "FRA-2024-050", 
      applicant: "Mohan Singh", 
      village: "Pratapgarh", 
      priority: "B", 
      days: 8,
      landArea: "4.2 acres",
      documents: ["Identity Proof", "Land Records", "Community Certificate", "Survey Report"],
      status: "Field Verification",
      phone: "+91-9876543212",
      submissionDate: "2024-09-13"
    },
    {
      id: "FRA-2024-052",
      applicant: "Amit Sharma",
      village: "Chittorgarh",
      priority: "C+",
      days: 6, 
      landArea: "2.7 acres",
      documents: ["Identity Proof", "Land Records", "Community Certificate"],
      status: "Document Verification",
      phone: "+91-9876543214",
      submissionDate: "2024-09-15"
    },
    {
      id: "FRA-2024-053",
      applicant: "Radha Patel",
      village: "Udaipur",
      priority: "C",
      days: 7,
      landArea: "3.0 acres",
      documents: ["Identity Proof", "Land Records"],
      status: "Pending Review",
      phone: "+91-9876543215", 
      submissionDate: "2024-09-14"
    }
  ])

  const handleClaimAction = (claimId, action) => {
    setClaimsData(prev => prev.map(claim => 
      claim.id === claimId 
        ? { ...claim, status: action, lastUpdated: new Date().toISOString() }
        : claim
    ))
    
    if (action === 'approved') {
      alert(`Claim ${claimId} has been approved successfully!`)
    } else if (action === 'rejected') {
      alert(`Claim ${claimId} has been rejected.`)
    }
  }

  const handleReview = (claim) => {
    setSelectedClaim(claim)
    setActiveView('review')
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'Medium': return { bg: '#fefce8', text: '#ca8a04' }
      case 'High': return { bg: '#fef2f2', text: '#dc2626' }
      case 'Medium': return { bg: '#fefce8', text: '#ca8a04' }
      case 'Low': return { bg: '#f0fdf4', text: '#16a34a' }
      default: return {  bg: '#f0fdf4', text: '#16a34a' }
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending Review': return { bg: '#f3f4f6', text: '#374151' }
      case 'Document Verification': return { bg: '#f3f4f6', text: '#374151'  }
      case 'Field Verification': return { bg: '#f3f4f6', text: '#374151'  }
      case 'Approved': return { bbg: '#f3f4f6', text: '#374151'  }
      case 'Rejected': return {bg: '#f3f4f6', text: '#374151'  }
      default: return { bg: '#f3f4f6', text: '#374151' }
    }
  }

  const filteredClaims = claimsData.filter(claim => {
    const matchesPriority = filterPriority === 'all' || claim.priority === filterPriority
    const matchesSearch = claim.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.village.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesPriority && matchesSearch
  })

  const renderMainActions = () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "16px",
      marginBottom: "24px"
    }}>
      <div 
        onClick={() => setActiveView('queue')}
        style={{
          backgroundColor: "white",
          border: activeView === 'queue' ? "2px solid #007bff" : "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}>
            📋
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>
              Pending Claims Review
            </h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
              Review and verify pending FRA claims
            </p>
          </div>
        </div>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: "#fef3c7", 
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#92400e"
        }}>
          {stats.pendingVerification} pending review →
        </div>
      </div>

      <div 
        onClick={() => setActiveView('documents')}
        style={{
          backgroundColor: "white",
          border: activeView === 'documents' ? "2px solid #007bff" : "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}>
            📑
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>
              Document Verification
            </h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
              Verify submitted documents and certificates
            </p>
          </div>
        </div>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: "#ddd6fe", 
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#7c3aed"
        }}>
          Verify Documents →
        </div>
      </div>

      <div 
        onClick={() => setActiveView('field')}
        style={{
          backgroundColor: "white",
          border: activeView === 'field' ? "2px solid #007bff" : "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}>
            🔍
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>
              Field Verification
            </h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
              Coordinate field verification with surveyors
            </p>
          </div>
        </div>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: "#dbeafe", 
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#1d4ed8"
        }}>
          Schedule Verification →
        </div>
      </div>

      <div 
        onClick={() => setActiveView('updates')}
        style={{
          backgroundColor: "white",
          border: activeView === 'updates' ? "2px solid #007bff" : "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <div style={{ 
            width: "40px", 
            height: "40px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}>
            ✏️
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#333" }}>
              Update Requests
            </h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#666" }}>
              Process requests for claim updates
            </p>
          </div>
        </div>
        <div style={{ 
          padding: "8px 12px", 
          backgroundColor: "#dcfce7", 
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "500",
          color: "#166534"
        }}>
          Process Updates →
        </div>
      </div>
    </div>
  )

  const renderClaimQueue = () => (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>
            Verification Queue
          </h4>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{
                padding: "6px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px"
              }}
            >
              <option value="all">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "6px 12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "13px",
                width: "200px"
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {filteredClaims.map((claim, index) => {
          const priorityColor = getPriorityColor(claim.priority)
          const statusColor = getStatusColor(claim.status)
          
          return (
            <div key={claim.id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 20px",
              borderBottom: index < filteredClaims.length - 1 ? "1px solid #eee" : "none",
              hover: { backgroundColor: "#f8f9fa" }
            }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px"
                }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#333"
                  }}>
                    {claim.id} - {claim.applicant}
                  </div>
                  <span style={{
                    padding: "2px 6px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "500",
                    backgroundColor: statusColor.bg,
                    color: statusColor.text
                  }}>
                    {claim.status}
                  </span>
                </div>
                <div style={{
                  fontSize: "12px",
                  color: "#666",
                  marginBottom: "4px"
                }}>
                  Village: {claim.village} • Land Area: {claim.landArea} • {claim.days} days pending
                </div>
                <div style={{
                  fontSize: "11px",
                  color: "#888"
                }}>
                  Submitted: {claim.submissionDate} • Documents: {claim.documents.length}
                </div>
              </div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: priorityColor.bg,
                  color: priorityColor.text
                }}>
                  {claim.priority}
                </span>
                <button 
                  onClick={() => handleReview(claim)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "6px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: "pointer",
                    fontWeight: "500"
                  }}
                >
                  <MdVisibility size={14} />
                  Review
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderClaimReview = () => {
    if (!selectedClaim) return null

    return (
      <div style={{
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        {/* Header */}
        <div style={{ 
          padding: "20px", 
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>
              Claim Review - {selectedClaim.id}
            </h4>
            <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
              Detailed review and verification interface
            </p>
          </div>
          <button
            onClick={() => setActiveView('queue')}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            <MdClose size={16} />
          </button>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Applicant Details */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "12px" }}>
              Applicant Information
            </h5>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              padding: "16px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px"
            }}>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Name:</strong>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "2px" }}>{selectedClaim.applicant}</div>
              </div>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Village:</strong>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "2px" }}>{selectedClaim.village}</div>
              </div>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Land Area:</strong>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "2px" }}>{selectedClaim.landArea}</div>
              </div>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Phone:</strong>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "2px" }}>{selectedClaim.phone}</div>
              </div>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Priority:</strong>
                <span style={{
                  ...getPriorityColor(selectedClaim.priority),
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  backgroundColor: getPriorityColor(selectedClaim.priority).bg,
                  color: getPriorityColor(selectedClaim.priority).text,
                  marginTop: "2px",
                  display: "inline-block"
                }}>
                  {selectedClaim.priority}
                </span>
              </div>
              <div>
                <strong style={{ fontSize: "13px", color: "#555" }}>Submitted:</strong>
                <div style={{ fontSize: "14px", color: "#333", marginTop: "2px" }}>{selectedClaim.submissionDate}</div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div style={{ marginBottom: "24px" }}>
            <h5 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "12px" }}>
              Submitted Documents
            </h5>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px"
            }}>
              {selectedClaim.documents.map((doc, index) => (
                <div key={index} style={{
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  backgroundColor: "white"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      <MdDescription color="#666" />
                      <span style={{ fontSize: "13px", fontWeight: "500", color: "#333" }}>{doc}</span>
                    </div>
                    <MdCheckCircle color="#16a34a" size={16} />
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "8px"
                  }}>
                    <button style={{
                      padding: "4px 8px",
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "11px",
                      cursor: "pointer"
                    }}>
                      <MdVisibility size={12} style={{ marginRight: "4px" }} />
                      View
                    </button>
                    <button style={{
                      padding: "4px 8px",
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "11px",
                      cursor: "pointer"
                    }}>
                      <MdDownload size={12} style={{ marginRight: "4px" }} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            borderTop: "1px solid #eee",
            paddingTop: "16px"
          }}>
            <button
              onClick={() => handleClaimAction(selectedClaim.id, 'rejected')}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              <MdCancel size={16} />
              Reject Claim
            </button>
            <button
              onClick={() => handleClaimAction(selectedClaim.id, 'Field Verification')}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              <MdLocationOn size={16} />
              Send to Field
            </button>
            <button
              onClick={() => handleClaimAction(selectedClaim.id, 'approved')}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                backgroundColor: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              <MdCheckCircle size={16} />
              Approve Claim
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderDocumentVerification = () => (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>
          Document Verification Center
        </h4>
        <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
          Verify and validate submitted documents
        </p>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px"
        }}>
          {claimsData.filter(claim => claim.status === 'Document Verification').map(claim => (
            <div key={claim.id} style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "16px",
              backgroundColor: "#fafafa"
            }}>
              <div style={{ marginBottom: "12px" }}>
                <h5 style={{ fontSize: "14px", fontWeight: "600", color: "#333", margin: 0 }}>
                  {claim.id} - {claim.applicant}
                </h5>
                <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
                  {claim.village} • {claim.landArea}
                </p>
              </div>
              
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ fontSize: "12px", color: "#555" }}>Documents:</strong>
                <ul style={{ margin: "4px 0 0 0", paddingLeft: "16px", fontSize: "11px", color: "#666" }}>
                  {claim.documents.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{
                  flex: 1,
                  padding: "6px 12px",
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "11px",
                  cursor: "pointer"
                }}>
                  Verify All
                </button>
                <button 
                  onClick={() => handleReview(claim)}
                  style={{
                  flex: 1,
                  padding: "6px 12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "11px",
                  cursor: "pointer"
                }}>
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFieldVerification = () => (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>
          Field Verification Schedule
        </h4>
        <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
          Coordinate and schedule field verification activities
        </p>
      </div>

      <div style={{ padding: "20px" }}>
        {claimsData.filter(claim => claim.status === 'Field Verification').map(claim => (
          <div key={claim.id} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "12px",
            backgroundColor: "#f8f9fa"
          }}>
            <div>
              <h5 style={{ fontSize: "14px", fontWeight: "600", color: "#333", margin: 0 }}>
                {claim.id} - {claim.applicant}
              </h5>
              <p style={{ fontSize: "12px", color: "#666", margin: "4px 0 0 0" }}>
                Village: {claim.village} • Land: {claim.landArea} • Priority: {claim.priority}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button style={{
                padding: "6px 12px",
                backgroundColor: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer"
              }}>
                <MdSchedule size={14} style={{ marginRight: "4px" }} />
                Schedule
              </button>
              <button style={{
                padding: "6px 12px",
                backgroundColor: "#059669",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "12px",
                cursor: "pointer"
              }}>
                <MdLocationOn size={14} style={{ marginRight: "4px" }} />
                View Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderUpdateRequests = () => (
    <div style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ padding: "20px", borderBottom: "1px solid #eee" }}>
        <h4 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>
          Update Requests
        </h4>
        <p style={{ fontSize: "13px", color: "#666", margin: "4px 0 0 0" }}>
          Process modification and update requests
        </p>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#666"
        }}>
          <MdInfo size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
          <h5 style={{ fontSize: "16px", color: "#333", margin: "0 0 8px 0" }}>No Update Requests</h5>
          <p style={{ fontSize: "13px", margin: 0 }}>
            There are currently no pending update requests to process.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#333",
          margin: "0 0 8px 0"
        }}>
          Verification Center
        </h3>
        <p style={{
          fontSize: "14px",
          color: "#666",
          margin: "0"
        }}>
          Comprehensive verification and review system for FRA claims
        </p>
      </div>

      {renderMainActions()}

      {activeView === 'queue' && renderClaimQueue()}
      {activeView === 'review' && renderClaimReview()}
      {activeView === 'documents' && renderDocumentVerification()}
      {activeView === 'field' && renderFieldVerification()}
      {activeView === 'updates' && renderUpdateRequests()}
    </div>
  )
}

export default VerificationSection;
