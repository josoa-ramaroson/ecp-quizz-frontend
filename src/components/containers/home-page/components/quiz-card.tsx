import Link from "next/link"
import { CardFooter, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

import { IQuiz } from "@/interfaces/quiz.interface"
import { useQuizStatus } from "@/hooks"
import { EQuizStatus } from "@/enums"

interface QuizCardProps {
  quiz: IQuiz
}

export function QuizCard({ quiz }: QuizCardProps) {
  
  const formattedDate = formatDistanceToNow(new Date(quiz.startDate), { addSuffix: true })
  const status = useQuizStatus(quiz);
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{quiz.title}</CardTitle>
          <Badge variant={status === EQuizStatus.CLOSED ? "outline" : quiz.isCompleted ? "secondary" : "default"}>
            {status === EQuizStatus.CLOSED ? "Closed" : quiz.isCompleted ? "Completed" : "Not Taken"}
          </Badge>
        </div>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm">
          <div>Available {formattedDate}</div>
          {quiz.numberOfQuestions && <div>{quiz.numberOfQuestions} questions</div>}
        </div>
        {quiz.isCompleted && quiz.totalScore && (
          <div className="mt-4">
            <div className="text-sm font-medium">Your score</div>
            <div className="text-2xl font-bold">
              {quiz.totalScore}/{quiz.maxScore}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({Math.round((quiz.totalScore / quiz.maxScore!) * 100)}%)
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link
            href={
                status === "closed" || quiz.isCompleted
                  ? `/quiz/${quiz._id}/results`
                  : `/quiz/${quiz._id}`
            }
          >
            {status === "closed" ? "View Results" : quiz.isCompleted ? "Review Quiz" : "Take Quiz"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

