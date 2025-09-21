import React from "react";
import { MdPsychology, MdBarChart, MdAdd } from "react-icons/md";
import RecommendedScheme from "./RecommendedScheme";
const DSSSection = ({ eligibilityCriteria, handleCriteriaChange, priorityLevel, handlePriorityChange, getIcon }) => (
    <div>
        {/* DSS Header */}
        <div className="bg-white border border-gray-300 rounded-md p-5 mb-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-xl text-white">
                        <MdPsychology />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 m-0">
                            Decision Support System
                        </h2>
                        <p className="text-gray-600 m-0 text-sm">
                            FRA Scheme Recommendations
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="py-2 px-4 bg-white text-blue-600 border border-blue-600 rounded text-sm font-medium cursor-pointer flex items-center gap-1.5">
                        <MdBarChart /> Export Report
                    </button>
                    <button className="py-2 px-4 bg-blue-600 text-white border-none rounded text-sm font-medium cursor-pointer flex items-center gap-1.5">
                        <MdAdd /> Create Implementation Plan
                    </button>
                </div>
            </div>
            <div className="text-sm text-gray-600">
                29 recommendations across 5 villages • Last updated: 11/9/2025
            </div>
        </div>

        {/* Main DSS Interface (left: criteria & priority, right: schemes) */}
        <div className="grid grid-cols-[350px_1fr] gap-5">
            {/* Left Panel - Priority Cards, Criteria & Villages */}
            <div>
                {/* Priority Summary Cards */}
                <div className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800 m-0 mb-3 uppercase tracking-wider">
                        Priority Overview
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-md">
                            <div>
                                <div className="text-lg font-bold text-red-600">5</div>
                                <div className="text-xs font-semibold text-gray-800">High Priority</div>
                                <div className="text-xs text-gray-600">Immediate action</div>
                            </div>
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                !
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <div>
                                <div className="text-lg font-bold text-yellow-600">14</div>
                                <div className="text-xs font-semibold text-gray-800">Medium Priority</div>
                                <div className="text-xs text-gray-600">Next quarter</div>
                            </div>
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                ●
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                            <div>
                                <div className="text-lg font-bold text-green-600">10</div>
                                <div className="text-xs font-semibold text-gray-800">Low Priority</div>
                                <div className="text-xs text-gray-600">Long-term</div>
                            </div>
                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                ✓
                            </div>
                        </div>
                    </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800 m-0 mb-3 uppercase tracking-wider">
                        Eligibility Criteria
                    </h4>
                    {eligibilityCriteria.map((criteria, index) => (
                        <div key={index} className={`flex items-center gap-2 py-2 ${index < 3 ? 'border-b border-gray-200' : ''}`}>
                            <input
                                type="checkbox"
                                checked={criteria.checked}
                                onChange={() => handleCriteriaChange(index)}
                                className="m-0"
                            />
                            <span className="text-base">{getIcon ? getIcon(criteria.icon) : criteria.icon}</span>
                            <span className="text-xs text-gray-800">
                                {criteria.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Villages Selection */}
                <div className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800 m-0 mb-3 uppercase tracking-wider">
                        Villages (0 Selected)
                    </h4>
                    {[
                        { name: "Bhamragad", claims: 1 },
                        { name: "Etapalli", claims: 1 },
                        { name: "Bijapur", claims: 1 },
                        { name: "Kanker", claims: 1 },
                        { name: "Mandla", claims: 1 }
                    ].map((village, index) => (
                        <div key={index} className={`flex items-center gap-2 py-2 ${index < 4 ? 'border-b border-gray-200' : ''}`}>
                            <input
                                type="checkbox"
                                className="m-0"
                            />
                            <span className="text-xs text-gray-800 flex-1">
                                {village.name} ({village.claims} claims)
                            </span>
                        </div>
                    ))}
                </div>

                {/* Priority Levels */}
                <div className="bg-white border border-gray-300 rounded-md p-4 shadow-sm">
                    <h4 className="text-sm font-semibold text-gray-800 m-0 mb-3 uppercase tracking-wider">
                        Priority Levels
                    </h4>
                    {[
                        { label: "High", color: "#dc3545" },
                        { label: "Medium", color: "#ffc107" },
                        { label: "Low", color: "#28a745" }
                    ].map((priority, index) => (
                        <div key={index} className={`flex items-center gap-2 py-2 ${index < 2 ? 'border-b border-gray-200' : ''}`}>
                            <input
                                type="radio"
                                name="priority"
                                checked={priorityLevel === priority.label}
                                onChange={() => handlePriorityChange(priority.label)}
                                className="m-0"
                            />
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: priority.color }}
                            />
                            <span className="text-xs text-gray-800">
                                {priority.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Right Panel - Scheme Recommendations */}
            <div>
                <div className="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 m-0">
                            Recommended Schemes
                        </h3>
                        <div className="text-sm text-gray-600">
                            3 schemes found
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-5">
                <RecommendedScheme
                    schemeName="PM-KISAN"
                    priority="High"
                    priorityColor="#dc3545"
                    matchScore={92}
                    fullName="Pradhan Mantri Kisan Samman Nidhi"
                    location="Bhamragad"
                    description="Excellent match (92%) - FRA patta holders with agricultural land identified. Direct benefit transfer recommended."
                    details="Direct income support of ₹6,000 per year to FRA beneficiaries with agricultural land. Automatic enrollment based on land records."
                    evidence={[
                        { label: "FRA Beneficiaries", value: "127", subtext: "min: 50" },
                        { label: "Agricultural Land", value: "342 ha", subtext: "min: 100 ha" },
                        { label: "Poverty Index", value: "68.0%", subtext: "min: 40.0%" },
                    ]}
                    summary={[
                        { text: "127 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹7.62L BUDGET", color: "#cce7ff" },
                        { text: "Annual DURATION", color: "#fff3cd" },
                        { text: "Ready STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />

                <RecommendedScheme
                    schemeName="Jal Jeevan Mission"
                    priority="High"
                    priorityColor="#dc3545"
                    matchScore={88}
                    fullName="Pradhan Mantri Jal Jeevan Mission"
                    location="Etapalli"
                    description="High match (88%) - Critical water scarcity identified. Priority for piped water supply infrastructure."
                    details="Providing functional household tap connections to every rural household. Includes water quality testing and source sustainability."
                    evidence={[
                        { label: "Water Coverage", value: "23%", subtext: "max: 50%" },
                        { label: "Groundwater Level", value: "0.28", subtext: "max: 0.6" },
                        { label: "Population", value: "1,247", subtext: "min: 500" },
                    ]}
                    summary={[
                        { text: "250 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹12.5L BUDGET", color: "#cce7ff" },
                        { text: "2 Years DURATION", color: "#fff3cd" },
                        { text: "Planning STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />

                <RecommendedScheme
                    schemeName="MGNREGA"
                    priority="Medium"
                    priorityColor="#ffc107"
                    matchScore={75}
                    fullName="Mahatma Gandhi National Rural Employment Guarantee Act"
                    location="Bijapur"
                    description="Good match (75%) - Rural employment opportunities for FRA beneficiaries. Forest conservation work alignment."
                    details="Guaranteed 100 days of wage employment for rural households. Focus on forest conservation and water harvesting projects."
                    evidence={[
                        { label: "Employment Rate", value: "45%", subtext: "target: 60%" },
                        { label: "Forest Area", value: "180 ha", subtext: "conservation scope" },
                        { label: "Households", value: "95", subtext: "eligible families" },
                    ]}
                    summary={[
                        { text: "95 HOUSEHOLDS", color: "#d4edda" },
                        { text: "₹9.5L BUDGET", color: "#cce7ff" },
                        { text: "Ongoing DURATION", color: "#fff3cd" },
                        { text: "Active STATUS", color: "#e2e3ff" },
                    ]}
                    actions={[
                        { label: "+ ADD TO PLAN", primary: true },
                        { label: "• Details", primary: false },
                        { label: "📄 Export", primary: false },
                    ]}
                />
                </div>
            </div>
        </div>
    </div>
);

export default DSSSection;
