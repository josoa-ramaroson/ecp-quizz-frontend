import { IQuiz } from "@/interfaces/quiz.interface";
import { TDailyQuizStore, } from "@/types";
import { create } from "zustand";

export const useDailyQuizzStore = create<TDailyQuizStore>((set) =>({
    dailyQuiz: null,
    setDailyQuiz: (daily: IQuiz) => set({ dailyQuiz: daily }),
    clearDailyQuiz: () => set({ dailyQuiz: null })
}));