"use client";

import { useState } from "react";

export default function MapTools() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLayer, setActiveLayer] = useState("satellite");
    const [measureMode, setMeasureMode] = useState(false);
    const [drawMode, setDrawMode] = useState(false);

    const handleLayerChange = (layer) => {
        setActiveLayer(layer);
        console.log(`Switched to ${layer} layer`);
        // Here you would implement the actual layer switching logic
    };

    const toggleMeasure = () => {
        setMeasureMode(!measureMode);
        console.log(`Measure mode: ${!measureMode ? 'enabled' : 'disabled'}`);
        // Here you would implement measurement functionality
    };

    const toggleDraw = () => {
        setDrawMode(!drawMode);
        console.log(`Draw mode: ${!drawMode ? 'enabled' : 'disabled'}`);
        // Here you would implement drawing functionality
    };

    const exportData = () => {
        console.log("Exporting map data...");
        // Here you would implement data export functionality
    };

    const resetView = () => {
        console.log("Resetting map view...");
        // Here you would reset the map to default view
    };

    return (
        <div className="absolute top-4 right-4 z-1000 bg-white rounded-lg shadow-lg max-w-xs">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-800">Map Tools</h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                    {isOpen ? "×" : "⚙️"}
                </button>
            </div>

            {isOpen && (
                <div className="p-3">

                    {/* Layer Selector */}
                    <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                            Map Layer
                        </label>
                        <select
                            value={activeLayer}
                            onChange={(e) => handleLayerChange(e.target.value)}
                            className="w-full text-xs p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                            <option value="satellite">Satellite</option>
                            <option value="terrain">Terrain</option>
                            <option value="forest">Forest Cover</option>
                            <option value="administrative">Administrative</option>
                            <option value="roads">Roads</option>
                        </select>
                    </div>

                    {/* Tool Buttons */}
                    <div className="space-y-2">
                        {/* Measure Tool */}
                        <button
                            onClick={toggleMeasure}
                            className={`w-full text-xs py-2 px-3 rounded font-medium transition-colors ${measureMode
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            📏 {measureMode ? "Stop Measuring" : "Measure Distance"}
                        </button>

                        {/* Draw Tool */}
                        <button
                            onClick={toggleDraw}
                            className={`w-full text-xs py-2 px-3 rounded font-medium transition-colors ${drawMode
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            ✏️ {drawMode ? "Stop Drawing" : "Draw Boundaries"}
                        </button>

                        {/* Location Tools */}
                        <button
                            onClick={resetView}
                            className="w-full text-xs py-2 px-3 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
                        >
                            🎯 Reset View
                        </button>

                        {/* Export Tool */}
                        <button
                            onClick={exportData}
                            className="w-full text-xs py-2 px-3 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
                        >
                            💾 Export Data
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Quick Actions</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button className="text-xs py-1 px-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors">
                                🌲 Forest Areas
                            </button>
                            <button className="text-xs py-1 px-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors">
                                💧 Water Bodies
                            </button>
                            <button className="text-xs py-1 px-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors">
                                🏘️ Settlements
                            </button>
                            <button className="text-xs py-1 px-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors">
                                🛤️ Roads
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}