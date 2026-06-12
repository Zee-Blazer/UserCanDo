'use client';
import { Footer, Header } from "../../../components/layout";
import { TermsOfService } from "../../../components/terms-of-service/terms-of-service";

export default function TermsPage() {
    return (
        <main>
            <Header />
            <TermsOfService />
            <Footer />
        </main>
    );
}