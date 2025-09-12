"use client";

import { useState, useEffect } from "react";

export default function Sidebar({ onApply }) {
    const [statesData, setStatesData] = useState([]);
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [tehsil, setTehsil] = useState("");
    const [village, setVillage] = useState("");
    const [plot, setPlot] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    // Load states and districts data
    useEffect(() => {
        const loadStatesData = async () => {
            try {
                const response = await fetch('/data/states-and-districts.json');
                const data = await response.json();
                setStatesData(data.states || []);
            } catch (error) {
                console.error('Error loading states data:', error);
            }
        };
        loadStatesData();
    }, []);

    // Get districts for selected state
    const getDistrictsForState = (stateName) => {
        const stateData = statesData.find(s => s.state === stateName);
        return stateData ? stateData.districts : [];
    };

    // Handle state change
    const handleStateChange = (selectedState) => {
        setState(selectedState);
        setDistrict(""); // Reset district when state changes
        setTehsil(""); // Reset tehsil
        setVillage(""); // Reset village
    };

    // Handle district change
    const handleDistrictChange = (selectedDistrict) => {
        setDistrict(selectedDistrict);
        setTehsil(""); // Reset tehsil when district changes
        setVillage(""); // Reset village
    };

    // Sample tehsils for demonstration (in real app, this would come from API)
    const getSampleTehsils = (districtName) => {
        const tehsilsMap = {
            "Khordha": ["Bhubaneswar", "Jatni", "Balianta", "Khordha"],
            "Cuttack": ["Cuttack Sadar", "Salipur", "Niali", "Baranga"],
            "Puri": ["Puri Sadar", "Satyabadi", "Brahmagiri", "Delang"],
            "Balasore": ["Balasore Sadar", "Jaleswar", "Bhograi", "Basta"],
            "Mayurbhanj": ["Baripada", "Rairangpur", "Karanjia", "Udala"],
            // Add more as needed
        };
        return tehsilsMap[districtName] || ["Tehsil 1", "Tehsil 2", "Tehsil 3"];
    };

    // Sample villages for demonstration
    const getSampleVillages = (tehsilName) => {
        const villagesMap = {
            "Bhubaneswar": ["Patia", "Chandrasekharpur", "Jaydev Vihar", "Rasulgarh"],
            "Jatni": ["Jatni", "Khuntuni", "Mancheswar", "Sisupalgarh"],
            "Cuttack Sadar": ["Bidanasi", "Choudwar", "Naraj", "Kandarpur"],
            "Puri Sadar": ["Puri Town", "Penthakata", "Harachandi", "Baseli Sahi"],
            // Add more as needed
        };
        return villagesMap[tehsilName] || ["Village 1", "Village 2", "Village 3", "Village 4"];
    };

    const handleApply = () => {
        const locationData = {
            state,
            district,
            tehsil,
            village,
            plot,
        };

        if (onApply) {
            onApply(locationData);
        }
    };

    const isApplyDisabled = !state || !district || !tehsil || !village || !plot;

    if (collapsed) {
        // When collapsed, shrink the left offset so map controls and legend move left
        if (typeof document !== 'undefined') {
            // Revert to positioning controls under the hamburger button and near left edge
            document.documentElement.style.setProperty('--sidebar-left-offset', '12px');
            document.documentElement.style.setProperty('--controls-top-offset', 'calc(3.2rem + 46px)');
        }
        return (
            <button
                onClick={() => setCollapsed(false)}
                aria-label="Open location selector"
                className="fixed left-[10px] z-[1006] p-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                style={{ top: 'calc(3.2rem + 2px)' }}
                title="Open Location Selector"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-current">
                    <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
                </svg>
            </button>
        );
    }

    // When open, push the left offset to the width of the sidebar + gap (20rem + 24px)
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--sidebar-left-offset', 'calc(20rem + 24px)');
        // Reset zoom controls to default top inside the map
        document.documentElement.style.setProperty('--controls-top-offset', '0px');
    }

    return (
        <aside
            className="w-80 bg-white border border-gray-200 overflow-y-auto fixed left-3 z-[1005]"
            style={{ top: 'calc(3.2rem + 8px)', height: 'calc(100vh - 3.2rem - 16px)' }}
        >
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-green-900">Location Selector</h2>
                    <button
                        onClick={() => setCollapsed(true)}
                        aria-label="Minimize location selector"
                        className="text-gray-500 hover:text-gray-700 text-lg font-bold"
                        title="Close"
                    >
                        ×
                    </button>
                </div>
                <p className="text-xs text-gray-500 mb-4">Pick a location to filter the map and data</p>

                {/* State */}
                <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">State</label>
                <select
                    className="w-full mb-4 px-3 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-sm"
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                >
                    <option value="">Select State</option>
                    {statesData.map((stateData) => (
                        <option key={stateData.state} value={stateData.state}>
                            {stateData.state}
                        </option>
                    ))}
                </select>

                {/* District */}
                <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">District</label>
                <select
                    className="w-full mb-4 px-3 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-sm disabled:opacity-60"
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!state}
                >
                    <option value="">Select District</option>
                    {getDistrictsForState(state).map((districtName) => (
                        <option key={districtName} value={districtName}>
                            {districtName}
                        </option>
                    ))}
                </select>

                {/* Tehsil */}
                <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Tehsil</label>
                <select
                    className="w-full mb-4 px-3 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-sm disabled:opacity-60"
                    value={tehsil}
                    onChange={(e) => setTehsil(e.target.value)}
                    disabled={!district}
                >
                    <option value="">Select Tehsil</option>
                    {getSampleTehsils(district).map((tehsilName) => (
                        <option key={tehsilName} value={tehsilName}>
                            {tehsilName}
                        </option>
                    ))}
                </select>

                {/* Village */}
                <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Village</label>
                <select
                    className="w-full mb-4 px-3 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-sm disabled:opacity-60"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    disabled={!tehsil}
                >
                    <option value="">Select Village</option>
                    {getSampleVillages(tehsil).map((villageName) => (
                        <option key={villageName} value={villageName}>
                            {villageName}
                        </option>
                    ))}
                </select>

                {/* Plot */}
                <label className="block mb-1 text-xs font-semibold text-gray-700 uppercase tracking-wide">Plot No.</label>
                <input
                    type="text"
                    className="w-full mb-6 px-3 py-2 bg-white border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 text-sm disabled:opacity-60"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                    disabled={!village}
                    placeholder="Enter Plot Number"
                />

                {/* Apply Button */}
                <button
                    onClick={handleApply}
                    disabled={isApplyDisabled}
                    className={`w-full py-2.5 px-4 rounded-none font-semibold transition-all ${isApplyDisabled
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                        }`}
                >
                    Apply Selection
                </button>
            </div>
        </aside>
    );
}