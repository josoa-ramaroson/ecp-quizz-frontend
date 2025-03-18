import { IQuiz } from "@/interfaces/quiz.interface";

export type TDailyQuizStore = {
    dailyQuiz: IQuiz | null;
    setDailyQuiz: (quizzes: IQuiz) => void;
    clearDailyQuiz: () => void;
}