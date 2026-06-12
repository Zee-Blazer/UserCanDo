import {
    Box,
} from '@mui/material';
import { AboutHero } from './about-hero';
import { WhatWeDo } from './what-we-do';
import { OurApproach } from './our-approach';
import { MarketFocus } from './market-focus';
import { OurValues } from './our-values';
import { LeadershipTeam } from './leadership-team';
import { RegulatoryCompliance } from './regulatory-compliance';
import { Contact } from './contact';
import { Mission } from './mission';


export const AboutUs: React.FC = () => {
    return (
        <Box>
            {/* Hero Section */}
            <AboutHero />

            {/* Our Mission Section */}
            <Mission />
            
            <WhatWeDo />

            {/* Our Approach Section */}
            <OurApproach />

            {/* Market Focus Section */}
            <MarketFocus />

            {/* Our Values Section */}
            <OurValues />

            {/* Leadership Team Section */}
            <LeadershipTeam />

            {/* Regulatory Compliance Section */}
            <RegulatoryCompliance />

            {/* Contact Section */}
            <Contact />
        </Box>
    );
};