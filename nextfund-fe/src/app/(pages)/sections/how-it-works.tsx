"use client";

import { AnimatedSection } from '@/components/animations/AnimatedComponents';
import { staggerContainer, staggerItem } from '@/components/animations/motion-variants';
import { Card } from '@/components/General/ui';
import { HOW_IT_WORKS_STEPS } from '@/constants';
import { HowItWorksStep } from '@/types/landing-page';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <AnimatedSection className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          <div className="mb-8 lg:mb-0 lg:max-w-2xl">
            <motion.h2
              className="text-3xl lg:text-4xl font-bold mb-4 font-neue-bold"
              style={{ color: '#043A66' }}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              How Nexfund Works
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 font-neue-regular"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our streamlined process makes investing in businesses simple, transparent, and secure.
            </motion.p>
          </div>
        </AnimatedSection>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {HOW_IT_WORKS_STEPS.map((step: HowItWorksStep, index: number) => {
            return (
              <motion.div
                key={step.id}
                variants={staggerItem}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full flex w-full"
              >
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full"
                >
                  <Card className="p-4 sm:p-6 lg:p-8 text-left transition-shadow duration-300 h-full flex flex-col w-full" hover>
                    {/* Step Number Indicator */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 bg-[#33CC33] rounded-full flex items-center justify-center text-white font-bold text-sm z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Icon Container */}
                    <motion.div
                      className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={step.icon}
                        alt={`${step.title} icon`}
                        width={25}
                        height={25}
                      />
                    </motion.div>

                    {/* Step Content */}
                    <div className="space-y-4 flex-1 flex flex-col">
                      <motion.h3
                        className="text-xl font-bold font-neue-bold"
                        style={{ color: '#043A66' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {step.title}
                      </motion.h3>

                      <motion.p
                        className="text-[#043A66] leading-relaxed whitespace-pre-line text-sm lg:text-base flex-1 font-neue-regular"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {step.description}
                      </motion.p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};