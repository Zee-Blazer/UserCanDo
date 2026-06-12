"use client";

import SpannedBtn from "@/components/business/home/spanned-btn";
import ContentContainer from "@/components/business/investors/content-container";
import { FormCheckbox, FormInput, FormSelect } from "@/components/General/form";
import { useState } from "react";

const AddUser = () => {
    const [sendWelcome, setSendWelcome] = useState(false);

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass";
        func: () => void;
    }> = [
            {
                text: "Close",
                type: "muted",
                func: () => {
                    // Close action logic here
                    alert("Close clicked");
                },
            },
            {
                text: "Create User",
                type: "grass",
                func: () => {
                    console.log("Submit data!");
                },
            },
        ];

    return (
        <ContentContainer
            showSidenav={false}
        >
            <h1
                className="text-2xl text-[#1E1E1E] font-semibold mb-6"
            >
                Add User
            </h1>

            <div className="w-full">
                <div className="flex gap-4 w-full my-3.5">
                    <FormInput
                        label="First Name"
                        placeholder="Dike"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                    <FormInput
                        label="Last Name"
                        placeholder="Dike"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Email Address"
                        placeholder="dikekalu@yahoo.com"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Phone Number"
                        placeholder="Dike"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormSelect
                        label="User Role"
                        options={["Admin", "User", "Guest"]}
                        value="Admin"
                        onSelect={() => { }}
                        className="flex-1 border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Company Name"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Investment Firm Name"
                        type="text"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormSelect
                        label="Country"
                        options={["Nigeria", "Ghana", "USA"]}
                        value="USA"
                        onSelect={() => { }}
                        className="flex-1 border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Password (Temporary)"
                        type="password"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Upload ID"
                        type="file"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Upload Address Proof"
                        type="file"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Upload Business Registration"
                        type="file"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-3.5">
                    <FormInput
                        label="Others"
                        type="file"
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="my-6">
                    {/* Checkbox for sending welcome email (square style) */}
                    <FormCheckbox
                        label="Send welcome email with login instructions"
                        checked={sendWelcome}
                        setChecked={setSendWelcome}
                        className="!rounded-[4px] !border !border-[#bdbdbd]"
                    />
                </div>
            </div>

            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    )
}

export default AddUser;
