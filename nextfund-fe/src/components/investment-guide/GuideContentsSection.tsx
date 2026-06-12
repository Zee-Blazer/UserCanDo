import Grid from "@mui/material/Grid";
import Image from "next/image";
import React from "react";
import { Card } from "../General/ui";

const contents = [
    { title: "Getting Started", desc: "Risk tolerance, guidelines, and due diligence basics", icon: "/streamline.png" },
    { title: "Investment Types", desc: "Equity, debt, and revenue-based financing options", icon: "/dollar.png" },
    { title: "Market Insights", desc: "Key sectors, opportunities and challenges", icon: "/world.png" },
    { title: "Risk Management", desc: "Portfolio construction and risk mitigation", icon: "/carbon-security.png" },
    { title: "Strategies", desc: "Portfolio, syndicate, and sector focus approaches", icon: "/strategy.png" },
    { title: "Success Guidelines", desc: "Do’s and don’ts for successful investing", icon: "/charm-circle-tick.png" },
];

const GuideContentsSection: React.FC = () => (
    <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#043A66] text-center mb-8">Guide Contents</h2>
        <Grid container spacing={3}>
            {contents.map((item, idx) => (
                <Grid size={{ xs: 12, md: 4, sm: 6 }} key={idx}>
                    <Card className="flex flex-col items-start !bg-[#043A660D] !rounded-3xl p-8 h-full">
                        <div className="mb-4">
                            <Image src={item.icon} alt={item.title} width={40} height={40} />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold mb-2 text-[#043A66]">{item.title}</h3>
                        <p className="text-[.9rem] text-[#043A66]">{item.desc}</p>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </section>
);

export default GuideContentsSection;
