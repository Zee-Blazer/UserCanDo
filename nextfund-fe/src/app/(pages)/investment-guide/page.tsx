'use client';

import React from "react";
import { CTASection } from "../../../components/how-it-works/cta-section";
import AfricanMarketInsightsSection from "../../../components/investment-guide/AfricanMarketInsightsSection";
import GettingStartedSection from "../../../components/investment-guide/GettingStartedSection";
import GuideContentsSection from "../../../components/investment-guide/GuideContentsSection";
import HeroSection from "../../../components/investment-guide/HeroSection";
import InvestmentGuideSection from "../../../components/investment-guide/InvestmentGuideSection";

import { InvestmentStrategiesSection } from "../../../components/investment-guide/InvestmentStrategiesSection";
import InvestmentTypesSection from "../../../components/investment-guide/InvestmentTypesSection";
import { RiskManagementSection } from "../../../components/investment-guide/RiskManagementSection";
import SuccessGuidelinesSection from "../../../components/investment-guide/SuccessGuidelinesSection";
import { Footer, Header } from "../../../components/layout";

const InvestmentGuidePage: React.FC = () => {
    return (
        <main>
            <Header />
            <HeroSection />
            <GuideContentsSection />
            <GettingStartedSection />
            <InvestmentTypesSection />
            <AfricanMarketInsightsSection />
            <RiskManagementSection />
            <InvestmentStrategiesSection />
            <SuccessGuidelinesSection />
            <CTASection />
            <InvestmentGuideSection />
            <Footer />
        </main>
    );
};

export default InvestmentGuidePage;
