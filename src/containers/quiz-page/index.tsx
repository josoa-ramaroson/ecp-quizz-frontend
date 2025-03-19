"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import toast from "react-hot-toast"
import { useParams } from "next/navigation"
import { useQuizData } from "@/hooks"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { QuestionOptions, ResultSection } from "./components" // Import the new component
import { EQuestionType } from "@/enums/question-type.enum"
import { QuizzesService } from "@/lib/services"

export default function QuizPage() {
  // Update the answers state to handle different answer types
  const [answers, setAnswers] = useState<Record<string,  string[]>>({});
  const params = useParams()
  const quizId = params.id as string;
  const { quizData, setQuizData } = useQuizData(quizId);

  // Updated to handle both single and multiple answers
  const handleAnswerChange = (questionId: string, answer:  string[]) => {
   
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  };

  const handleSubmit = async () => {
    if (!quizData) return;
    
    
    const response = await QuizzesService.evaluateQuiz(quizData._id, answers);
    setQuizData({ ...quizData, isCompleted: true, totalScore: response.score});
    toast.success("Quiz submitted successfully");
  }

  const isAnswered = (questionId: string) => {
    if (answers[questionId] === undefined) return false;
    
    if (Array.isArray(answers[questionId])) {
      // For multiple choice, consider answered only if at least one option is selected
      return (answers[questionId] as string[]).length > 0;
    }
    
    // For single choice or short answer
    return answers[questionId] !== "";
  }

  const getProgressPercentage = () => {
    if (quizData === undefined) return 0;
    const answeredCount = quizData.questions.filter(q => isAnswered(q._id)).length;
    return (answeredCount / quizData.questions.length) * 100;
  }


  return (
    <div>
      {
        quizData && !quizData.isCompleted  ? 
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{quizData.title}</h1>
              <p className="text-muted-foreground">{quizData.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {quizData.questions.filter(q => isAnswered(q._id)).length} of {quizData.questions.length} questions answered
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            <div className="space-y-6">
              {quizData.questions.map((question, index) => (
                <Card
                  key={question._id}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-lg">{question.title}</span>
                      <span className="text-muted-foreground text-sm ml-auto">
                        {question.score} {question.score === 1 ? 'point' : 'points'}
                      </span>
                      
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium text-gray-600 p-2">{question.description}</div>
                    
                    <div className="text-xs text-muted-foreground mb-2">
                      {question.type === EQuestionType.MULTIPLE_CHOICE ? 
                        "Select all that apply" : 
                        question.type === EQuestionType.SHORT_ANSWER ?
                        "Type your answer" :
                        "Select one option"}
                    </div>
                    
                    <QuestionOptions
                      question={question}
                      onAnswerChange={handleAnswerChange}
                      currentAnswer={answers[question._id]}
                    />
                    

                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center">
             
              <Button 
                onClick={handleSubmit} 
          
                size="lg"
                disabled={(quizData.questions.every(q => isAnswered(q._id)) === false) || false} 
              >
               Submit Quiz
              </Button>
            
            </div>
          </div> 
        : 
          quizData && quizData.isCompleted ?
            <ResultSection quizData={quizData} />
        :
        <LoadingSpinner />
      }
    </div>
  )
}