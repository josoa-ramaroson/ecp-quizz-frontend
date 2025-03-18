export type TAnswerRecordDto = {
    questionId: string;
    answersIds: string[];
}
  
export type TEvaluateQuizDto =  {
    answers: TAnswerRecordDto[];
}
  