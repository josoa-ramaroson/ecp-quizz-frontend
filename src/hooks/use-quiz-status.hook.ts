"use client"

import { EQuizStatus } from "@/enums"
import { IQuiz } from "@/interfaces"
import { useMemo } from "react"

export function useQuizStatus(quiz: IQuiz) {
    return useMemo(() => {
      const now = new Date()
      const startDate = new Date(quiz.startDate)
      const deadline = new Date(quiz.deadline)
  
      if (now >= startDate && now <= deadline) {
        return EQuizStatus.ACTIVE
      } else if (now < startDate) {
        return EQuizStatus.UPCOMING
      } else {
        return EQuizStatus.CLOSED
      }
    }, [quiz.startDate, quiz.deadline])
  }