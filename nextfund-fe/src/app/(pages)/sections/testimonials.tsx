"use client";

import { AnimatedSection } from '@/components/animations/AnimatedComponents';
import { fadeInUp } from '@/components/animations/motion-variants';
import { Card } from '@/components/General/ui';
import { TESTIMONIALS } from '@/constants';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Left Aligned */}
        <AnimatedSection className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-neue-bold" style={{ color: '#043A66' }}>
            What Our Users Say
          </h2>
          <p className="text-lg text-[#043A66] max-w-3xl font-neue-regular">
            Hear from investors and business owners who have experienced the Nexfund difference.
          </p>
        </AnimatedSection>

        {/* Testimonial Card */}
        <AnimatedSection variant={fadeInUp} delay={0.3} className="w-full">
          <Card className="p-8 lg:p-12 relative overflow-hidden !rounded-[2rem] !bg-[#003B66] !shadow-none">
            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <motion.blockquote
                  className="text-lg lg:text-2xl leading-relaxed text-white font-neue-regular"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  "{currentTestimonial.content}"
                </motion.blockquote>

                {/* Author Info and Navigation */}
                <div className="flex items-center justify-between">
                  {/* Author Info */}
                  <motion.div
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <motion.div
                      className="w-16 h-16 relative"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src="/sarah.png"
                        alt={currentTestimonial.name}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-lg text-white font-neue-bold">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-gray-300 font-neue-regular">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </motion.div>

                  {/* Navigation */}
                  <motion.div
                    className="flex items-center space-x-6"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {/* Previous Button */}
                    <motion.button
                      onClick={prevTestimonial}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
                      aria-label="Previous testimonial"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src="/arrow-back.png"
                        alt="Previous"
                        width={20}
                        height={20}
                      />
                    </motion.button>

                    {/* Pagination */}
                    <motion.span
                      className="text-white text-lg font-medium font-neue-medium"
                      key={`pagination-${currentIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {String(currentIndex + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
                    </motion.span>

                    {/* Next Button */}
                    <motion.button
                      onClick={nextTestimonial}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-100"
                      aria-label="Next testimonial"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src="/arrow-forward.png"
                        alt="Next"
                        width={20}
                        height={20}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
};