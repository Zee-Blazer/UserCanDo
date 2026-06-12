
"use client";

import { ReactNode, useEffect, useState } from "react";

interface DetailItem {
    label: string;
    value: ReactNode;
    key?: string;
    type?: "text" | "select";
    options?: string[];
}

interface MappedDetailsProps {
    title?: string;
    details: DetailItem[];
    className?: string;
    form?: boolean;
    onChange?: (updatedDetails: Record<string, string>) => void;
}

const MappedDetails = ({ title = "Information", details, className = "", form = false, onChange }: MappedDetailsProps) => {
    const [editableValues, setEditableValues] = useState<Record<string, string>>({});

    useEffect(() => {
        if (form) {
            const initialValues: Record<string, string> = {};
            details.forEach((detail) => {
                const key = detail.key || detail.label.toLowerCase().replace(/\s+/g, '_');
                initialValues[key] = String(detail.value || '');
            });
            setEditableValues(initialValues);
        }
    }, [details, form]);

    const handleInputChange = (key: string, value: string) => {
        const updatedValues = { ...editableValues, [key]: value };
        setEditableValues(updatedValues);
        onChange?.(updatedValues);
    };

    return (
        <div className={className}>
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {details.map((info) => {
                    const key = info.key || info.label.toLowerCase().replace(/\s+/g, '_');

                    if (form) {
                        if (info.type === "select" && info.options) {
                            return (
                                <div key={info.label}>
                                    <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                                    <select
                                        value={editableValues[key] || ''}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-medium text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select {info.label.toLowerCase()}</option>
                                        {info.options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }

                        return (
                            <div key={info.label}>
                                <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                                <input
                                    type="text"
                                    value={editableValues[key] || ''}
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-base font-medium text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={`Enter ${info.label.toLowerCase()}`}
                                />
                            </div>
                        );
                    }

                    return (
                        <div key={info.label}>
                            <p className="text-xs text-gray-500 mb-1">{info.label}</p>
                            <p className="text-base font-medium text-[#1E1E1E]">{info.value}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MappedDetails;
