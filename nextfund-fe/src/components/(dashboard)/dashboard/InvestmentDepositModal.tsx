'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface InvestmentDepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    onFinish?: () => void;
}

export const InvestmentDepositModal: React.FC<InvestmentDepositModalProps> = ({
    isOpen,
    onClose,
    onBack,
    onFinish
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Helper function to remove query parameter from URL
    const removeQueryParam = () => {
        if (typeof window !== 'undefined' && searchParams?.get('showDocumentModal')) {
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.delete('showDocumentModal');
            const newUrl = newSearchParams.toString()
                ? `${window.location.pathname}?${newSearchParams.toString()}`
                : window.location.pathname;
            router.replace(newUrl);
        }
    };

    const handleFinish = () => {
   
        if (typeof window !== 'undefined') {
            
            const userId = localStorage.getItem('current_user_id');
            const modalDismissedKey = userId ? `documentModalDismissed_${userId}` : 'documentModalDismissed';
            localStorage.setItem(modalDismissedKey, 'true');
            // Also set the general key for backward compatibility
            localStorage.setItem('documentModalDismissed', 'true');
        }
        // Remove query parameter from URL
        removeQueryParam();
        if (onFinish) {
            onFinish();
        } else {
            onClose();
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            onClose();
        }
    };

    const handleClose = () => {
  
        if (typeof window !== 'undefined') {
            // Try to get userId from localStorage (set during login)
            const userId = localStorage.getItem('current_user_id');
            const modalDismissedKey = userId ? `documentModalDismissed_${userId}` : 'documentModalDismissed';
            localStorage.setItem(modalDismissedKey, 'true');
            // Also set the general key for backward compatibility
            localStorage.setItem('documentModalDismissed', 'true');
        }
        // Remove query parameter from URL
        removeQueryParam();
        onClose();
    };

    const depositSteps = [
        {
            icon: '/dashboard/deposit-requirement.svg',
            title: 'Deposit Requirement',
            description: 'Investors will need to complete a deposit to finalize their investment commitment.',
        },
        {
            icon: '/dashboard/payment-method.svg',
            title: 'Payment Methods',
            description: 'Deposits can be made via bank transfer or cryptocurrency.',
        },
        {
            icon: '/dashboard/proof-of-payment.svg',
            title: 'Proof of Payment',
            description: 'Investors will be required to upload the corresponding proof of payment in the Commit Investment modal.',
        },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                        }}
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                width: '100%',
                                maxWidth: '480px',
                                position: 'relative',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 1,
                                }}
                                aria-label="Close modal"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </motion.button>

                            {/* Modal Content */}
                            <div
                                style={{
                                    padding: '32px 24px',
                                }}
                            >
                                {/* Icon with Animation */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.2,
                                        duration: 0.6,
                                        type: 'spring',
                                        damping: 12,
                                        stiffness: 200
                                    }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                    }}
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '100%',
                                            backgroundColor: '#33CC331A',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Image
                                            src="/dashboard/investment-deposit.svg"
                                            alt="Investment Deposit"
                                            width={45}
                                            height={38}
                                            priority
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                    style={{
                                        fontFamily: "'Neue Montreal', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 'clamp(20px, 4vw, 24px)',
                                        lineHeight: '1.3',
                                        color: '#000000',
                                        textAlign: 'center',
                                        marginBottom: '12px',
                                        margin: 0,
                                    }}
                                >
                                    Investment Deposit Information
                                </motion.h2>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.4 }}
                                    style={{
                                        fontFamily: "'Neue Montreal', sans-serif",
                                        fontWeight: 400,
                                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                                        lineHeight: '1.5',
                                        color: '#666666',
                                        textAlign: 'center',
                                        marginBottom: '24px',
                                    }}
                                >
                                    This is an overview of the next steps for completing your investment. After submitting your expression of interest, you will need to complete a deposit and provide proof of payment.
                                </motion.p>

                                {/* Steps */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                                    {depositSteps.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '12px',
                                                padding: '16px',
                                                backgroundColor: '#FAFAFA',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ flexShrink: 0 }}
                                            >
                                                <Image
                                                    src={step.icon}
                                                    alt={step.title}
                                                    width={24}
                                                    height={24}
                                                />
                                            </motion.div>
                                            <div style={{ flex: 1 }}>
                                                <h3
                                                    style={{
                                                        fontFamily: "'Satoshi Variable', sans-serif",
                                                        fontWeight: 600,
                                                        fontSize: 'clamp(14px, 3vw, 16px)',
                                                        lineHeight: '1.4',
                                                        color: '#000000',
                                                        margin: '0 0 6px 0',
                                                    }}
                                                >
                                                    {step.title}
                                                </h3>
                                                <p
                                                    style={{
                                                        fontFamily: "'Satoshi Variable', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: 'clamp(12px, 2.5vw, 14px)',
                                                        lineHeight: '1.5',
                                                        color: '#666666',
                                                        margin: 0,
                                                    }}
                                                >
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleBack}
                                        style={{
                                            backgroundColor: 'transparent',
                                            color: '#000000',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '0',
                                            fontSize: 'clamp(14px, 3vw, 16px)',
                                            fontWeight: 600,
                                            fontFamily: "'Neue Montreal', sans-serif",
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Back
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleFinish}
                                        style={{
                                            backgroundColor: '#33CC33',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '12px',
                                            padding: '12px 20px',
                                            fontSize: 'clamp(14px, 3vw, 16px)',
                                            fontWeight: 600,
                                            fontFamily: "'Neue Montreal', sans-serif",
                                            cursor: 'pointer',
                                            marginLeft: 'auto',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Finish
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

