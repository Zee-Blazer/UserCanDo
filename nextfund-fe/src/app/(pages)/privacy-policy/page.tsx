'use client';
import { Footer, Header } from "../../../components/layout";
import { PrivacyPolicy } from "../../../components/privacy-policy/privacy-policy";


export default function PrivacyPage() {
    return (
        <main>
            <Header />
            <PrivacyPolicy />
            <Footer />
        </main>
    );
}