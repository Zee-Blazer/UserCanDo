import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isPublicRoute } from "@/utils/auth";

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
	const pathname = usePathname();

	if (isPublicRoute(pathname)) {
		return <>{children}</>;
	}

	return <>{children}</>;
};

export default AuthGuard;
