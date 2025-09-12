"use client";

import { useState } from "react";

export default function MapLegend() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const legendItems = [
        { color: "#22c55e", label: "Forest Areas", icon: "🌲" },
        { color: "#3b82f6", label: "Water Bodies", icon: "💧" },
        { color: "#f59e0b", label: "Agricultural Land", icon: "🌾" },
        { color: "#ef4444", label: "Settlement Areas", icon: "🏘️" },
        { color: "#8b5cf6", label: "Protected Areas", icon: "🛡️" },
        { color: "#6b7280", label: "Roads", icon: "🛤️" },
    ];

    return (
        <div className="absolute bottom-4 left-4 z-1000 bg-white rounded-lg shadow-lg max-w-xs">
            {/* Legend Header */}
            <div
                className="flex items-center justify-between p-3 cursor-pointer border-b border-gray-200"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 className="text-sm font-semibold text-gray-800">Map Legend</h3>
                <button className="text-gray-500 hover:text-gray-700">
                    {isCollapsed ? "▼" : "▲"}
                </button>
            </div>

            {/* Legend Content */}
            {!isCollapsed && (
                <div className="p-3">
                    <div className="space-y-2">
                        {legendItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                    <div
                                        className="w-4 h-4 rounded"
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="text-lg">{item.icon}</span>
                                </div>
                                <span className="text-xs text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Scale Information */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Scale Information</p>
                        <div className="flex items-center space-x-2">
                            <div className="h-0.5 bg-gray-800" style={{ width: "40px" }}></div>
                            <span className="text-xs text-gray-600">5 km</span>
                        </div>
                    </div>

                    {/* Coordinates Display */}
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                        <div>Lat: 20.9517°N</div>
                        <div>Lng: 85.0985°E</div>
                    </div>
                </div>
            )}
        </div>
    );
}