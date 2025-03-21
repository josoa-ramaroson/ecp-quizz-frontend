"use client"
import { Heading } from '@/components/ui';
import { EHeading, EQuizStatus } from '@/enums';
import { EQuestionType } from '@/enums/question-type.enum';
import { useQuizData } from '@/hooks';
import { Circle, Square } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Utility function for conditional class names
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function QuizResultPage() {
  const { id } = useParams();
  const { isLoading, quizData } = useQuizData(id as string);
  const [answers, setAnswers] = useState<Record<string, { id: string, text: string; isCorrect: boolean; isSelected: boolean }[]>>({});

  useEffect(() => {
    if (quizData) {
      const { questions, answersRecord } = quizData;
      const newAnswers = questions.reduce((acc, question) => {
        const selectedAnswers = answersRecord?.find((record) => record.questionId === question._id)?.answersIds || [];
        
        const processedAnswers = question.answersOptions.map((answerOption) => ({
          id: answerOption.id,
          text: answerOption.text,
          isCorrect: !!answerOption.isCorrect, // Ensure it's always a boolean
          isSelected: selectedAnswers.includes(answerOption.id), // Correctly checks selection
        }));

        acc[question._id] = processedAnswers;
        return acc;
      }, {} as Record<string, { id: string, text: string; isCorrect: boolean; isSelected: boolean }[]>);

      setAnswers(newAnswers);
    }
  }, [quizData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }


  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No quiz data available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <div className="flex justify-between items-start">
        <div>
          <Heading as={EHeading.HEADING_2}>{quizData?.title}</Heading>
          <p className="text-gray-500 mb-4">{quizData?.description}</p>
        </div>
        <div className="text-right">
          {
            quizData?.status != EQuizStatus.CLOSED? (
              <>
              <div className="font-semibold text-lg">Your score: {quizData?.totalScore} / {quizData?.maxScore}</div>
              <div className="text-gray-400">Finished at: {quizData?.finishedAt}</div>
              </>
            ) : 
            <div className="font-semibold text-lg text-red-600">Missed</div>
          }
        </div>
      </div>
      
      {( quizData?.status != EQuizStatus.CLOSED && !quizData?.isCompleted) ? (
        <Link href={`/quiz/${id}`} className="text-blue-500 underline" >
          Take Quiz
        </Link>
      ) : (
        <div>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4 text-gray-700">Your Answers</h2>
            <div className="space-y-6">
              {quizData?.questions?.map((question) => (
                <Card key={question._id} className="p-4 border rounded-lg shadow">
                  <Heading as={EHeading.HEADING_5} className='text-gray-800'>{question.title}</Heading>
                  <p className="text-gray-500">{question.description}</p>

                  <div className="mt-4 space-y-2">
                    {answers[question._id]?.map((answer) => (
                      <div
                        key={answer.id}
                        className={cn(
                          'flex items-center space-x-2 p-2 rounded',
                          answer.isSelected && answer.isCorrect
                            ? 'bg-green-200 text-green-800' // Correct & selected ✅
                            : answer.isSelected && !answer.isCorrect
                            ? 'bg-red-200 text-red-800' // Incorrect & selected ❌
                            : !answer.isSelected && answer.isCorrect
                            ? 'bg-red-200 text-red-800' // Correct but NOT selected ⚠️
                            : 'bg-gray-100'
                        )}
                      >
                        {question.type === EQuestionType.MULTIPLE_CHOICE ? (
                          <Square size={16} fill={answer.isSelected ? 'currentColor' : 'none'} />
                        ) : (
                          <Circle size={16} fill={answer.isSelected ? 'currentColor' : 'none'} />
                        )}
                        <span>{answer.text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-green-500">{question.comment}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
