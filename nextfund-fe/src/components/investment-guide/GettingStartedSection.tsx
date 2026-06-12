import Grid from "@mui/material/Grid";
import React from "react";
import Image from "next/image";
import { Card } from "../General/ui";

const riskLevels = [
    {
        title: "Conservative",
        desc: "Asset-backed loans, established businesses",
        percent: "8-15% returns",
        color: "#33CC33",
        icon: "/ant-design-green.png",
        textColor: "#33CC33",
        bgColor: "#E8F5E8",
        borderColor: "#33CC33",
    },
    {
        title: "Moderate",
        desc: "Growth-stage companies, proven revenue models",
        percent: "15-22% returns",
        color: "#1D5EFF",
        icon: "/ant-design-blue.png",
        textColor: "#1D5EFF",
        bgColor: "#E6F0FF",
        borderColor: "#0263FF",
    },
    {
        title: "Aggressive",
        desc: "Early-stage startups, emerging markets",
        percent: "20%+ potential returns",
        color: "#A020F0",
        icon: "/ant-design-purple.png",
        textColor: "#A020F0",
        bgColor: "#F3E6FF",
        borderColor: "#670975",
    },
];

const guidelines = [
    { title: "Diversification", desc: "Spread across 8-15 opportunities minimum", icon: "/diverse.png" },
    { title: "Portfolio Allocation", desc: "Maximum 5-10% of total net worth in African investments", icon: "/allocation.png" },
    { title: "Time Horizon", desc: "Expect 3-7 year holding periods", icon: "/horizon.png" },
    { title: "Start Small", desc: "Begin with smaller amounts as you learn", icon: "/small.png" },
];

const checklist = [
    "Review 3+ years of financial statements",
    "Understand the business model and revenue sources",
    "Assess management team experience",
    "Evaluate market size and competition",
    "Check regulatory compliance status",
    "Verify customer references",
    "Understand exit strategy",
];

const GettingStartedSection: React.FC = () => (
    <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#043A66] text-center mb-8">Getting Started</h2>

        {/* 1. Understand Your Risk Tolerance */}
        <div className="mb-12">
            <h3 className="text-xl font-bold text-[#043A66] mb-6">1. Understand Your Risk Tolerance</h3>
            <Grid container spacing={3}>
                {riskLevels.map((risk, idx) => (
                    <Grid size={{ xs: 12, md: 4 }} key={idx}>
                        <div
                            className="flex flex-col items-center !rounded-3xl p-8 h-full"
                            style={{
                                backgroundColor: risk.bgColor,
                                borderColor: risk.borderColor,
                                borderWidth: '2px',
                                borderStyle: 'solid',
                            }}
                        >
                            <h3
                                className="text-lg md:text-xl font-bold mb-2"
                                style={{ color: risk.textColor }}
                            >
                                {risk.title}
                            </h3>
                            <p
                                className="text-sm mb-4 text-center"
                                style={{ color: risk.textColor }}
                            >
                                {risk.desc}
                            </p>
                            <div className="font-semibold flex items-center gap-2" style={{ color: risk.textColor }}>
                                <Image src={risk.icon} alt={risk.title} width={24} height={24} />
                                <span>{risk.percent}</span>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>

        {/* 2. Set Investment Guidelines */}
        <div className="mb-12">
            <h3 className="text-xl font-bold text-[#043A66] mb-6">2. Set Investment Guidelines</h3>
            <Grid container spacing={3}>
                {guidelines.map((g, idx) => (
                    <Grid size={{ xs: 12, md: 3, sm: 6 }} key={idx}>
                        <Card
                            className="flex flex-col !bg-[#F2F5F7] !rounded-3xl p-6 h-full"
                            style={{ backgroundColor: '#F2F5F7' }}
                        >
                            <div className="mb-4 flex justify-start">
                                <Image src={g.icon} alt={g.title} width={32} height={32} />
                            </div>
                            <h4 className="font-bold text-[#043A66] mb-2 text-left">{g.title}</h4>
                            <p className="text-sm text-[#043A66] text-left">{g.desc}</p>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>

        {/* 3. Due Diligence Checklist */}
        <div className="mt-8">
            <h3 className="text-xl font-bold text-[#043A66] mb-6">3. Due Diligence Checklist</h3>
            <div
                className="!rounded-3xl p-6 border-2"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#33CC33',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                }}
            >
                <Grid container spacing={0}>
                    {/* Left Column */}
                    <Grid size={{ xs: 12, sm: 6 }} key="left-column">
                        <div className="pr-0 sm:pr-4">
                            {checklist.slice(0, 4).map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 py-4 px-2"
                                    style={{
                                        borderBottom: idx < 3 ? '0.5px solid #33CC3314' : 'none'
                                    }}
                                >
                                    <Image
                                        src="/circle-tick-green.png"
                                        alt="checkmark"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-[#043A66] text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Grid>

                    {/* Right Column */}
                    <Grid size={{ xs: 12, sm: 6 }} key="right-column">
                        <div className="pl-0 sm:pl-4 sm:border-l border-[#33CC3314]">
                            {checklist.slice(4).map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 py-4 px-2"
                                    style={{
                                        borderBottom: idx < checklist.slice(4).length - 1 ? '0.5px solid #33CC3314' : 'none'
                                    }}
                                >
                                    <Image
                                        src="/circle-tick-green.png"
                                        alt="checkmark"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-[#043A66] text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    </section>
);

export default GettingStartedSection;