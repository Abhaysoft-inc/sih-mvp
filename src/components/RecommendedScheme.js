import React from "react";
import { MdLocationOn, MdBarChart } from "react-icons/md";

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
}) => (
    <div className="bg-white border border-gray-300 rounded-md p-5 shadow-sm"
    >
        {/* Header */}
        <div className="flex items-center justify-between mb-5"
        >
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-800 m-0">
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
                <div className="grid grid-cols-4 gap-2">
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

        {/* Action Buttons */}
        <div className="flex gap-2">
            {actions.map((a, i) => (
                <button
                    key={i}
                    className={`py-2 px-4 rounded text-sm font-medium cursor-pointer ${a.primary
                        ? "bg-blue-600 text-white border-none"
                        : "bg-white text-gray-600 border border-gray-300"
                        }`}
                >
                    {a.label}
                </button>
            ))}
        </div>
    </div>
);

export default RecommendedScheme;
