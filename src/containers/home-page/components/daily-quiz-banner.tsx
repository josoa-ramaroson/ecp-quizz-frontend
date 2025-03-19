"use client"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Loader2 } from "lucide-react"
import { IQuiz } from "@/interfaces"

interface DailyQuizBannerProps {
  quiz: IQuiz
}

export function DailyQuizBanner({ quiz }: DailyQuizBannerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <Card className="bg-primary-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Today&apos;s Challenge: {quiz.title}</CardTitle>
        <CardDescription className="text-blue-100">{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">{quiz.numberOfQuestions} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Before midnight</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto text-black hover:bg-primary-100 hover:text-black"
          onClick={handleClick}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <Link href={`/quiz/${quiz._id}`}>{quiz.isCompleted ? "View score" : "Take Today's Quiz"}</Link>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

