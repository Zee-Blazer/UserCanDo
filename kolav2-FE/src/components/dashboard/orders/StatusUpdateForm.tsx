"use client";

import React from "react";
import { Button } from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";

interface StatusUpdateFormProps {
    statusConfig: {
        title: string;
        heading: string;
        dateLabel: string;
    };
    statusDate: string;
    setStatusDate: (date: string) => void;
    handleUpdateStatus: () => Promise<void>;
    isLoading: boolean;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({
    statusConfig,
    statusDate,
    setStatusDate,
    handleUpdateStatus,
    isLoading
}) => {
    return (
        <div className="space-y-6 mt-10">
            {/* Simple Date Form */}
            <div className="space-y-4 mb-6">
                <FormInput
                    label={statusConfig.dateLabel}
                    name="statusDate"
                    type="date"
                    value={statusDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusDate(e.target.value)}
                    required
                />
            </div>

            <Button
                loading={isLoading}
                disabled={isLoading || !statusDate}
                className="w-full bg-[#003366] text-white normal-case px-10 py-3 text-sm flex items-center justify-center"
                onClick={handleUpdateStatus}
            >
                <span className="font-normal text-center">
                    Update order status
                </span>
            </Button>


        </div>
    );
};

export default StatusUpdateForm;
