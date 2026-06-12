"use client";
import { InvestmentDashboard } from '@/components/investment/investment-dashboard';
import { Footer, Header } from '@/components/layout';
import { motion } from 'framer-motion';

export default function InvestmentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InvestmentDashboard initialPageSize={10} />
      </motion.main>
      <Footer />
    </div>
  );
} 