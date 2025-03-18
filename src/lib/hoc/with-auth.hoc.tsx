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

    useEffect(() => {
      const checkAuth = async () => {
        setIsLoading(true);
        const isValid = await verifyAccessToken(); // Ensure this is awaited if it's async
        if (!isValid) {
          router.push("/login"); // Redirect to login if not authenticated
        } else {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      };

      checkAuth();
    }, [verifyAccessToken, router]); // Dependencies ensure this runs on every render

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
  return WrappedComponent;
};

export default withAuth;
