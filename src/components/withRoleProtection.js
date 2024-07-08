"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function withRoleProtection(WrappedComponent, allowedRoles) {
  return function ProtectedRoute(props) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading) {
        if (user && allowedRoles.includes(user.role)) {
          setIsAuthorized(true);
        } else {
          router.push("/");
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };
}
