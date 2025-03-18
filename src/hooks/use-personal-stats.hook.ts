"use client"

import { StatsService } from "@/lib/services";
import { TPersonalStats } from "@/types";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


  
export function usePersonalStats() {
    const [personalStats, setPersonalStats] = useState<TPersonalStats>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const fetchPersonalStats = async () => {
        try {
            setIsLoading(true);
            const data = await  StatsService.getPersonalStats();
            setPersonalStats(data);
            setIsLoading(false);      
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch Personal stats"))
            toast.error(err instanceof Error ? err.message : "Unknown error")
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchPersonalStats()
    }, []);
    return {
        personalStats,
        isLoading,
        error,
        
    }
}