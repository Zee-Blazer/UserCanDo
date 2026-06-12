'use client';
import {GdprDisclaimer } from "../../../components/gdpr-disclaimer/gdpr-disclaimer";
import { Footer, Header } from "../../../components/layout";

export default function GDPRDisclaimerPage() {
    return (
        <main>
            <Header />
            <GdprDisclaimer />
            <Footer />
        </main>
    );
}
