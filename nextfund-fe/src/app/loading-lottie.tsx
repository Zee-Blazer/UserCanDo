"use client";

import Lottie from "lottie-react";
import { useEffect, useMemo, useRef } from "react";
import animationData from "../../public/NexFund-Animation.json";

interface LoadingAnimationProps {
    isVisible?: boolean;
    onComplete?: () => void;
}

export default function LoadingAnimation({ isVisible = true, onComplete }: LoadingAnimationProps) {
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const lottieOptions = useMemo(() => ({
        animationData,
        loop: true,
        autoplay: true,
    }), []);

    useEffect(() => {
        if (isVisible) {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }

            hideTimeoutRef.current = setTimeout(() => {
                if (onComplete) {
                    onComplete();
                }
            }, 2000);
        } else {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = null;
            }
        }

        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
            <div className="w-48 h-48 md:w-56 md:h-56">
                <Lottie
                    {...lottieOptions}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
}
