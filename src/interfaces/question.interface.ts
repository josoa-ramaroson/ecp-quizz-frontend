import { EQuestionType } from "@/enums/question-type.enum";


export interface IAnswer {
    id: string;
    text: string;
    isCorrect?: boolean;
}

export interface IQuestion{
    _id: string;
    title: string;
    description: string;
    type: EQuestionType;
    answersOptions: IAnswer[];
    score: number;
    comment?: string;
    creationDate: Date;
  }
  