"use client";

import { FormInput, FormSelect } from "@/components/General/form";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SpannedBtn from "../components/business/home/spanned-btn";
import ContentContainer from "../components/business/investors/content-container";
import { useInviteTeamMemberMutation } from "../queries/adminApi";

const AdminTeamInvite = () => {

    const [inviteTeamMember, { isLoading }] = useInviteTeamMemberMutation();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const actionButtons: Array<{
        text: string;
        type?: "muted" | "danger" | "default" | "primary" | "grass";
        func: () => void;
    }> = [
            {
                text: isLoading ? "Inviting..." : "Invite Member",
                type: "grass",
                func: () => {

                    if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim() || !formData.role || formData.role === "") {
                        toast.error("Please fill in all required fields.");
                        return;
                    }

                    inviteTeamMember({ ...formData }).unwrap()
                        .then((res) => {
                            toast.success("Invitation sent successfully!");
                            setFormData({
                                first_name: "",
                                last_name: "",
                                email: "",
                                role: "",
                            });
                        }).catch((error) => {
                            toast.error("Failed to send invitation. Please try again.");
                        });
                },
            },
        ];

    return (
        <ContentContainer>
            <h1 className="text-2xl text-[#1E1E1E] font-semibold mb-6">
                Invite User
            </h1>

            <div className="w-full">
                <div className="md:flex gap-4 w-full my-3.5">
                    <FormInput
                        label="First Name"
                        required
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                    <FormInput
                        label="Last Name"
                        required
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                </div>

                <div className="md:flex gap-4 w-full my-3.5">
                    <FormInput
                        label="Email Address"
                        required
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        containerClassName="flex-1"
                        className="border-[#EEF1F4]"
                        color="#6A6A6A"
                    />
                    <div className="flex-1">
                        <FormSelect
                            label="Role"
                            required
                            name="role"
                            value={formData.role}
                            onSelect={handleChange}
                            placeholder="Select Option"
                            options={["Super Admin", "Admin", "KYC Officer", "Content Management"]}
                            className="border-[#EEF1F4]"
                            color="#6A6A6A"
                        />
                    </div>
                </div>
            </div>

            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    );
}

export default AdminTeamInvite;
