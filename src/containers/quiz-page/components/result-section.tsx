"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IQuiz } from "@/interfaces/quiz.interface"

interface ResultSectionProps {
  quizData: IQuiz;
}

export default function ResultSection({ quizData }: ResultSectionProps) {
  const getMotivationalMessage = () => {
    if (!quizData.totalScore) return "Keep learning and try again to improve your score.";
    if (quizData.totalScore === quizData.maxScore) {
      return "Perfect score! Excellent work!";
    } else if (quizData.totalScore >= quizData.maxScore * 0.7) {
      return "Great job! You've mastered most of this content.";
    } else if (quizData.totalScore >= quizData.maxScore * 0.5) {
      return "Good effort! Keep practicing to improve your score.";
    } else {
      return "Keep learning and try again to improve your score.";
    }
  }

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
      <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-green-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Quiz Completed!</h1>
        <p className="text-xl">
          You scored <span className="font-bold text-primary">{quizData.totalScore}</span> out of <span className="font-bold">{quizData.maxScore}</span> points
        </p>
        <p className="text-muted-foreground">
          {getMotivationalMessage()}
        </p>
      </div>
      
      <div className="pt-6">
        <Link href={`/quiz/${quizData._id}/results`}>
          <Button variant="default" size="lg">
            View Detailed Results
          </Button>
        </Link>
        
        <Link href="/home" className="block mt-4">
          <Button variant="outline">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}