"use client";

import { motion } from "framer-motion";

export const AnimatedLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <motion.div
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 bg-[#33CC33] rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};
