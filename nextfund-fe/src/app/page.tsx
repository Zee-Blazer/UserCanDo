'use client';

import { Footer, Header } from "@/components/layout";
import { motion } from "framer-motion";
import { isProd } from "../utils/helpers";
import {
  CallToAction,
  FeaturedInvestments,
  Hero,
  HowItWorks,
  Testimonials
} from "./(pages)/sections";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <FeaturedInvestments />
        {!isProd && <Testimonials />}
        <CallToAction />
      </main>
      <Footer />
    </motion.div>
  );
}
