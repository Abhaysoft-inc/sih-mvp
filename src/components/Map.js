"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import MapTools from "./MapTools";
import MapLegend from "./MapLegend";
import {
    MdForest,
    MdHome,
    MdSecurity,
    MdWaterDrop,
    MdAccountBalance
} from "react-icons/md";

export default function Map() {
    // State for sidebar management
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFraClaim, setSelectedFraClaim] = useState(null);

    // Fix for default markers - using a more reliable approach
    useEffect(() => {
        // Create custom icon to avoid the default icon loading issue
        const customIcon = new L.Icon({
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEMxOS4xMjc0IDAgMjQuNSA1LjM3MjU4IDI0LjUgMTJDMjQuNSAxOC42Mjc0IDE5LjEyNzQgMjQgMTIuNSAyNEM1Ljg3MjU4IDI0IDUuMzY0NDJlLTA3IDE4LjYyNzQgMCAxMkMtNS4zNjQ0MmUtMDcgNS4zNzI1OCA1Ljg3MjU4IDAgMTIuNSAwWiIgZmlsbD0iIzM5NjZGRiIvPgo8Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIiIHI9IjciIGZpbGw9IndoaXRlIi8+Cjxwb2x5Z29uIHBvaW50cz0iMTIuNSwyNCAxNS41LDM2IDkuNSwzNiIgZmlsbD0iIzM5NjZGRiIvPgo8L3N2Zz4K',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjIwLjUiIGN5PSIzNy41IiByeD0iMTguNSIgcnk9IjMuNSIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPgo=',
            shadowSize: [41, 41],
            shadowAnchor: [13, 41]
        });

        // Set as default
        L.Icon.Default.prototype.options = customIcon.options;
    }, []);

    // Sample assets within 2km radius of Bhubaneswar
    const forestAreas = [

    ];

    const villages = [
        { position: [20.6000, 84.9000], name: "Bhubaneswar", population: "837,737", status: "Capital City" },
        { position: [20.6500, 84.9500], name: "Patia", population: "45,000", status: "Urban Area" },
        { position: [20.5500, 84.8500], name: "Chandrasekharpur", population: "35,000", status: "Suburb" },
        { position: [20.7000, 85.0500], name: "Nayapalli", population: "28,000", status: "Residential" },
    ];

    // Local forest boundary (Chandaka-Dampara Wildlife Sanctuary area)
    const localForestBoundary = [
        // [20.9450, 85.0800],
        // [20.9650, 85.0800],
        // [20.9650, 85.1200],
        // [20.9450, 85.1200],
        // [20.9450, 85.0800]
    ];

    // Sample FRA Claims with different statuses - Within specified coordinate bounds
    const fraClaims = [
        {
            id: "FRA-001",
            claimantName: "Santali Tribal Community",
            village: "Patia Area",
            area: "12.5 hectares",
            status: "Approved",
            submissionDate: "2023-03-15",
            approvalDate: "2024-01-20",
            coordinates: [
                [20.7000, 84.9500], // North-East area
                [20.7200, 84.9500],
                [20.7200, 84.9700],
                [20.7000, 84.9700],
                [20.7000, 84.9500]
            ],
            color: "#22c55e", // Green for approved
            timeline: [
                { date: "2023-03-15", status: "Application Submitted", description: "Initial application submitted by Santali Tribal Community" },
                { date: "2023-04-02", status: "Under Review", description: "Application assigned to review committee" },
                { date: "2023-05-18", status: "Field Verification", description: "Field team conducted site verification" },
                { date: "2023-07-10", status: "Documentation Complete", description: "All required documents verified and accepted" },
                { date: "2023-09-25", status: "Committee Approval", description: "Approved by Sub-Divisional Level Committee" },
                { date: "2023-11-30", status: "District Approval", description: "Approved by District Level Committee" },
                { date: "2024-01-20", status: "Final Approval", description: "Final approval granted and title rights issued" }
            ],
            landType: "Traditional Agricultural Land",
            surveyNumber: "SY-789/2A",
            tehsil: "Patia"
        },
        {
            id: "FRA-002",
            claimantName: "Kond Tribal Group",
            village: "Chandrasekharpur Area",
            area: "8.3 hectares",
            status: "Pending",
            submissionDate: "2024-02-10",
            approvalDate: null,
            coordinates: [
                [20.6500, 85.0200], // East area
                [20.6700, 85.0200],
                [20.6700, 85.0400],
                [20.6500, 85.0400],
                [20.6500, 85.0200]
            ],
            color: "#f59e0b", // Orange for pending
            timeline: [
                { date: "2024-02-10", status: "Application Submitted", description: "Initial application submitted by Kond Tribal Group" },
                { date: "2024-02-25", status: "Preliminary Review", description: "Application received and assigned tracking number" },
                { date: "2024-03-15", status: "Document Verification", description: "Initial document verification in progress" },
                { date: "2024-04-20", status: "Additional Documents Required", description: "Committee requested additional supporting documents" },
                { date: "2024-05-10", status: "Documents Resubmitted", description: "Additional documents provided by claimant" },
                { date: "2024-06-01", status: "Under Review", description: "Currently under review by Sub-Divisional Committee" }
            ],
            landType: "Forest Land for Cultivation",
            surveyNumber: "SY-456/1B",
            tehsil: "Chandrasekharpur"
        },
        {
            id: "FRA-003",
            claimantName: "Bonda Community",
            village: "Jayadev Vihar Area",
            area: "15.7 hectares",
            status: "Under Review",
            submissionDate: "2024-01-05",
            approvalDate: null,
            coordinates: [
                [20.5000, 84.8000], // South-West area
                [20.5200, 84.8000],
                [20.5200, 84.8200],
                [20.5000, 84.8200],
                [20.5000, 84.8000]
            ],
            color: "#3b82f6", // Blue for under review
            timeline: [
                { date: "2024-01-05", status: "Application Submitted", description: "Initial application submitted by Bonda Community" },
                { date: "2024-01-20", status: "Preliminary Review", description: "Application accepted for detailed review" },
                { date: "2024-02-28", status: "Field Survey Scheduled", description: "Field verification team assigned" },
                { date: "2024-03-20", status: "Field Verification", description: "On-site verification completed" },
                { date: "2024-04-15", status: "Technical Review", description: "Technical committee reviewing survey reports" },
                { date: "2024-05-30", status: "Community Consultation", description: "Public consultation held with local community" },
                { date: "2024-07-10", status: "Under Final Review", description: "Currently under final review by District Committee" }
            ],
            landType: "Mixed Forest and Agricultural Land",
            surveyNumber: "SY-123/3C",
            tehsil: "Jayadev Vihar"
        },
        {
            id: "FRA-004",
            claimantName: "Saora Tribal Family",
            village: "Nayapalli Area",
            area: "6.2 hectares",
            status: "Rejected",
            submissionDate: "2023-08-20",
            approvalDate: null,
            rejectionReason: "Insufficient documentation",
            coordinates: [
                [20.4500, 84.9000], // South area
                [20.4700, 84.9000],
                [20.4700, 84.9200],
                [20.4500, 84.9200],
                [20.4500, 84.9000]
            ],
            color: "#ef4444", // Red for rejected
            timeline: [
                { date: "2023-08-20", status: "Application Submitted", description: "Initial application submitted by Saora Tribal Family" },
                { date: "2023-09-05", status: "Under Review", description: "Application under preliminary review" },
                { date: "2023-10-12", status: "Documentation Issues", description: "Missing required documents identified" },
                { date: "2023-11-01", status: "Notice Issued", description: "Notice sent to provide missing documents within 30 days" },
                { date: "2023-12-15", status: "Follow-up Notice", description: "Second notice issued for pending documents" },
                { date: "2024-01-30", status: "Application Rejected", description: "Application rejected due to insufficient documentation and non-compliance" }
            ],
            landType: "Disputed Forest Land",
            surveyNumber: "SY-321/4D",
            tehsil: "Nayapalli"
        },
        {
            id: "FRA-005",
            claimantName: "Ho Tribal Collective",
            village: "Rasulgarh Area",
            area: "20.1 hectares",
            status: "Approved",
            submissionDate: "2023-05-12",
            approvalDate: "2023-11-30",
            coordinates: [
                [20.6000, 84.7500], // West area
                [20.6200, 84.7500],
                [20.6200, 84.7700],
                [20.6000, 84.7700],
                [20.6000, 84.7500]
            ],
            color: "#22c55e", // Green for approved
            timeline: [
                { date: "2023-05-12", status: "Application Submitted", description: "Initial application submitted by Ho Tribal Collective" },
                { date: "2023-05-25", status: "Fast Track Review", description: "Application selected for fast-track processing" },
                { date: "2023-06-15", status: "Field Verification", description: "Rapid field verification completed" },
                { date: "2023-07-20", status: "Documentation Complete", description: "All documents verified and approved" },
                { date: "2023-08-30", status: "Committee Review", description: "Sub-Divisional Committee reviewed and recommended approval" },
                { date: "2023-10-15", status: "District Approval", description: "District Level Committee approved the claim" },
                { date: "2023-11-30", status: "Title Rights Issued", description: "Final approval granted and community land rights certificate issued" }
            ],
            landType: "Community Forest Land",
            surveyNumber: "SY-567/5A",
            tehsil: "Rasulgarh"
        }
    ];

    // Function to handle showing details
    const handleShowDetails = (claim) => {
        setSelectedFraClaim(claim);
        setSidebarOpen(true);
    };

    // Function to close sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
        setSelectedFraClaim(null);
    };

    // FRA Details Sidebar Component (Compact with Light Colors)
    const FRADetailsSidebar = () => {
        if (!selectedFraClaim) return null;

        const getStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'approved':
                case 'final approval':
                case 'title rights issued':
                    return 'text-green-700 bg-green-50 border-green-200';
                case 'rejected':
                case 'application rejected':
                    return 'text-red-700 bg-red-50 border-red-200';
                case 'pending':
                case 'under review':
                case 'under final review':
                    return 'text-blue-700 bg-blue-50 border-blue-200';
                case 'documentation issues':
                case 'additional documents required':
                    return 'text-orange-700 bg-orange-50 border-orange-200';
                default:
                    return 'text-gray-700 bg-gray-50 border-gray-200';
            }
        };

        return (
            <div className={`fixed top-16 right-0 bottom-0 w-80 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-[9999] ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">{selectedFraClaim.id}</h2>
                            <p className="text-gray-600 text-sm">{selectedFraClaim.claimantName}</p>
                        </div>
                        <button
                            onClick={closeSidebar}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${selectedFraClaim.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                            selectedFraClaim.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                                selectedFraClaim.status === 'Pending' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                    'bg-blue-100 text-blue-700 border-blue-200'
                            }`}>
                            {selectedFraClaim.status}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 space-y-4">
                    {/* Basic Information */}
                    <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <MdAccountBalance className="text-gray-600" />
                            Basic Information
                        </h3>
                        <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Village:</span>
                                <span className="text-gray-800">{selectedFraClaim.village}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Area:</span>
                                <span className="text-gray-800 font-semibold">{selectedFraClaim.area}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Land Type:</span>
                                <span className="text-gray-800">{selectedFraClaim.landType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Survey No:</span>
                                <span className="text-gray-800">{selectedFraClaim.surveyNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 font-medium">Tehsil:</span>
                                <span className="text-gray-800">{selectedFraClaim.tehsil}</span>
                            </div>
                        </div>
                    </div>

                    {/* Decision/Order */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Decision & Order</h3>

                        {/* Final Decision */}
                        <div className={`p-3 rounded-lg border-2 mb-3 ${selectedFraClaim.status === 'Approved' ? 'bg-green-50 border-green-200' :
                            selectedFraClaim.status === 'Rejected' ? 'bg-red-50 border-red-200' :
                                selectedFraClaim.status === 'Pending' ? 'bg-orange-50 border-orange-200' :
                                    'bg-blue-50 border-blue-200'
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`w-3 h-3 rounded-full ${selectedFraClaim.status === 'Approved' ? 'bg-green-500' :
                                    selectedFraClaim.status === 'Rejected' ? 'bg-red-500' :
                                        selectedFraClaim.status === 'Pending' ? 'bg-orange-500' :
                                            'bg-blue-500'
                                    }`}></div>
                                <span className="text-sm font-semibold text-gray-800">
                                    {selectedFraClaim.status === 'Approved' ? 'LAND APPROVED' :
                                        selectedFraClaim.status === 'Rejected' ? 'CLAIM REJECTED' :
                                            selectedFraClaim.status === 'Pending' ? 'APPLICATION PENDING' :
                                                'UNDER REVIEW'}
                                </span>
                            </div>

                            <div className="space-y-1 text-xs">
                                <p className={`font-medium ${selectedFraClaim.status === 'Approved' ? 'text-green-700' :
                                    selectedFraClaim.status === 'Rejected' ? 'text-red-700' :
                                        selectedFraClaim.status === 'Pending' ? 'text-orange-700' :
                                            'text-blue-700'
                                    }`}>
                                    {selectedFraClaim.status === 'Approved'
                                        ? `This land (${selectedFraClaim.area}) has been approved and granted to ${selectedFraClaim.claimantName}.`
                                        : selectedFraClaim.status === 'Rejected'
                                            ? `The land claim for ${selectedFraClaim.area} has been rejected.`
                                            : selectedFraClaim.status === 'Pending'
                                                ? `The application for ${selectedFraClaim.area} is currently pending review.`
                                                : `The claim for ${selectedFraClaim.area} is under review by the committee.`
                                    }
                                </p>

                                {selectedFraClaim.approvalDate && (
                                    <p className="text-gray-600">
                                        <strong>Approved on:</strong> {selectedFraClaim.approvalDate}
                                    </p>
                                )}

                                <p className="text-gray-600">
                                    <strong>Applied on:</strong> {selectedFraClaim.submissionDate}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rejection Reason if applicable */}
                    {selectedFraClaim.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-h-32 overflow-y-auto">
                            <h3 className="text-sm font-semibold text-red-800 mb-2">Rejection Details</h3>
                            <p className="text-red-700 text-xs">{selectedFraClaim.rejectionReason}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="relative h-full w-full">
            <MapContainer
                center={[20.6000, 84.9000]} // Center within specified coordinates
                zoom={11} // Adjusted zoom to see the area clearly
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Forest Area Markers */}
                {forestAreas.map((forest, index) => (
                    <Circle
                        key={`forest-${index}`}
                        center={forest.position}
                        radius={15000} // 15km radius
                        pathOptions={{
                            fillColor: '#22c55e',
                            color: '#16a34a',
                            weight: 2,
                            opacity: 0.8,
                            fillOpacity: 0.3
                        }}
                    >
                        <Popup>
                            <div className="text-sm">
                                <h3 className="font-semibold text-green-800 flex items-center gap-2">
                                    <MdForest className="text-green-600" /> {forest.name}
                                </h3>
                                <p><strong>Area:</strong> {forest.area}</p>
                                <p><strong>Type:</strong> {forest.type}</p>
                                <p className="text-xs text-gray-600 mt-1">Forest Rights Area</p>
                            </div>
                        </Popup>
                    </Circle>
                ))}

                {/* Village/Settlement Markers */}
                {villages.map((village, index) => (
                    <Marker key={`village-${index}`} position={village.position}>
                        <Popup maxWidth={280} className="custom-popup">
                            <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3 border-b border-gray-100">
                                    <h3 className="font-bold text-blue-800 flex items-center gap-2">
                                        <MdHome className="text-blue-600 text-lg" /> {village.name}
                                    </h3>
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 text-sm font-medium">Population:</span>
                                        <span className="text-gray-800 text-sm font-semibold">{village.population}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 text-sm font-medium">Status:</span>
                                        <span className="text-blue-700 text-sm font-semibold">{village.status}</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        Administrative Center
                                    </p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Protected Forest Boundary */}
                <Polygon
                    positions={localForestBoundary}
                    pathOptions={{
                        fillColor: '#16a34a',
                        color: '#15803d',
                        weight: 3,
                        opacity: 0.9,
                        fillOpacity: 0.2,
                        dashArray: '10, 10'
                    }}
                >
                    <Popup maxWidth={300} className="custom-popup">
                        <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 border-b border-gray-100">
                                <h3 className="font-bold text-green-800 flex items-center gap-2">
                                    <MdSecurity className="text-green-600 text-lg" /> Protected Forest Boundary
                                </h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-800 font-semibold text-sm">Chandaka-Dampara Wildlife Sanctuary</p>
                                <p className="text-gray-600 text-sm mt-1">This area is under special protection for biodiversity conservation.</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                    Local Protected Area
                                </p>
                            </div>
                        </div>
                    </Popup>
                </Polygon>

                {/* Water Bodies */}
                <Circle
                    center={[20.5500, 84.8500]} // Local water body within specified bounds
                    radius={800} // Smaller radius for local pond/lake
                    pathOptions={{
                        fillColor: '#3b82f6',
                        color: '#2563eb',
                        weight: 2,
                        opacity: 0.8,
                        fillOpacity: 0.4
                    }}
                >
                    <Popup maxWidth={280} className="custom-popup">
                        <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 border-b border-gray-100">
                                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                                    <MdWaterDrop className="text-blue-600 text-lg" /> Local Water Body
                                </h3>
                            </div>
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm font-medium">Type:</span>
                                    <span className="text-gray-800 text-sm font-semibold">Forest area lake</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600 text-sm font-medium">Area:</span>
                                    <span className="text-blue-700 text-sm font-semibold">0.8 sq km</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                    Natural Water Source
                                </p>
                            </div>
                        </div>
                    </Popup>
                </Circle>

                {/* FRA Claims Polygons */}
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
                        <Popup maxWidth={350} className="custom-popup">
                            <div className="bg-white rounded-lg shadow-lg border-0 overflow-hidden">
                                {/* Header Section */}
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MdAccountBalance className="text-blue-600 text-lg" />
                                            <h3 className="font-bold text-gray-800 text-base">
                                                {claim.id}
                                            </h3>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${claim.status === 'Approved'
                                            ? 'bg-green-50 text-green-700 border-green-200' :
                                            claim.status === 'Pending'
                                                ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                claim.status === 'Under Review'
                                                    ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                    'bg-red-50 text-red-700 border-red-200'
                                            }`}>
                                            {claim.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-4 space-y-3">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-600 text-sm font-medium">Claimant:</span>
                                            <span className="text-gray-800 text-sm font-semibold text-right">{claim.claimantName}</span>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-600 text-sm font-medium">Village:</span>
                                            <span className="text-gray-800 text-sm text-right">{claim.village}</span>
                                        </div>

                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-600 text-sm font-medium">Area:</span>
                                            <span className="text-gray-800 text-sm font-semibold text-right">{claim.area}</span>
                                        </div>

                                        <hr className="border-gray-100 my-2" />

                                        <div className="flex justify-between items-start">
                                            <span className="text-gray-600 text-sm font-medium">Submitted:</span>
                                            <span className="text-gray-800 text-sm text-right">{claim.submissionDate}</span>
                                        </div>

                                        {claim.approvalDate && (
                                            <div className="flex justify-between items-start">
                                                <span className="text-green-600 text-sm font-medium">Approved:</span>
                                                <span className="text-green-700 text-sm font-semibold text-right">{claim.approvalDate}</span>
                                            </div>
                                        )}
                                    </div>

                                    {claim.rejectionReason && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <span className="text-red-600 text-xs font-semibold uppercase tracking-wide">Rejection Reason:</span>
                                            </div>
                                            <p className="text-red-700 text-sm mt-1">{claim.rejectionReason}</p>
                                        </div>
                                    )}

                                    {/* Show Details Button */}
                                    <div className="mt-4 pt-3 border-t border-gray-100 items-center">
                                        <button
                                            onClick={() => handleShowDetails(claim)}
                                            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2 "
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Show Details
                                        </button>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                                        Forest Rights Act (FRA) Claim
                                    </p>
                                </div>
                            </div>
                        </Popup>
                    </Polygon>
                ))}

            </MapContainer>
            <MapTools />
            <MapLegend />

            {/* FRA Details Sidebar */}
            <FRADetailsSidebar />
        </div>
    );
}
