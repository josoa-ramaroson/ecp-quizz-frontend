"use client"

import { useEffect, useState } from "react";
import { useMemberStore } from "@/store";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const checkFirstLogin = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedFirstComponent = (props: P) => {
    const router = useRouter();
    const { member } = useMemberStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      setIsMounted(true);
      
      if (member) {
        if (!member.hasPasswordChanged) {
          router.push("/confirm-information");
        }
      }
      setIsChecking(false);
    }, [member, router]);

    // During SSR and initial client render, return a consistent loading UI
    if (!isMounted) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    // After hydration, we can show different states
    if (isChecking) {
      return (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      );
    }

    if (!member?.hasPasswordChanged) return null;
    
    // Only render the component if password has been changed
    return <Component {...props} />;
  };
  return WrappedFirstComponent;
};

export default checkFirstLogin;
