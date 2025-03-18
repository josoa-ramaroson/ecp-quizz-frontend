import { IQuiz } from "@/interfaces/quiz.interface";

export type TQuizzesStore = {
    quizzes: IQuiz[] | null;
    setQuizzes: (quizzes: IQuiz[]) => void;
    clearQuizzes: () => void;
}