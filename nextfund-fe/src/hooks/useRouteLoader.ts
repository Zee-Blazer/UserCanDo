"use client";

import { useCallback } from "react";

export const useRouteLoader = () => {
    const startLoading = useCallback(() => {
        if (typeof window !== 'undefined' && (window as any).routeLoader) {
            (window as any).routeLoader.startLoading();
        }
    }, []);

    const stopLoading = useCallback(() => {
        if (typeof window !== 'undefined' && (window as any).routeLoader) {
            (window as any).routeLoader.stopLoading();
        }
    }, []);

    return { startLoading, stopLoading };
};
