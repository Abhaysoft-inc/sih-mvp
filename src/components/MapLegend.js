"use client";

import { useState } from "react";

export default function MapLegend() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const legendItems = [
        { color: "#22c55e", label: "Forest Areas" },
        { color: "#3b82f6", label: "Water Bodies" },
        { color: "#f59e0b", label: "Agricultural Land" },
        { color: "#ef4444", label: "Settlement Areas" },
        { color: "#8b5cf6", label: "Protected Areas" },
        { color: "#6b7280", label: "Roads" },
    ];

    return (
        <div className="absolute bottom-3 z-1000 bg-white rounded-lg max-w-[14rem] border border-gray-200 text-[11.5px]"
            style={{ left: 'var(--sidebar-left-offset)' }}>
            {/* Legend Header */}
            <div
                className="flex items-center justify-between p-2 cursor-pointer border-b border-gray-200"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                <h3 className="text-xs font-semibold text-gray-800">Map Legend</h3>
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                    {isCollapsed ? "▼" : "▲"}
                </button>
            </div>

            {/* Legend Content */}
            {!isCollapsed && (
                <div className="p-2">
                    <div className="space-y-1.5">
                        {legendItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2.5">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-[11px] text-gray-700">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Scale Information */}
                    <div className="mt-3 pt-2 border-t border-gray-200">
                        <p className="text-[11px] text-gray-600 mb-1.5">Scale Information</p>
                        <div className="flex items-center space-x-2">
                            <div className="h-0.5 bg-gray-800" style={{ width: "36px" }}></div>
                            <span className="text-[11px] text-gray-600">5 km</span>
                        </div>
                    </div>

                    {/* Coordinates Display */}
                    <div className="mt-2 p-2 bg-gray-50 rounded text-[11px] text-gray-600">
                        <div>Lat: 20.9517°N</div>
                        <div>Lng: 85.0985°E</div>
                    </div>
                </div>
            )}
        </div>
    );
}