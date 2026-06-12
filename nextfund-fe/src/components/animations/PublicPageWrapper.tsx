"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PublicPageWrapperProps {
    children: ReactNode;
}

const isDashboardRoute = (path: string) => {
    return path.startsWith('/dashboard') ||
        path.startsWith('/business') ||
        path.startsWith('/admin');
};

export const PublicPageWrapper = ({ children }: PublicPageWrapperProps) => {
    const pathname = usePathname();

    // Only apply animations to public pages, not dashboard/business/admin
    if (isDashboardRoute(pathname)) {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};
