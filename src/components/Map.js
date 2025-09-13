"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
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
            color: "#22c55e" // Green for approved
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
            color: "#f59e0b" // Orange for pending
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
            color: "#3b82f6" // Blue for under review
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
            color: "#ef4444" // Red for rejected
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
            color: "#22c55e" // Green for approved
        }
    ];

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
        </div>
    );
}
