"use client";

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CountrySelector from '../../General/form/countrySelector';

export interface InfoItem {
    label: string;
    value: string | string[];
    displayValue?: string;
    switch?: boolean;
    checkList?: boolean;
    editable?: boolean;
    field?: string;
    select?: boolean;
    options?: { label: string; value: string }[];
    placeholder?: string;
    type?: string;
    custom?: boolean;
    multiline?: boolean;
    multiple?: boolean;
}

interface Props {
    title: string;
    btnTitle?: string;
    check?: boolean;
    infoItems: InfoItem[];
    onSave?: (data: Record<string, any>) => Promise<void>;
    isLoading?: boolean;
    showEditButton?: boolean;
    renderCustomField?: (item: InfoItem, idx: number, formValues: { [idx: number]: string | File }, handleInputChange: (idx: number, value: string | File, item: InfoItem) => void) => React.ReactNode;
}


const EditInfo = ({ title, infoItems, btnTitle, check, onSave, isLoading, showEditButton = true, renderCustomField }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [checked, setChecked] = useState<{ [itemIdx: number]: boolean[] }>({});
    const [switchStates, setSwitchStates] = useState<{ [idx: number]: boolean }>(
        () => Object.fromEntries(infoItems.map((item, idx) => [idx, item.value === 'true']))
    );
    const [formValues, setFormValues] = useState<{ [idx: number]: string | File }>(
        () => Object.fromEntries(infoItems.map((item, idx) => {
            const value = typeof item.value === 'string' ? item.value : '';
            if (item.editable && (value === 'Loading...' || value.includes('Not Provided') || value.includes('Not Specified'))) {
                return [idx, ''];
            }
            return [idx, value];
        }))
    );
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isEditing) {
            setFormValues(
                Object.fromEntries(infoItems.map((item, idx) => {
                    const value = typeof item.value === 'string' ? item.value : '';
                    if (item.editable && (value === 'Loading...' || value.includes('Not Provided') || value.includes('Not Specified'))) {
                        return [idx, ''];
                    }
                    return [idx, value];
                }))
            );
        }
    }, [infoItems, isEditing]);

    const handleCheck = (itemIdx: number, valIdx: number) => {
        setChecked(prev => {
            const arr = prev[itemIdx] ? [...prev[itemIdx]] : [];
            arr[valIdx] = !arr[valIdx];
            return { ...prev, [itemIdx]: arr };
        });
    };

    const handleSwitchToggle = (idx: number) => {
        setSwitchStates(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    const handleInputChange = (idx: number, value: string | File, item: InfoItem) => {
        if (item.type === 'file' && value instanceof File) {
            setFormValues(prev => ({ ...prev, [idx]: value }));
            return;
        }

        if (item.type === 'tel' && typeof value === 'string') {
            const numericValue = value.replace(/[^\d+]/g, '');
            const cleanValue = numericValue.startsWith('+') ?
                '+' + numericValue.slice(1).replace(/[^\d]/g, '') :
                numericValue;
            setFormValues(prev => ({ ...prev, [idx]: cleanValue }));
        } else if (typeof value === 'string') {
            setFormValues(prev => ({ ...prev, [idx]: value }));
        }
    };

    const handleMultiSelectChange = (idx: number, e: React.ChangeEvent<HTMLSelectElement>, item: InfoItem) => {
        const values = Array.from(e.target.selectedOptions).map(o => o.value);
        // store as comma-separated string (server expects CSV)
        const joined = values.join(',');
        setFormValues(prev => ({ ...prev, [idx]: joined }));
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormValues(Object.fromEntries(infoItems.map((item, idx) => {
            const value = typeof item.value === 'string' ? item.value : '';
            // For editable fields, don't set "Loading..." or placeholder text
            if (item.editable && (value === 'Loading...' || value.includes('Not Provided') || value.includes('Not Specified'))) {
                return [idx, ''];
            }
            return [idx, value];
        })));
        setIsEditing(false);
    };

    const handleSave = async () => {
        if (!onSave) return;

        setSaving(true);
        try {
            const updateData: Record<string, any> = {};

            infoItems.forEach((item, idx) => {
                if (item.field) {
                    const currentValue = formValues[idx];
                    const hasChanged = currentValue !== item.value;

                    if (item.type === 'file' && currentValue instanceof File) {
                        updateData[item.field] = currentValue;
                    } else if (item.editable && hasChanged) {
                        updateData[item.field] = currentValue;
                    }
                }
            });

            if (Object.keys(updateData).length > 0) {
                await onSave(updateData);
                toast.success('Settings updated successfully');
            }
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update settings');
            console.error('Save error:', error);
        } finally {
            setSaving(false);
        }
    };

    // Helper to render editable fields
    const renderEditableField = (item: InfoItem, idx: number) => {
        // Check if custom render function is provided
        if (item.type === 'avatar' && renderCustomField) {
            return renderCustomField(item, idx, formValues, handleInputChange);
        }

        if (item.type === 'file') {
            return (
                <div className="flex flex-col gap-3">
                    <div className="relative">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleInputChange(idx, file, item);
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            id={`file-input-${idx}`}
                        />
                        <label
                            htmlFor={`file-input-${idx}`}
                            className="flex items-center justify-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200 bg-white"
                        >
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">
                                    {formValues[idx] instanceof File ? 'Change file' : 'Choose NDA Template'}
                                </p>
                                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                            </div>
                        </label>
                    </div>
                    {formValues[idx] instanceof File && (
                        <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-green-700 font-medium">
                                Selected: {(formValues[idx] as File).name}
                            </span>
                        </div>
                    )}
                </div>
            );
        }

        if (item.custom) {
            return (
                <div className="text-sm md:text-base w-full" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <CountrySelector
                        label=""
                        value={formValues[idx] as string || ''}
                        onChange={(value) => handleInputChange(idx, value, item)}
                        placeholder={isLoading ? 'Loading...' : (item.placeholder || 'Select a country')}
                        showFlags={true}
                        showFlagsInSelected={false}
                        borderColor="#d1d5db"
                    />
                </div>
            );
        }

        if (item.select && item.options) {
            if (item.multiple) {
                return (
                    <select
                        multiple
                        value={(formValues[idx] as string)?.split(',') || []}
                        onChange={(e) => handleMultiSelectChange(idx, e, item)}
                        className="text-sm md:text-base text-[#1E1E1E] border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    >
                        {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            }

            return (
                <div className="w-full" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <select
                        value={formValues[idx] as string || ''}
                        onChange={(e) => handleInputChange(idx, e.target.value, item)}
                        className="w-full text-sm md:text-base text-[#1E1E1E] border border-gray-300 rounded-[6px] px-4 py-[7px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#f9fafb] h-[37px]"
                        style={{ height: '37px', boxSizing: 'border-box' }}
                    >
                        <option value="" disabled>
                            {item.placeholder || 'Select an option'}
                        </option>
                        {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        if (item.multiline) {
            return (
                <textarea
                    value={formValues[idx] as string || ''}
                    onChange={(e) => handleInputChange(idx, e.target.value, item)}
                    rows={4}
                    className="text-sm md:text-base text-[#1E1E1E] border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={isLoading ? 'Loading...' : (item.placeholder || 'Enter value')}
                />
            );
        }

        return (
            <div className="w-full" style={{ display: 'flex', alignItems: 'stretch' }}>
                <input
                    type={item.type || 'text'}
                    value={formValues[idx] as string || ''}
                    onChange={(e) => handleInputChange(idx, e.target.value, item)}
                    className="w-full text-sm md:text-base text-[#1E1E1E] border border-gray-300 rounded-[6px] px-4 py-[7px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-[#f9fafb] h-[37px]"
                    placeholder={isLoading ? 'Loading...' : (item.placeholder || 'Enter value')}
                    style={{ height: '37px', boxSizing: 'border-box' }}
                />
            </div>
        );
    };

    return (
        <div>
            <div
                className="flex justify-between items-center p-3.5 px-5 border border-[#E0E0E0] rounded-tl-lg rounded-tr-lg"
            >
                <h3>
                    {title}
                </h3>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                disabled={saving}
                                className="text-sm text-gray-600 py-2 px-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="text-sm text-white py-2 px-4 bg-green-500 rounded-lg cursor-pointer hover:bg-green-600 transition duration-200 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving && (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                )}
                                Save
                            </button>
                        </>
                    ) : (
                        showEditButton ? (
                            <button
                                onClick={handleEdit}
                                className="text-sm text-[#1E1E1E] py-2 px-5 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
                            >
                                {btnTitle || 'Edit'}
                            </button>
                        ) : null
                    )}
                </div>
            </div>

            <div className="p-5 border border-t-0 border-[#E0E0E0] bg-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {infoItems.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                            <span className="text-xs text-[#ADACAC] mb-1">{item.label}</span>
                            {Array.isArray(item.value) ? (
                                item.checkList ? (
                                    <div className="flex flex-col gap-0.5 mt-0.5">
                                        {(item.value as string[]).map((val, i) => (
                                            <label
                                                key={i}
                                                className="flex items-center gap-3 py-1 pl-1 rounded hover:bg-gray-50 transition-all cursor-pointer select-none"
                                                style={{ minHeight: 32 }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={!!(checked[idx] && checked[idx][i])}
                                                    onChange={() => handleCheck(idx, i)}
                                                    className="accent-green-500 w-4 h-4"
                                                />
                                                <span className="text-sm md:text-sm text-[#1E1E1E]">{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-1">
                                        {(item.value as string[]).map((val, i) => (
                                            <span key={i} className="text-sm md:text-base text-[#1E1E1E]">{val}</span>
                                        ))}
                                    </div>
                                )
                            ) : (
                                item.switch ? (
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-sm md:text-base text-[#1E1E1E]">{item.value}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={!!switchStates[idx]}
                                                onChange={() => handleSwitchToggle(idx)}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 after:duration-200"></div>
                                        </label>
                                    </div>
                                ) : isEditing && item.editable ? (
                                    renderEditableField(item, idx)
                                ) : (
                                    <span className="text-sm md:text-base text-[#1E1E1E]">
                                        {isLoading ? 'Loading...' : (item.type === 'avatar' && item.value ? (
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={item.value as string}
                                                    alt="Avatar"
                                                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                                                />
                                            </div>
                                        ) : item.type === 'file' && item.value && item.value !== 'No file uploaded' ? (
                                            <a href={item.value as string} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                                View Document
                                            </a>
                                        ) : (item.displayValue ?? item.value))}
                                    </span>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EditInfo;
