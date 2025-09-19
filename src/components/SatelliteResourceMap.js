"use client"

import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MdSatellite, MdForest, MdWaves, MdGrass, MdDiamond, MdLocationOn } from "react-icons/md";
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
  const [selectedResource, setSelectedResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const mapCenter = [23.4735, 77.2177]; // Central India coordinates
  
  // Resource data with real coordinates and boundaries
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
      protection_status: 'Protected Reserve'
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
      depth: 'Average 8-12 meters'
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
      crop_season: 'Rabi & Kharif'
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
      exploration_status: 'Under Survey'
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
        {/* Satellite imagery layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        
        {/* Resource boundaries and markers */}
        {resources.map((resource) => (
          <React.Fragment key={resource.id}>
            {/* Polygon boundaries */}
            <Polygon
              positions={resource.boundaries}
              pathOptions={{
                fillColor: resource.color,
                fillOpacity: 0.4,
                color: resource.color,
                weight: 3,
                opacity: 0.8
              }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setStyle({
                    fillOpacity: 0.6,
                    weight: 4
                  });
                },
                mouseout: (e) => {
                  e.target.setStyle({
                    fillOpacity: 0.4,
                    weight: 3
                  });
                }
              }}
            />
            
            {/* Resource markers */}
            <Marker
              position={resource.center}
              icon={createCustomIcon(resource.icon, resource.color)}
            >
              <Popup maxWidth={300} minWidth={200}>
                <div style={{ padding: "8px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <div style={{
                      color: resource.color,
                      fontSize: "18px"
                    }}>
                      {resource.icon === MdForest ? '🌲' : 
                       resource.icon === MdWaves ? '💧' : 
                       resource.icon === MdGrass ? '🌾' : '💎'}
                    </div>
                    <h4 style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1f2937"
                    }}>
                      {resource.name}
                    </h4>
                  </div>
                  
                  <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                    <strong>Area:</strong> {resource.area}
                  </div>
                  
                  <div style={{ fontSize: "12px", color: "#374151", lineHeight: "1.4", marginBottom: "8px" }}>
                    {resource.details}
                  </div>
                  
                  <div style={{ fontSize: "11px", color: "#6b7280", borderTop: "1px solid #e5e7eb", paddingTop: "6px" }}>
                    {resource.biodiversity && <div><strong>Biodiversity:</strong> {resource.biodiversity}</div>}
                    {resource.protection_status && <div><strong>Status:</strong> {resource.protection_status}</div>}
                    {resource.water_quality && <div><strong>Water Quality:</strong> {resource.water_quality}</div>}
                    {resource.depth && <div><strong>Depth:</strong> {resource.depth}</div>}
                    {resource.soil_type && <div><strong>Soil:</strong> {resource.soil_type}</div>}
                    {resource.crop_season && <div><strong>Season:</strong> {resource.crop_season}</div>}
                    {resource.minerals && <div><strong>Minerals:</strong> {resource.minerals}</div>}
                    {resource.exploration_status && <div><strong>Exploration:</strong> {resource.exploration_status}</div>}
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
      
      {/* Satellite data indicator */}
      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "12px",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "11px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "6px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
      }}>
        <MdSatellite style={{ fontSize: "14px" }} />
        <span>Leaflet + Satellite Imagery</span>
      </div>
    </div>
        );
    }

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: "100%",
                height: "400px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "crosshair"
            }}
            onClick={closePopup}
        >
            {/* Real satellite imagery using Google Maps Satellite */}
            <iframe
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${mapCenter.lng}!3d${mapCenter.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1695123456789!5m2!1sen!2sin`}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
                loading="lazy"
                allowFullScreen=""
                referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Resource overlay polygons */}
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 2
                }}
            >
                {resources.map((resource, index) => {
                    // Convert lat/lng to relative SVG coordinates (simplified conversion)
                    const points = resource.coordinates.map(([lat, lng]) => {
                        const x = ((lng - (mapCenter.lng - 0.02)) / 0.04) * 100;
                        const y = (((mapCenter.lat + 0.015) - lat) / 0.03) * 100;
                        return `${x}%,${y}%`;
                    }).join(' ');

                    return (
                        <polygon
                            key={resource.id}
                            points={points}
                            fill={`${resource.color}40`}
                            stroke={resource.color}
                            strokeWidth="2"
                            style={{
                                pointerEvents: "all",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleResourceClick(resource, e);
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.fill = `${resource.color}60`;
                                e.target.style.strokeWidth = "3";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.fill = `${resource.color}40`;
                                e.target.style.strokeWidth = "2";
                            }}
                        />
                    );
                })}
            </svg>

            {/* Resource markers */}
            {resources.map((resource) => {
                const centerLat = resource.coordinates.reduce((sum, coord) => sum + coord[0], 0) / resource.coordinates.length;
                const centerLng = resource.coordinates.reduce((sum, coord) => sum + coord[1], 0) / resource.coordinates.length;

                const x = ((centerLng - (mapCenter.lng - 0.02)) / 0.04) * 100;
                const y = (((mapCenter.lat + 0.015) - centerLat) / 0.03) * 100;

                const IconComponent = resource.icon;

                return (
                    <div
                        key={`marker-${resource.id}`}
                        style={{
                            position: "absolute",
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                            zIndex: 3,
                            pointerEvents: "all",
                            cursor: "pointer"
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleResourceClick(resource, e);
                        }}
                    >
                        <div style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            border: `2px solid ${resource.color}`,
                            transition: "all 0.3s ease"
                        }}>
                            <IconComponent style={{ color: resource.color, fontSize: "16px" }} />
                        </div>
                    </div>
                );
            })}

            {/* Resource information popup */}
            {selectedResource && (
                <div
                    style={{
                        position: "absolute",
                        left: `${Math.min(selectedResource.position?.x || 0, 250)}px`,
                        top: `${Math.max(selectedResource.position?.y || 0, 10)}px`,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                        zIndex: 10,
                        minWidth: "200px",
                        maxWidth: "280px",
                        border: `2px solid ${selectedResource.color}`,
                        pointerEvents: "all"
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px"
                    }}>
                        <selectedResource.icon style={{ color: selectedResource.color, fontSize: "20px" }} />
                        <h4 style={{
                            margin: 0,
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#1f2937"
                        }}>
                            {selectedResource.name}
                        </h4>
                    </div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>
                        Area: {selectedResource.area}
                    </div>
                    <div style={{ fontSize: "12px", color: "#374151", lineHeight: "1.4" }}>
                        {selectedResource.details}
                    </div>
                    <button
                        onClick={closePopup}
                        style={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            background: "none",
                            border: "none",
                            fontSize: "16px",
                            cursor: "pointer",
                            color: "#9ca3af",
                            width: "20px",
                            height: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        ×
                    </button>
                </div>
            )}

            {/* Satellite data indicator */}
            <div style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "6px 10px",
                borderRadius: "4px",
                fontSize: "11px",
                zIndex: 5,
                display: "flex",
                alignItems: "center",
                gap: "4px"
            }}>
                <MdSatellite style={{ fontSize: "12px" }} />
                Live Satellite Data
            </div>
        </div>
    );
};

export default SatelliteResourceMap;