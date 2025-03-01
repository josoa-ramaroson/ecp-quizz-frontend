"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokenStore } from "@/store";

const authHoc = <P extends object>(Component: React.ComponentType<P> ) => {
  return (props: P) => {
    const router = useRouter();
    const token = useTokenStore((state) => state.accessToken); // Get auth token from zustand store

    useEffect(() => {
      if (!token) {
        router.replace("/login"); // Redirect to login if not authenticated
      }
    }, [token, router]);

    if (!token) return null; // Prevent rendering protected content before redirect

    return <Component {...props} />;
  };
};

export default authHoc;
