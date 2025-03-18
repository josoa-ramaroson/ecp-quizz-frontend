"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    const router = useRouter();
    const { verifyAccessToken } = useAccessToken(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      
      // Check authentication only on client-side
      const checkAuth = async () => {
        if (!verifyAccessToken()) {
          router.replace("/login");
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };
      
      checkAuth();
    }, [verifyAccessToken, router]);

    // During SSR and initial client render, return a consistent loading UI
    if (!isMounted) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    // After hydration, we can show different states
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    // Only render the component if authenticated
    return isAuthenticated ? <Component {...props} /> : null;
  };
  return WrappedComponent;
};

export default withAuth;
