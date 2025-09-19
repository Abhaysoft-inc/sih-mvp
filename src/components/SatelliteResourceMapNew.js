"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MdSatellite, MdForest, MdWaves, MdGrass, MdDiamond } from "react-icons/md";
import 'leaflet/dist/leaflet.css';

// Custom icon creation for Leaflet markers
const createCustomIcon = (IconComponent, color) => {
    return L.divIcon({
        html: `
      <div style="
        background-color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid ${color};
      ">
        <div style="color: ${color}; font-size: 16px;">
          ${IconComponent === MdForest ? '🌲' :
                IconComponent === MdWaves ? '💧' :
                    IconComponent === MdGrass ? '🌾' : '💎'}
        </div>
      </div>
    `,
        className: 'custom-div-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
};

const SatelliteResourceMap = () => {
    const [isLoading, setIsLoading] = useState(true);
    const mapCenter = [23.4735, 77.2177]; // Central India coordinates

    // Resource data with real coordinates and precise boundaries
    const resources = [
        {
            id: 1,
            type: 'forest',
            name: 'Dense Forest Reserve',
            area: '245.7 hectares',
            boundaries: [
                [23.485, 77.205],
                [23.495, 77.225],
                [23.485, 77.240],
                [23.475, 77.230],
                [23.480, 77.210]
            ],
            center: [23.485, 77.222],
            color: '#10b981',
            icon: MdForest,
            details: 'Mixed deciduous forest with 85% canopy cover, part of central India forest belt',
            biodiversity: 'High',
            protection_status: 'Protected Reserve',
            species_count: '150+ species'
        },
        {
            id: 2,
            type: 'water',
            name: 'Seasonal Water Body',
            area: '12.3 hectares',
            boundaries: [
                [23.465, 77.255],
                [23.470, 77.270],
                [23.455, 77.275],
                [23.450, 77.260],
                [23.460, 77.250]
            ],
            center: [23.460, 77.262],
            color: '#3b82f6',
            icon: MdWaves,
            details: 'Natural water reservoir with seasonal variations',
            water_quality: 'Good',
            depth: 'Average 8-12 meters',
            ph_level: '7.2'
        },
        {
            id: 3,
            type: 'agricultural',
            name: 'Cultivated Agricultural Land',
            area: '89.5 hectares',
            boundaries: [
                [23.455, 77.185],
                [23.465, 77.195],
                [23.460, 77.210],
                [23.445, 77.205],
                [23.450, 77.190]
            ],
            center: [23.455, 77.198],
            color: '#f59e0b',
            icon: MdGrass,
            details: 'Fertile agricultural land suitable for multiple crop cycles',
            soil_type: 'Alluvial',
            crop_season: 'Rabi & Kharif',
            productivity: 'High yield'
        },
        {
            id: 4,
            type: 'mineral',
            name: 'Mineral Exploration Zone',
            area: '34.2 hectares',
            boundaries: [
                [23.435, 77.245],
                [23.440, 77.260],
                [23.425, 77.270],
                [23.415, 77.255],
                [23.430, 77.240]
            ],
            center: [23.430, 77.254],
            color: '#8b5cf6',
            icon: MdDiamond,
            details: 'Geological survey indicates potential mineral deposits',
            minerals: 'Iron ore, Bauxite',
            exploration_status: 'Under Survey',
            potential_yield: 'Medium-High'
        }
    ];

    useEffect(() => {
        // Fix for default markers in Leaflet with webpack
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '/marker-icon-2x.png',
            iconUrl: '/marker-icon.png',
            shadowUrl: '/marker-shadow.png',
        });

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    if (isLoading) {
        return (
            <div style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                position: "relative",
                overflow: "hidden"
            }}>
                <MdSatellite style={{
                    fontSize: "48px",
                    marginBottom: "12px",
                    color: "#60a5fa",
                    animation: "pulse 2s infinite"
                }} />
                <div style={{ fontSize: "14px", textAlign: "center", zIndex: 1 }}>
                    Loading Leaflet satellite map...
                    <br />
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>
                        Initializing interactive boundaries
                    </span>
                </div>
                <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
            </div>
        );
    }

    return (
        <div style={{
            width: "100%",
            height: "400px",
            borderRadius: "8px",
            overflow: "hidden",
            position: "relative"
        }}>
            <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                {/* High-resolution satellite imagery layer */}
                <TileLayer
                    attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={18}
                />

                {/* Resource boundaries and markers */}
                {resources.map((resource) => (
                    <React.Fragment key={resource.id}>
                        {/* Polygon boundaries with hover effects */}
                        <Polygon
                            positions={resource.boundaries}
                            pathOptions={{
                                fillColor: resource.color,
                                fillOpacity: 0.35,
                                color: resource.color,
                                weight: 3,
                                opacity: 0.8,
                                dashArray: resource.type === 'mineral' ? '10, 5' : null
                            }}
                            eventHandlers={{
                                mouseover: (e) => {
                                    e.target.setStyle({
                                        fillOpacity: 0.55,
                                        weight: 4,
                                        opacity: 1
                                    });
                                },
                                mouseout: (e) => {
                                    e.target.setStyle({
                                        fillOpacity: 0.35,
                                        weight: 3,
                                        opacity: 0.8
                                    });
                                }
                            }}
                        />

                        {/* Resource markers with detailed popups */}
                        <Marker
                            position={resource.center}
                            icon={createCustomIcon(resource.icon, resource.color)}
                        >
                            <Popup maxWidth={320} minWidth={250}>
                                <div style={{ padding: "12px" }}>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        marginBottom: "12px",
                                        borderBottom: "2px solid " + resource.color,
                                        paddingBottom: "8px"
                                    }}>
                                        <div style={{
                                            color: resource.color,
                                            fontSize: "20px"
                                        }}>
                                            {resource.icon === MdForest ? '🌲' :
                                                resource.icon === MdWaves ? '💧' :
                                                    resource.icon === MdGrass ? '🌾' : '💎'}
                                        </div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            color: "#1f2937"
                                        }}>
                                            {resource.name}
                                        </h4>
                                    </div>

                                    <div style={{
                                        fontSize: "13px",
                                        color: "#4b5563",
                                        marginBottom: "10px",
                                        backgroundColor: "#f9fafb",
                                        padding: "8px",
                                        borderRadius: "6px"
                                    }}>
                                        <strong>Total Area:</strong> {resource.area}
                                    </div>

                                    <div style={{
                                        fontSize: "12px",
                                        color: "#374151",
                                        lineHeight: "1.5",
                                        marginBottom: "10px"
                                    }}>
                                        {resource.details}
                                    </div>

                                    <div style={{
                                        fontSize: "11px",
                                        color: "#6b7280",
                                        borderTop: "1px solid #e5e7eb",
                                        paddingTop: "8px",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: "4px"
                                    }}>
                                        {resource.biodiversity && (
                                            <div><strong>Biodiversity:</strong> {resource.biodiversity}</div>
                                        )}
                                        {resource.protection_status && (
                                            <div><strong>Status:</strong> {resource.protection_status}</div>
                                        )}
                                        {resource.species_count && (
                                            <div><strong>Species:</strong> {resource.species_count}</div>
                                        )}
                                        {resource.water_quality && (
                                            <div><strong>Water Quality:</strong> {resource.water_quality}</div>
                                        )}
                                        {resource.depth && (
                                            <div><strong>Depth:</strong> {resource.depth}</div>
                                        )}
                                        {resource.ph_level && (
                                            <div><strong>pH Level:</strong> {resource.ph_level}</div>
                                        )}
                                        {resource.soil_type && (
                                            <div><strong>Soil Type:</strong> {resource.soil_type}</div>
                                        )}
                                        {resource.crop_season && (
                                            <div><strong>Season:</strong> {resource.crop_season}</div>
                                        )}
                                        {resource.productivity && (
                                            <div><strong>Productivity:</strong> {resource.productivity}</div>
                                        )}
                                        {resource.minerals && (
                                            <div><strong>Minerals:</strong> {resource.minerals}</div>
                                        )}
                                        {resource.exploration_status && (
                                            <div><strong>Exploration:</strong> {resource.exploration_status}</div>
                                        )}
                                        {resource.potential_yield && (
                                            <div><strong>Potential:</strong> {resource.potential_yield}</div>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MapContainer>

            {/* Enhanced satellite data indicator */}
            <div style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                backgroundColor: "rgba(0,0,0,0.85)",
                color: "white",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "11px",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)"
            }}>
                <MdSatellite style={{ fontSize: "16px", color: "#60a5fa" }} />
                <div>
                    <div style={{ fontWeight: "600" }}>Leaflet + Satellite Imagery</div>
                    <div style={{ fontSize: "10px", color: "#9ca3af" }}>Interactive boundaries & markers</div>
                </div>
            </div>

            {/* Resource legend */}
            <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "8px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                fontSize: "11px",
                minWidth: "140px",
                zIndex: 1000,
                border: "1px solid rgba(0,0,0,0.1)"
            }}>
                <div style={{ fontWeight: "600", marginBottom: "8px", color: "#333", fontSize: "12px" }}>
                    Resource Legend
                </div>
                {resources.map((resource) => (
                    <div key={resource.id} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px"
                    }}>
                        <div style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: resource.color,
                            borderRadius: "2px",
                            border: resource.type === 'mineral' ? '1px dashed #666' : 'none'
                        }}></div>
                        <span style={{ color: "#374151", fontSize: "10px" }}>
                            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)} Area
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SatelliteResourceMap;