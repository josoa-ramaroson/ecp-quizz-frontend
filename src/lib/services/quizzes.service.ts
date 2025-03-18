
import { IQuiz } from "@/interfaces/quiz.interface";
import { TEvaluateQuizDto, TEvaluationsResponse } from "@/types";
import { BaseService } from "./base.service";


export class QuizzesService extends BaseService {
    static readonly BASE_URI = "/quizzes";
    static async getQuizzes(): Promise<IQuiz[]> {
        const data  = await QuizzesService.makeRequests(`${this.BASE_URI}/of-member`);
        return data;
    }

    static async getDaily(): Promise<IQuiz> {
        const data  = await QuizzesService.makeRequests(`${this.BASE_URI}/daily/`);
        return data;
    }

    static async getQuizQuestions(quizId: string){
        const data = await QuizzesService.makeRequests(`${this.BASE_URI}/${quizId}/questions`)
        return data
    }

    static async evaluateQuiz(quizId: string, quizAnswer: Record<string,  string[]>) : Promise<TEvaluationsResponse> {
        const body = QuizzesService.convertRecordToDto(quizAnswer);
        const data = await QuizzesService.makeRequests(`${this.BASE_URI}/${quizId}/evaluate`, "POST", body)
    
        return data;
    } 

    

    static convertRecordToDto(answersForm: Record<string,  string[]>): TEvaluateQuizDto {
        const answers =  Object.keys(answersForm).map((questionId: string) => ({
            questionId,
            answersIds: answersForm[questionId]
        }));
        return { answers };
    }
}