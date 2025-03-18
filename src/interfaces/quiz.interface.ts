import { EQuizStatus } from "@/enums";
import { IQuestion } from "./question.interface";
import { IAnswerRecord } from "./answer-record.interface";

export interface IQuiz {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  deadline: string;
  numberOfQuestions: number;
  questions: IQuestion[];
  creationDate: string;
  isCompleted: boolean;
  maxScore: number;
  status: EQuizStatus;
  totalScore?: number;
  finishedAt?: string;
  answersRecord?: IAnswerRecord[] ;

}
