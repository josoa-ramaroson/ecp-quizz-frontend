type TAnswerRecordDto = {
 
    questionId: string;
    answersIds: string[];
  }
  
export  type TEvaluationsResponse = {
    score: number;
    answersRecord: TAnswerRecordDto[];
    quizId: string;
  }
  