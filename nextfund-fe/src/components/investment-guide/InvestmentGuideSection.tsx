import Grid from "@mui/material/Grid";
import React from "react";
import { INVESTMENT_GUIDE_CARDS } from "../../constants/investment-guide-data";
import { Button, Card } from "../General/ui";

const InvestmentGuideSection: React.FC = () => {
    return (
        <section className="w-full py-12 px-4 flex flex-col items-center bg-white">
            <div className="max-w-3xl mx-auto text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#043A66] mb-2">
                    Continue Learning
                </h2>
            </div>
            <Grid container spacing={3} className="w-full max-w-7xl">
                {INVESTMENT_GUIDE_CARDS.map((card, idx) => (
                    <Grid  size={{ xs: 12, md: 4, sm: 6 }} key={idx}>
                        <Card
                            className="flex flex-col justify-between !bg-[#F9FBFC] !rounded-3xl p-8 h-full"
                        >
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-[#043A66]">{card.title}</h3>
                                <p className="text-base mb-6 text-[#043A66]">{card.description}</p>
                            </div>
                            <a href={card.href}>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="text-white rounded-full font-semibold text-base whitespace-nowrap mt-2"
                                    style={{
                                        backgroundColor: "#33CC33",
                                        width: "fit-content",
                                        minWidth: "140px",
                                        padding: "0.75rem 2rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    {card.button} <span className="ml-2">→</span>
                                </Button>
                            </a>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </section>
    );
};

export default InvestmentGuideSection;
