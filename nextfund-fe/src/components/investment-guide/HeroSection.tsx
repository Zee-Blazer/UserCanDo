import Grid from "@mui/material/Grid";
import Image from "next/image";
import React from "react";
import { Button } from "../General/ui";
import Link from "next/link";

const HeroSection: React.FC = () => (
    <section className="w-full py-12 bg-white">
        <Grid container justifyContent="center" alignItems="center" spacing={0}>
            {/* Centered Title Section */}
            <Grid size={{ xs: 12 }}>
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#043A66] mb-4 px-4">
                        Investment Guide
                    </h1>
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#043A66] mb-0 px-4">
                        Investing in African Businesses - A Complete Guide
                    </h2>
                </div>
            </Grid>

            {/* Full Width Description Section */}
            <Grid size={{ xs: 12 }}>
                <div className="w-full px-4 mb-4 flex justify-center">
                    <div className="max-w-7xl">
                        <div className="w-full">
                            <p
                                className="text-sm sm:text-base md:text-lg text-[#043A66] mb-6 w-full text-center leading-relaxed px-2"
                                style={{
                                    lineHeight: 1.6,
                                    padding: "0 8px",
                                    margin: "0 0 1.5rem 0",
                                }}
                            >
                                Welcome to African Investment. Investing in African
                                businesses offers unique opportunities for growth and
                                impact. This guide will help you understand the
                                landscape, risks, and best practices for successful
                                investing across the continent.
                            </p>
                        </div>
                    </div>
                </div>
            </Grid>

            {/* Centered Buttons Section */}
            <Grid size={{ xs: 12 }}>
                <div className="max-w-3xl mx-auto text-center mb-8 px-4">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid>
                            <Button
                                variant="primary"
                                size="lg"
                                className="text-white rounded-full font-semibold text-sm sm:text-base whitespace-nowrap"
                                style={{
                                    backgroundColor: "#33CC33",
                                    width: "100%",
                                    minWidth: "180px",
                                    maxWidth: "220px",
                                    padding: "0.75rem 1.5rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                Start Reading
                            </Button>
                        </Grid>
                        <Grid>
                            <Link href="/investments">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-full font-semibold text-sm sm:text-base whitespace-nowrap border-[#33CC33] text-[#33CC33]"
                                    style={{
                                        width: "100%",
                                        minWidth: "180px",
                                        maxWidth: "220px",
                                        padding: "0.75rem 1.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    Browse opportunities
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            {/* Image Section */}
            <Grid size={{ xs: 12 }}>
                <div className="w-full flex justify-center px-4">
                    <div className="w-full max-w-[78rem] rounded-3xl overflow-hidden">
                        <Image
                            src="/chuttersnap.png"
                            alt="Investment Guide Hero"
                            width={1600}
                            height={500}
                            className="w-full h-auto object-cover rounded-3xl"
                            priority
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    </section>
);

export default HeroSection;