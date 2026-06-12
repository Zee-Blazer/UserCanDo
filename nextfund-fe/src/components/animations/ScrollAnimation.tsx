"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollAnimationProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
}

export const ScrollAnimation = ({
    children,
    className = "",
    direction = "up",
    delay = 0,
    duration = 0.6
}: ScrollAnimationProps) => {
    const directionVariants = {
        up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
        down: { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 } },
        left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } }
    };

    const variant = directionVariants[direction];

    return (
        <motion.div
            className={className}
            initial={variant.initial}
            whileInView={variant.animate}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};
