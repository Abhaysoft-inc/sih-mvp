'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MapComponent = () => {
    const { MapContainer, TileLayer, Polygon, Popup } = require('react-leaflet');
    require('leaflet/dist/leaflet.css');

    // Fix Leaflet default markers with custom SVG icons
    if (typeof window !== 'undefined') {
        const L = require('leaflet');

        // Create custom icon using inline SVG to avoid CDN issues
        const customIcon = new L.Icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS4xMjc0IDAgMjQuNSA1LjM3MjU4IDI0LjUgMTJDMjQuNSAxOC42Mjc0IDE5LjEyNzQgMjQgMTIuNSAyNEM1Ljg3MjU4IDI0IDUuMzY0NDJlLTA3IDE4LjYyNzQgMCAxMkMtNS4zNjQ0MmUtMDcgNS4zNzI1OCA1Ljg3MjU4IDAgMTIuNSAwWiIgZmlsbD0iIzM5NjZGRiIvPgo8Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIiIHI9IjciIGZpbGw9IndoaXRlIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTIuNSwyNCAxNS41LDM2IDkuNSwzNiIgZmlsbD0iIzM5NjZGRiIvPgo8L3N2Zz4K',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIzNy41IiByeD0iMTguNSIgcnk9IjMuNSIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPgo=',
            shadowSize: [41, 41],
            shadowAnchor: [13, 41]
        });

        // Set as default icon to avoid any CDN dependency issues
        L.Icon.Default.prototype.options = customIcon.options;
    }

    // Sample FRA Claims with different statuses
    const fraClaims = [
        {
            id: "FRA-001",
            claimantName: "Santali Tribal Community",
            village: "Mayurbhanj Village",
            area: "12.5 hectares",
            status: "Approved",
            submissionDate: "2023-03-15",
            approvalDate: "2024-01-20",
            coordinates: [
                [21.95, 86.70],
                [21.96, 86.70],
                [21.96, 86.72],
                [21.95, 86.72],
                [21.95, 86.70]
            ],
            color: "#22c55e" // Green for approved
        },
        {
            id: "FRA-002",
            claimantName: "Kond Tribal Group",
            village: "Koraput Settlement",
            area: "8.3 hectares",
            status: "Pending",
            submissionDate: "2024-02-10",
            approvalDate: null,
            coordinates: [
                [18.80, 82.70],
                [18.82, 82.70],
                [18.82, 82.73],
                [18.80, 82.73],
                [18.80, 82.70]
            ],
            color: "#f59e0b" // Orange for pending
        },
        {
            id: "FRA-003",
            claimantName: "Bonda Community",
            village: "Malkangiri Forest Area",
            area: "15.7 hectares",
            status: "Under Review",
            submissionDate: "2024-01-05",
            approvalDate: null,
            coordinates: [
                [18.35, 81.85],
                [18.37, 81.85],
                [18.37, 81.88],
                [18.35, 81.88],
                [18.35, 81.85]
            ],
            color: "#3b82f6" // Blue for under review
        },
        {
            id: "FRA-004",
            claimantName: "Saora Tribal Family",
            village: "Gajapati Hills",
            area: "6.2 hectares",
            status: "Rejected",
            submissionDate: "2023-08-20",
            approvalDate: null,
            rejectionReason: "Insufficient documentation",
            coordinates: [
                [19.40, 84.15],
                [19.41, 84.15],
                [19.41, 84.17],
                [19.40, 84.17],
                [19.40, 84.15]
            ],
            color: "#ef4444" // Red for rejected
        },
        {
            id: "FRA-005",
            claimantName: "Ho Tribal Collective",
            village: "Sundargarh Region",
            area: "20.1 hectares",
            status: "Approved",
            submissionDate: "2023-05-12",
            approvalDate: "2023-11-30",
            coordinates: [
                [22.10, 84.05],
                [22.12, 84.05],
                [22.12, 84.08],
                [22.10, 84.08],
                [22.10, 84.05]
            ],
            color: "#22c55e" // Green for approved
        }
    ];

    // Function to get status badge color
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-orange-100 text-orange-800';
            case 'Under Review': return 'bg-blue-100 text-blue-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <MapContainer
            center={[20.5937, 78.9629]}
            zoom={6}
            style={{
                width: '100%',
                height: '400px',
                border: '1px solid #ccc',
                borderRadius: '8px'
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />

            {/* Render FRA Claims as Polygons */}
            {fraClaims.map((claim) => (
                <Polygon
                    key={claim.id}
                    positions={claim.coordinates}
                    pathOptions={{
                        fillColor: claim.color,
                        color: claim.color,
                        weight: 2,
                        opacity: 0.8,
                        fillOpacity: 0.4
                    }}
                >
                    <Popup maxWidth={300}>
                        <div style={{ padding: '8px', fontSize: '14px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '8px'
                            }}>
                                <h3 style={{
                                    margin: 0,
                                    fontWeight: 'bold',
                                    color: '#1f2937',
                                    fontSize: '16px'
                                }}>
                                    🏛️ {claim.id}
                                </h3>
                                <span style={{
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    backgroundColor: claim.status === 'Approved' ? '#dcfce7' :
                                        claim.status === 'Pending' ? '#fef3c7' :
                                            claim.status === 'Under Review' ? '#dbeafe' : '#fee2e2',
                                    color: claim.status === 'Approved' ? '#166534' :
                                        claim.status === 'Pending' ? '#92400e' :
                                            claim.status === 'Under Review' ? '#1e40af' : '#991b1b'
                                }}>
                                    {claim.status}
                                </span>
                            </div>

                            <div style={{ marginBottom: '6px' }}>
                                <strong>Claimant:</strong> {claim.claimantName}
                            </div>
                            <div style={{ marginBottom: '6px' }}>
                                <strong>Village:</strong> {claim.village}
                            </div>
                            <div style={{ marginBottom: '6px' }}>
                                <strong>Area:</strong> {claim.area}
                            </div>
                            <div style={{ marginBottom: '6px' }}>
                                <strong>Submitted:</strong> {claim.submissionDate}
                            </div>

                            {claim.approvalDate && (
                                <div style={{ marginBottom: '6px' }}>
                                    <strong>Approved:</strong> {claim.approvalDate}
                                </div>
                            )}

                            {claim.rejectionReason && (
                                <div style={{
                                    marginTop: '8px',
                                    padding: '6px',
                                    backgroundColor: '#fef2f2',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    <strong>Rejection Reason:</strong> {claim.rejectionReason}
                                </div>
                            )}

                            <div style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#6b7280'
                            }}>
                                Forest Rights Act (FRA) Claim
                            </div>
                        </div>
                    </Popup>
                </Polygon>
            ))}
        </MapContainer>
    );
};

// Dynamically import to avoid SSR issues
const Map = dynamic(() => Promise.resolve(MapComponent), {
    ssr: false,
    loading: () => (
        <div style={{
            width: '100%',
            height: '400px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
        }}>
            Loading map...
        </div>
    )
});

export default Map;