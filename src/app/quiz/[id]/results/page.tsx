"use client"
import QuizResultpage from '@/containers/quiz-result-page';
import { DashboardLayout } from '@/components/layout'
import { withAuth } from '@/lib/hoc'
import React from 'react'

function Page() {
  return (
    <DashboardLayout>
        <QuizResultpage />
    </DashboardLayout>
  )
}

export default withAuth(Page);