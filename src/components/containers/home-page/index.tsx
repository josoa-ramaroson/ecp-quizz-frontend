"use client"
import React, { useState, useEffect } from 'react'
import { DailyQuizBanner, QuizCard } from './components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useDailyQuizzStore, useQuizzesStore } from '@/store'

export default function HomePage() {
  const { quizzes } = useQuizzesStore();
  const { dailyQuiz } = useDailyQuizzStore();
  
  // Add client-side mounted state
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // During SSR and initial client render, show consistent loading UI
  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">All Quizzes</h2>
          </div>
          
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }
  
  // After hydration, render full content
  return (
    <div className="space-y-8">
      {/* Only render DailyQuizBanner when dailyQuiz exists */}
      {dailyQuiz && <DailyQuizBanner quiz={dailyQuiz} />}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">All Quizzes</h2>
        </div>

        {!quizzes ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="not-taken">Not Taken</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz._id} quiz={quiz} />
              ))}
            </TabsContent>

            <TabsContent value="completed" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.filter((q) => q.isCompleted)
                .map((quiz) => (
                  <QuizCard key={quiz._id} quiz={quiz} />
                ))}
            </TabsContent>

            <TabsContent value="not-taken" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.filter((q) => !q.isCompleted)
                .map((quiz) => (
                  <QuizCard key={quiz._id} quiz={quiz} />
                ))}
            </TabsContent>
            <TabsContent value="closed" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes.filter((q) => q.status === "closed")
                .map((quiz) => (
                  <QuizCard key={quiz._id} quiz={quiz} />
                ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
