import React, { useState } from "react";
import { MdLocationOn, MdBarChart, MdPeople, MdExpandMore, MdExpandLess } from "react-icons/md";

const RecommendedScheme = ({
    schemeName,
    priority,
    priorityColor,
    matchScore,
    fullName,
    location,
    description,
    details,
    evidence,
    summary,
    actions,
}) => {
    const [showBeneficiaries, setShowBeneficiaries] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Sample beneficiary data - in real implementation, this would come from props or API
    const beneficiaries = [
        { id: 1, name: "Ramesh Kumar", village: "Bhamragad", landSize: "2.5 acres", familySize: 4, status: "Eligible" },
        { id: 2, name: "Sunita Devi", village: "Bhamragad", landSize: "1.8 acres", familySize: 5, status: "Eligible" },
        { id: 3, name: "Mohan Singh", village: "Bhamragad", landSize: "3.2 acres", familySize: 6, status: "Eligible" },
        { id: 4, name: "Priya Sharma", village: "Bhamragad", landSize: "2.1 acres", familySize: 3, status: "Eligible" },
        { id: 5, name: "Rajesh Patel", village: "Bhamragad", landSize: "4.0 acres", familySize: 7, status: "Eligible" },
        { id: 6, name: "Anita Gupta", village: "Bhamragad", landSize: "1.5 acres", familySize: 4, status: "Eligible" },
        { id: 7, name: "Suresh Yadav", village: "Bhamragad", landSize: "2.8 acres", familySize: 5, status: "Eligible" },
        { id: 8, name: "Meera Joshi", village: "Bhamragad", landSize: "3.5 acres", familySize: 6, status: "Eligible" },
    ];

    // Detailed scheme information
    const schemeDetails = {
        "PM-KISAN": {
            objectives: "To provide income support to all landholding farmers' families to supplement their financial needs for procuring inputs and other farm expenditures.",
            eligibility: "All landholding farmers' families having cultivable land holding in their names are eligible for benefits.",
            benefits: "₹6,000 per year in three equal installments of ₹2,000 each, directly transferred to bank accounts.",
            documents: ["Land ownership documents", "Aadhaar card", "Bank account details", "Mobile number"],
            timeline: "Disbursement every 4 months - April-July, August-November, December-March",
            contact: "District Agriculture Officer or visit www.pmkisan.gov.in"
        },
        "Jal Jeevan Mission": {
            objectives: "To provide safe and adequate drinking water through individual household tap connections by 2024.",
            eligibility: "All rural households without tap water connections are eligible for coverage under the mission.",
            benefits: "Functional household tap connection with assured water supply of prescribed quality on regular and long-term basis.",
            documents: ["Household survey form", "Identity proof", "Address proof", "Bank account details"],
            timeline: "Implementation in phases based on village priority and water source availability",
            contact: "District Water and Sanitation Mission or visit jaljeevanmission.gov.in"
        },
        "MGNREGA": {
            objectives: "To enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment.",
            eligibility: "Adult members of any rural household willing to do public work-related unskilled manual work.",
            benefits: "Guaranteed 100 days of employment per household per year with wages as per state minimum wage act.",
            documents: ["Job card application", "Address proof", "Identity proof", "Bank account details"],
            timeline: "Work to be provided within 15 days of demand, unemployment allowance if work not provided",
            contact: "Gram Panchayat or Block Development Office or visit nrega.nic.in"
        }
    };

    const currentSchemeDetails = schemeDetails[schemeName] || {}

    return (
    <div className="bg-white border border-gray-300 rounded-md p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5"
        >
            <div className="flex items-center gap-3">
                <h3 
                    className="text-lg font-semibold text-gray-800 m-0 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => setShowBeneficiaries(!showBeneficiaries)}
                >
                    {schemeName}
                </h3>
                <span
                    style={{ backgroundColor: priorityColor }}
                    className="px-2 py-1 text-white rounded text-xs font-semibold"
                >
                    {priority.toUpperCase()}
                </span>
            </div>
            <div className="text-right">
                <div className="text-xs text-gray-600 mb-1">
                    MATCH SCORE
                </div>
                <div className="text-3xl font-bold text-green-600">
                    {matchScore}%
                </div>
            </div>
        </div>

        {/* Scheme Info */}
        <div className="text-base font-semibold text-gray-800 mb-2">
            {fullName}
        </div>
        <div className="flex items-center gap-1.5 mb-4">
            <MdLocationOn className="text-base text-gray-600" />
            <span className="text-sm text-gray-600">{location}</span>
        </div>
        <p className="text-sm text-gray-800 leading-6 mb-4">
            {description}
        </p>
        <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 italic mb-5">
            {details}
        </div>

        {/* Supporting Evidence */}
        {evidence && (
            <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-800 m-0 mb-3 flex items-center gap-1.5">
                    <MdBarChart className="text-blue-600" /> Supporting Evidence
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {evidence.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 p-3 rounded text-center"
                        >
                            <div className="text-xs text-gray-600 mb-1 uppercase tracking-wider">
                                {item.label}
                            </div>
                            <div className="text-lg font-bold text-gray-800">
                                {item.value}
                            </div>
                            <div className="text-xs text-gray-600">
                                {item.subtext}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {summary.map((s, i) => (
                        <div
                            key={i}
                            style={{ backgroundColor: s.color }}
                            className="py-2 px-3 rounded text-center text-xs font-semibold"
                        >
                            {s.text}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Beneficiaries Button */}
        <div className="mb-4">
            <button
                onClick={() => setShowBeneficiaries(!showBeneficiaries)}
                className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
            >
                <MdPeople className="text-base" />
                View Eligible Beneficiaries ({beneficiaries.length})
                {showBeneficiaries ? <MdExpandLess /> : <MdExpandMore />}
            </button>
        </div>

        {/* Beneficiaries Table */}
        {showBeneficiaries && (
            <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b border-gray-200">
                    <h5 className="text-sm font-semibold text-gray-800 m-0 flex items-center gap-2">
                        <MdPeople className="text-blue-600" />
                        Eligible Beneficiaries - {schemeName}
                    </h5>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">S.No.</th>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Beneficiary Name</th>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Village</th>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Land Size</th>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Family Size</th>
                                <th className="text-left p-3 font-semibold text-gray-700 border-b border-gray-200">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {beneficiaries.map((beneficiary, index) => (
                                <tr key={beneficiary.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 border-b border-gray-100">{index + 1}</td>
                                    <td className="p-3 border-b border-gray-100 font-medium text-gray-800">{beneficiary.name}</td>
                                    <td className="p-3 border-b border-gray-100 text-gray-600">{beneficiary.village}</td>
                                    <td className="p-3 border-b border-gray-100 text-gray-600">{beneficiary.landSize}</td>
                                    <td className="p-3 border-b border-gray-100 text-gray-600">{beneficiary.familySize}</td>
                                    <td className="p-3 border-b border-gray-100">
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                                            {beneficiary.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-gray-50 p-3 border-t border-gray-200 text-xs text-gray-600">
                    Total Eligible Beneficiaries: {beneficiaries.length}
                </div>
            </div>
        )}

        {/* Detailed Scheme Information */}
        {showDetails && (
            <div className="mb-4 border border-blue-200 rounded-lg overflow-hidden bg-blue-50">
                <div className="bg-blue-100 p-3 border-b border-blue-200">
                    <h5 className="text-sm font-semibold text-blue-800 m-0">
                        Detailed Information - {fullName}
                    </h5>
                </div>
                <div className="p-4 space-y-4">
                    {currentSchemeDetails.objectives && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Objectives</h6>
                            <p className="text-sm text-gray-600 leading-relaxed">{currentSchemeDetails.objectives}</p>
                        </div>
                    )}
                    
                    {currentSchemeDetails.eligibility && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Eligibility Criteria</h6>
                            <p className="text-sm text-gray-600 leading-relaxed">{currentSchemeDetails.eligibility}</p>
                        </div>
                    )}
                    
                    {currentSchemeDetails.benefits && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Benefits</h6>
                            <p className="text-sm text-gray-600 leading-relaxed">{currentSchemeDetails.benefits}</p>
                        </div>
                    )}
                    
                    {currentSchemeDetails.documents && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Required Documents</h6>
                            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                                {currentSchemeDetails.documents.map((doc, index) => (
                                    <li key={index}>{doc}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {currentSchemeDetails.timeline && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Implementation Timeline</h6>
                            <p className="text-sm text-gray-600 leading-relaxed">{currentSchemeDetails.timeline}</p>
                        </div>
                    )}
                    
                    {currentSchemeDetails.contact && (
                        <div>
                            <h6 className="text-sm font-semibold text-gray-800 mb-2">Contact Information</h6>
                            <p className="text-sm text-gray-600 leading-relaxed">{currentSchemeDetails.contact}</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
            {actions.map((a, i) => (
                <button
                    key={i}
                    onClick={() => {
                        if (a.label === "• Details") {
                            setShowDetails(!showDetails);
                        }
                    }}
                    className={`py-2 px-4 rounded text-sm font-medium cursor-pointer transition-colors ${a.primary
                        ? "bg-blue-600 text-white border-none hover:bg-blue-700"
                        : a.label === "• Details" 
                            ? `${showDetails ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-white text-gray-600 border border-gray-300'} hover:bg-blue-50`
                            : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                        }`}
                >
                    {a.label === "• Details" && showDetails ? "• Hide Details" : a.label}
                </button>
            ))}
        </div>
    </div>
    );
};

export default RecommendedScheme;
