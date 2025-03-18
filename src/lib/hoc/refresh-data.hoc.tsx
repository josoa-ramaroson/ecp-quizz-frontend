"use client"

import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useMember, useQuizzes } from "@/hooks";
import { usePathname } from "next/navigation";

const refreshDataHoc = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedSecondComponent = (props: P) => {
    const { isLoading, refreshMember } = useMember();
    const { fetchDailyQuiz, fetchQuizzes } = useQuizzes();
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();
    useEffect(() => {
      setIsMounted(true);
      console.log("fetching121")
      // Update member data
      refreshMember();
      if (pathname.startsWith("/home") || pathname.startsWith("/quiz")) {
        fetchDailyQuiz();
        fetchQuizzes();
      }
    }, [refreshMember, fetchDailyQuiz, fetchQuizzes]);

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

    return <Component {...props} />;
  };
  return WrappedSecondComponent;
};

export default refreshDataHoc;
