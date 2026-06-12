import Grid from "@mui/material/Grid";
import React from "react";
import { Card } from "../General/ui";

const types = [
    {
        title: "Equity Investments",
        details: [
            "Ownership stake in growing businesses",
            "Returns: Capital appreciation + potential dividends",
            "Risk: High (total loss possible)",
            "Liquidity: Low (3-7 years typically)",
            "Best for: Experienced investors seeking high growth",
        ],
    },
    {
        title: "Asset-Backed Debt",
        details: [
            "Secured loans with real estate/equipment collateral",
            "Returns: Fixed interest payments (8-15% annually)",
            "Risk: Medium (collateral provides protection)",
            "Liquidity: Medium (1-5 year terms)",
            "Best for: Income-focused investors",
        ],
    },
    {
        title: "Revenue-Based Financing",
        details: [
            "Percentage of revenue until target return achieved",
            "Returns: Variable based on business performance",
            "Risk: Medium (aligned with business success)",
            "Liquidity: Medium (typically 3-5 years)",
            "Best for: Investors wanting business upside with less risk",
        ],
    },
];

const InvestmentTypesSection: React.FC = () => (
    <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#043A66] text-center mb-8">
            Investment Types
        </h2>
        <Grid container spacing={3}>
            {types.map((type, idx) => (
                <Grid size={{ xs: 12, md: 4 }} key={idx}>
                    <Card className="flex flex-col !bg-[#FFFFFF] !rounded-3xl p-8 h-full">
                        <h3 className="text-lg md:text-xl font-bold mb-4 text-[#043A66]">
                            {type.title}
                        </h3>
                        <div className="text-[#043A66] text-base space-y-3">
                            {type.details.map((d, i) => (
                                <p key={i} className="leading-relaxed">{d}</p>
                            ))}
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </section>
);

export default InvestmentTypesSection;