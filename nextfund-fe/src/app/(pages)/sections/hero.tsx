"use client";

import { AnimatedButton, AnimatedSection } from '@/components/animations/AnimatedComponents';
import { fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '@/components/animations/motion-variants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import globe from '../../../../public/planent-earth.png';
import whiteArrow from '../../../../public/white-arrow-forward.png';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-8 sm:py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-0">
          {/* Left Content */}
          <AnimatedSection variant={fadeInLeft} className="lg:col-span-4 space-y-6 sm:space-y-8">
            {/* Badge Button */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Link href="/investments">
                <AnimatedButton className="!border-[#33CC33] !border-2 !text-white flex items-center justify-center rounded-full px-3 sm:px-4 cursor-pointer bg-transparent">
                  <span className="text-[#33CC33] px-4 py-2.5 text-[8px] sm:text-[10px] font-medium uppercase tracking-wide text-center leading-tight">
                    CHECK OUT VETTED INVESTMENT OPPORTUNITIES
                  </span>
                  <svg className="ml-2 w-3 h-3 sm:w-4 sm:h-4 text-[#33CC33] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </AnimatedButton>
              </Link>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight font-neue-bold"
                variants={staggerItem}
              >
                <motion.span
                  className="text-[#043A66] block sm:whitespace-nowrap"
                  variants={staggerItem}
                >
                  Invest in Real-World,
                </motion.span>
                <motion.span
                  className="text-[#043A66] block sm:whitespace-nowrap"
                  variants={staggerItem}
                >
                  Revenue-Generating
                </motion.span>
                <motion.span
                  className="text-[#33CC33] block sm:whitespace-nowrap"
                  variants={staggerItem}
                >
                  Businesses
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg text-[#043A66] font-medium font-neue-medium"
                variants={staggerItem}
              >
                <span className="block sm:whitespace-nowrap">Nexfund connects investors with vetted businesses, providing</span>
                <span className="block sm:whitespace-nowrap">transparent due diligence and seamless investment tracking.</span>
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Link href="/sign-up">
                <AnimatedButton className="!bg-[#33CC33] hover:!bg-[#2eb82e] !text-white flex items-center justify-center rounded-full w-full px-4 py-2.5 sm:w-auto cursor-pointer border-none">
                  Get Started
                  <Image
                    src={whiteArrow}
                    alt="Arrow forward"
                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                    width={20}
                    height={20}
                  />
                </AnimatedButton>
              </Link>
              <Link href="/investment-guide">
                <AnimatedButton className="!border-2 px-4 py-2.5 !border-[#33CC33] !text-[#33CC33] hover:!bg-gray-50 rounded-full w-full sm:w-auto cursor-pointer bg-transparent">
                  Learn more
                </AnimatedButton>
              </Link>
            </motion.div>

            {/* Key Features */}
            <motion.div
              className="pt-6 sm:pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <p className="text-xs sm:text-sm font-semibold text-[#043A66] uppercase tracking-wide mb-3 sm:mb-4 font-neue-bold">
                OUR KEY FEATURES
              </p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {[
                  'Thorough due diligence',
                  'Transparent process',
                  'Diverse opportunities'
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-2 flex-shrink-0"
                    variants={staggerItem}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#33CC33] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm text-[#043A66] font-medium font-neue-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Right Image */}
          <AnimatedSection
            variant={fadeInRight}
            delay={0.3}
            className="lg:col-span-6 lg:col-start-8 relative mt-8 lg:mt-0"
          >
            <motion.div
              className="rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={globe}
                alt="Global Investment Opportunities"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};