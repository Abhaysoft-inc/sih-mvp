import {
    MdBrain,
    MdFileDownload,
    MdAdd,
    MdLocationOn,
    MdBarChart,
    MdCheckCircle,
    MdWater,
    MdAgriculture,
    MdForest,
    MdTrendingUp,
    MdPriority1,
    MdPriority2,
    MdPriority3
} from 'react-icons/md'

export default function DecisionSupportSystem({
    eligibilityCriteria,
    handleCriteriaChange,
    priorityLevel,
    handlePriorityChange
}) {
    const villages = [
        { name: "Bhamragad", claims: 1 },
        { name: "Etapalli", claims: 1 },
        { name: "Bijapur", claims: 1 },
        { name: "Kanker", claims: 1 },
        { name: "Mandla", claims: 1 }
    ]

    const priorityLevels = [
        { label: "High", color: "#dc3545", icon: <MdPriority1 /> },
        { label: "Medium", color: "#ffc107", icon: <MdPriority2 /> },
        { label: "Low", color: "#28a745", icon: <MdPriority3 /> }
    ]

    return (
        <div>
            {/* DSS Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                            <MdBrain className="text-xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 m-0">
                                Decision Support System
                            </h2>
                            <p className="text-gray-600 m-0 text-sm">
                                FRA Scheme Recommendations
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white text-blue-500 border border-blue-500 rounded text-sm font-medium cursor-pointer flex items-center gap-2 hover:bg-blue-50 transition-colors">
                            <MdFileDownload />
                            Export Report
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white border-none rounded text-sm font-medium cursor-pointer flex items-center gap-2 hover:bg-blue-600 transition-colors">
                            <MdAdd />
                            Create Implementation Plan
                        </button>
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    29 recommendations across 5 villages • Last updated: 11/9/2025
                </div>
            </div>

            {/* Priority Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
                    <div className="text-3xl font-bold text-red-500 mb-2">5</div>
                    <div className="text-base font-semibold text-gray-900 mb-1">High Priority</div>
                    <div className="text-xs text-gray-600">Immediate action required</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
                    <div className="text-3xl font-bold text-yellow-500 mb-2">14</div>
                    <div className="text-base font-semibold text-gray-900 mb-1">Medium Priority</div>
                    <div className="text-xs text-gray-600">Plan for next quarter</div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
                    <div className="text-3xl font-bold text-green-500 mb-2">10</div>
                    <div className="text-base font-semibold text-gray-900 mb-1">Low Priority</div>
                    <div className="text-xs text-gray-600">Long-term consideration</div>
                </div>
            </div>

            {/* Main DSS Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                {/* Left Panel - Criteria & Villages */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Eligibility Criteria */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Eligibility Criteria
                        </h4>

                        {eligibilityCriteria.map((criteria, index) => (
                            <div key={index} className={`flex items-center gap-2 py-2 ${index < 3 ? 'border-b border-gray-100' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={criteria.checked}
                                    onChange={() => handleCriteriaChange(index)}
                                    className="m-0"
                                />
                                <span className="text-base">
                                    {criteria.label.includes('Water') && <MdWater className="text-blue-500" />}
                                    {criteria.label.includes('Agriculture') && <MdAgriculture className="text-green-500" />}
                                    {criteria.label.includes('Forest') && <MdForest className="text-green-600" />}
                                    {criteria.label.includes('Poverty') && <MdTrendingUp className="text-orange-500" />}
                                </span>
                                <span className="text-xs text-gray-900">
                                    {criteria.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Villages Selection */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Villages (0 Selected)
                        </h4>

                        {villages.map((village, index) => (
                            <div key={index} className={`flex items-center gap-2 py-2 ${index < 4 ? 'border-b border-gray-100' : ''}`}>
                                <input
                                    type="checkbox"
                                    className="m-0"
                                />
                                <MdLocationOn className="text-gray-500 text-sm" />
                                <span className="text-xs text-gray-900 flex-1">
                                    {village.name} ({village.claims} claims)
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Priority Levels */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                            Priority Levels
                        </h4>

                        {priorityLevels.map((priority, index) => (
                            <div key={index} className={`flex items-center gap-2 py-2 ${index < 2 ? 'border-b border-gray-100' : ''}`}>
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
                                <span className="text-xs text-gray-900">
                                    {priority.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Panel - Scheme Recommendations */}
                <div className="lg:col-span-3">
                    {/* PM-KISAN Scheme */}
                    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-semibold text-gray-900 m-0">
                                    PM-KISAN
                                </h3>
                                <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-semibold">
                                    HIGH
                                </span>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-600 mb-1">
                                    MATCH SCORE
                                </div>
                                <div className="text-3xl font-bold text-green-500">
                                    92%
                                </div>
                            </div>
                        </div>

                        <div className="text-base font-semibold text-gray-900 mb-2">
                            Pradhan Mantri Kisan Samman Nidhi
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <MdLocationOn className="text-blue-500" />
                            <span className="text-sm text-gray-600">Bhamragad</span>
                        </div>

                        <p className="text-sm text-gray-900 leading-relaxed mb-4">
                            Excellent match (92%) - FRA patta holders with agricultural land identified. Direct benefit transfer recommended.
                        </p>

                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 italic mb-5">
                            Direct income support of ₹6,000 per year to FRA beneficiaries with agricultural land. Automatic enrollment based on land records.
                        </div>

                        {/* Supporting Evidence */}
                        <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <MdBarChart className="text-blue-500" />
                                Supporting Evidence
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                <div className="bg-gray-50 p-3 rounded text-center">
                                    <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">
                                        FRA Beneficiaries
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">127</div>
                                    <div className="text-xs text-gray-600">min: 50</div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded text-center">
                                    <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">
                                        Agricultural Land
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">89 ha</div>
                                    <div className="text-xs text-gray-600">avg: 0.7 ha</div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded text-center">
                                    <div className="text-xs text-gray-600 mb-1 uppercase tracking-wide">
                                        Eligibility Score
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">9.2/10</div>
                                    <div className="text-xs text-gray-600">excellent</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-green-500 text-white rounded text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
                                <MdCheckCircle />
                                Approve Recommendation
                            </button>
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}