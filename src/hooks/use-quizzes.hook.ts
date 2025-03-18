"use client"
import { EErrorMessage } from "@/enums";
import { QuizzesService } from "@/lib/services";
import { useDailyQuizzStore } from "@/store";
import { useQuizzesStore } from "@/store/use-quizzes.store";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useQuizzes() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { setQuizzes } = useQuizzesStore();
    const { setDailyQuiz } = useDailyQuizzStore()
    const fetchQuizzes = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await QuizzesService.getQuizzes()
           
            setQuizzes(data)
          } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch quizzes"))
            toast.error(err instanceof Error ? err.message : EErrorMessage.UNKOWN_ERROR);
          } finally {
            setIsLoading(false);
          }
    }, []);

    const fetchDailyQuiz = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const data = await QuizzesService.getDaily();
            setDailyQuiz(data);
          } catch (err) {
            setError(err instanceof Error ? err : new Error("Failed to fetch quizzes"))
            toast.error(EErrorMessage.NO_DAILY_QUIZ_TODAY);
          } finally {
            setIsLoading(false);
          }
    }, []);

 

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    useEffect(() => {
        fetchDailyQuiz();
    }, [fetchDailyQuiz]);

  
    return {
        isLoading, 
        error,
        fetchQuizzes,
        fetchDailyQuiz,
    }
}