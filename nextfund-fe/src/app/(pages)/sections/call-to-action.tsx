"use client";

import { AnimatedSection } from '@/components/animations/AnimatedComponents';
import { fadeInLeft, fadeInRight } from '@/components/animations/motion-variants';
import { Card } from '@/components/General/ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Constants
const COLORS = {
  primary: '#33CC33',
  cardBg: '#33CC3314',
  textPrimary: '#043A66',
} as const;

export const CallToAction: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 flex justify-center items-center px-4">
      <AnimatedSection className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="p-12 w-full !bg-[#33CC3314] !rounded-[3rem]" style={{ backgroundColor: COLORS.cardBg }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <AnimatedSection variant={fadeInLeft} className="space-y-8">
                <div className="space-y-6">
                  <motion.h2
                    className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight font-neue-bold"
                    style={{ color: COLORS.textPrimary }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    Are you ready to
                    <br />
                    start investing?
                  </motion.h2>

                  <motion.p
                    className="text-lg max-w-lg font-neue-regular"
                    style={{ color: COLORS.textPrimary }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Join Nexfund today and gain access to vetted <br />
                    investment opportunities across various sectors.
                  </motion.p>
                </div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Link href="/sign-up?type=investor">
                    <motion.button
                      className="text-white px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer border-none font-neue-medium"
                      style={{ backgroundColor: COLORS.primary }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      Become an investor
                    </motion.button>
                  </Link>
                  <Link href="/sign-up?type=business">
                    <motion.button
                      className="border-2 px-6 py-3 rounded-full font-semibold text-base whitespace-nowrap cursor-pointer bg-transparent font-neue-medium"
                      style={{
                        borderColor: COLORS.primary,
                        color: COLORS.primary
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      List your business
                    </motion.button>
                  </Link>
                </motion.div>
              </AnimatedSection>

              {/* Right Image */}
              <AnimatedSection variant={fadeInRight} delay={0.2} className="relative flex justify-center lg:justify-end">
                <motion.div
                  className="relative"
                  whileHover={{
                    scale: 1.05,
                    rotate: 5
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src="/Coins-amico.png"
                      alt="Investment coins"
                      width={300}
                      height={300}
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </motion.div>
              </AnimatedSection>
            </div>
          </Card>
        </motion.div>
      </AnimatedSection>
    </section>
  );
};