"use client"

import { IQuiz } from "@/interfaces";
import { QuizzesService } from "@/lib/services";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


  
export function useQuizData(quizId: string) {
    const [quizData, setQuizData] = useState<IQuiz>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    const fetchQuizData = async () => {
        try {
            setIsLoading(true);
            const data = await QuizzesService.getQuizQuestions(quizId);
            setQuizData(data);
            setIsLoading(false);
            
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch quiz"))
            toast.error(err instanceof Error ? err.message : "Unknown error")
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchQuizData()
    }, []);
    return {
        quizData,
        isLoading,
        error,
        setQuizData
    }
}