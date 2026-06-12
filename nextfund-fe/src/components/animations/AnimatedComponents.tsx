"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { defaultTransition, fadeInUp } from "./motion-variants";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    variant?: any;
}

export const AnimatedSection = ({
    children,
    className = "",
    delay = 0,
    variant = fadeInUp
}: AnimatedSectionProps) => {
    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            exit="exit"
            variants={variant}
            transition={{ ...defaultTransition, delay }}
            viewport={{ once: true, amount: 0.3 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const AnimatedContainer = ({
    children,
    className = "",
    stagger = false
}: AnimatedSectionProps & { stagger?: boolean }) => {
    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            exit="exit"
            variants={stagger ? {
                initial: {},
                animate: {
                    transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.1
                    }
                }
            } : fadeInUp}
            transition={defaultTransition}
            viewport={{ once: true, amount: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface AnimatedButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export const AnimatedButton = ({
    children,
    className = "",
    onClick,
    disabled = false,
    type = "button"
}: AnimatedButtonProps) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const AnimatedCard = ({
    children,
    className = "",
    hoverEffect = true
}: AnimatedCardProps) => {
    return (
        <motion.div
            initial="initial"
            whileInView="animate"
            exit="exit"
            variants={fadeInUp}
            transition={defaultTransition}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={hoverEffect ? {
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3, ease: "easeOut" }
            } : undefined}
            className={className}
        >
            {children}
        </motion.div>
    );
};
