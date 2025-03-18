import { IQuiz } from "@/interfaces/quiz.interface";
import { TQuizzesStore } from "@/types";
import { create } from "zustand";

export const useQuizzesStore = create<TQuizzesStore>((set) =>({
    quizzes: [],
    setQuizzes: (quizzes: IQuiz[]) => {
        set({quizzes})
    },
    clearQuizzes: () => {
        set({quizzes: []});
    }
}));