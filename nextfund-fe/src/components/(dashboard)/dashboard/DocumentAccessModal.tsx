'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { InvestmentDepositModal } from './InvestmentDepositModal';

interface DocumentAccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DocumentAccessModal: React.FC<DocumentAccessModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showDepositModal, setShowDepositModal] = useState(false);

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

    const handleContinue = () => {
        setShowDepositModal(true);
    };

    const handleDepositModalClose = () => {
        setShowDepositModal(false);
        
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

    const handleDepositModalBack = () => {
        setShowDepositModal(false);
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

    return (
        <>
            <AnimatePresence>
                {isOpen && !showDepositModal && (
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
                                    onClick={handleClose}
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
                                                src="/dashboard/access-permission.svg"
                                                alt="Access Permission"
                                                width={48}
                                                height={48}
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
                                            margin: '0 auto',
                                            width: 'fit-content',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        Document Access Permissions
                                    </motion.h2>

                                    {/* Subtitle */}
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.4 }}
                                        style={{
                                            fontFamily: "'Neue Montreal', sans-serif",
                                            fontWeight: 400,
                                            fontSize: 'clamp(14px, 3vw, 16px)',
                                            lineHeight: '1.5',
                                            color: '#666666',
                                            textAlign: 'center',
                                            marginBottom: '8px',
                                            margin: '0 auto',
                                            width: 'fit-content',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        Here's a quick overview of what you can access and request
                                    </motion.p>

                                    {/* Divider Line */}
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        style={{
                                            height: '1px',
                                            backgroundColor: '#000000',
                                            marginBottom: '32px',
                                        }}
                                    />

                                    {/* Permission Items */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                        {/* Item 1 */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6, duration: 0.4 }}
                                            style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ flexShrink: 0, width: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Image
                                                    src="/dashboard/eye-doc.svg"
                                                    alt="Preview Documents"
                                                    width={32}
                                                    height={32}
                                                />
                                            </motion.div>
                                            <p
                                                style={{
                                                    fontFamily: "'Satoshi Variable', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                                    lineHeight: '1.6',
                                                    color: '#333333',
                                                    margin: 0,
                                                    paddingTop: '4px',
                                                }}
                                            >
                                                You are able to preview the documents made available by the business
                                            </p>
                                        </motion.div>

                                        {/* Dashed Line 1 */}
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: 0.7, duration: 0.3 }}
                                            style={{
                                                width: '1px',
                                                height: '40px',
                                                borderLeft: '1px dashed #05784E',
                                                marginLeft: '16px',
                                                marginTop: '8px',
                                                marginBottom: '8px',
                                                transformOrigin: 'top',
                                            }}
                                        />

                                        {/* Item 2 */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.8, duration: 0.4 }}
                                            style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ flexShrink: 0, width: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Image
                                                    src="/dashboard/doc-acc.svg"
                                                    alt="Full Access"
                                                    width={32}
                                                    height={32}
                                                />
                                            </motion.div>
                                            <p
                                                style={{
                                                    fontFamily: "'Satoshi Variable', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                                    lineHeight: '1.6',
                                                    color: '#333333',
                                                    margin: 0,
                                                    paddingTop: '4px',
                                                }}
                                            >
                                                You have full access to view every document provided by the business
                                            </p>
                                        </motion.div>

                                        {/* Dashed Line 2 */}
                                        <motion.div
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ delay: 0.9, duration: 0.3 }}
                                            style={{
                                                width: '1px',
                                                height: '40px',
                                                borderLeft: '1px dashed #05784E',
                                                marginLeft: '16px',
                                                marginTop: '8px',
                                                marginBottom: '8px',
                                                transformOrigin: 'top',
                                            }}
                                        />

                                        {/* Item 3 */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.0, duration: 0.4 }}
                                            style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.2 }}
                                                style={{ flexShrink: 0, width: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Image
                                                    src="/dashboard/request-doc.svg"
                                                    alt="Request Documents"
                                                    width={32}
                                                    height={32}
                                                />
                                            </motion.div>
                                            <p
                                                style={{
                                                    fontFamily: "'Satoshi Variable', sans-serif",
                                                    fontWeight: 400,
                                                    fontSize: 'clamp(14px, 3vw, 16px)',
                                                    lineHeight: '1.6',
                                                    color: '#333333',
                                                    margin: 0,
                                                    paddingTop: '4px',
                                                }}
                                            >
                                                You may request additional documents beyond those initially shared by business
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Continue Button */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.4 }}
                                        style={{
                                            marginTop: '32px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleContinue}
                                            style={{
                                                backgroundColor: '#33CC33',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '12px',
                                                padding: '12px 16px',
                                                fontSize: 'clamp(14px, 3vw, 16px)',
                                                fontWeight: 600,
                                                fontFamily: "'Neue Montreal', sans-serif",
                                                cursor: 'pointer',
                                                width: '100%',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            Continue
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Investment Deposit Modal */}
            <InvestmentDepositModal
                isOpen={showDepositModal}
                onClose={handleDepositModalClose}
                onBack={handleDepositModalBack}
                onFinish={handleDepositModalClose}
            />
        </>
    );
};
