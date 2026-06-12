"use client";
import { ReactNode, useMemo, useEffect, useState, useCallback } from "react";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { usePathname, useRouter } from "next/navigation";
import { canAccessRoute } from "@/utils/auth";
import { ROLE_PERMISSIONS, UseCase, UserRole } from "@/types";
import { Spinner } from "react-activity";

interface BaseProps {
  allowedRoles?: UserRole[];
  allowedUseCases?: UseCase[];
  permission?: keyof typeof ROLE_PERMISSIONS;
  children: ReactNode;
}

// Hook for permission checking
const usePermissionCheck = () => {
  const { isLoggedIn, loginData } = useAuthSelector();
  const { userProfile } = useDashboardSelector();
  const pathname = usePathname();

  const role = userProfile?.role?.toLowerCase() as UserRole;
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;

  const checkAccess = useMemo(() => {
    return ({
      allowedRoles = [],
      allowedUseCases = [],
      permission,
    }: Omit<BaseProps, "children">) => {
      if (permission && ROLE_PERMISSIONS[permission]) {
        const allowedRolesForPermission = ROLE_PERMISSIONS[permission];
        return role && (allowedRolesForPermission as UserRole[]).includes(role);
      }

      const roleAllowed =
        allowedRoles.length === 0 || (role && allowedRoles.includes(role));
      const useCaseAllowed =
        allowedUseCases.length === 0 ||
        (useCase && allowedUseCases.includes(useCase));

      if (allowedRoles.length === 0 && allowedUseCases.length === 0) {
        return canAccessRoute(pathname, role, useCase, isLoggedIn);
      }

      return roleAllowed && useCaseAllowed;
    };
  }, [role, useCase, pathname, isLoggedIn]);

  return { checkAccess, isLoggedIn, userProfile };
};

// Page Guard - with loading and redirect to login
const PageGuard = ({
  allowedRoles = [],
  allowedUseCases = [],
  permission,
  children,
  requireProfile = true,
}: BaseProps & { requireProfile?: boolean }) => {
  const { checkAccess, isLoggedIn, userProfile } = usePermissionCheck();
  const router = useRouter();

  const hasAccess = useMemo(() => {
    return checkAccess({ allowedRoles, allowedUseCases, permission });
  }, [checkAccess, allowedRoles, allowedUseCases, permission]);

  const handleRedirect = useCallback(() => {
    if (!hasAccess) {
      router.replace("/login");
    }
  }, [hasAccess, router]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  // Show loading if profile required but not loaded
  if (requireProfile && isLoggedIn && !userProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return hasAccess ? <>{children}</> : null;
};

// UI Guard - just hide/show elements
const UIGuard = ({
  allowedRoles = [],
  allowedUseCases = [],
  permission,
  children,
}: BaseProps) => {
  const { checkAccess } = usePermissionCheck();
  const hasAccess = checkAccess({ allowedRoles, allowedUseCases, permission });

  return hasAccess ? <>{children}</> : null;
};

const RoleGuard = PageGuard;

export { PageGuard, UIGuard, RoleGuard };
export default RoleGuard;
