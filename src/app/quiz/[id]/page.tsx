"use client"
import QuizPage from '@/containers/quiz-page';
import { DashboardLayout } from '@/components/layout';
import { checkFirstLogin, withAuth } from '@/lib/hoc';

function Page() {
  return (
    <DashboardLayout>
      <QuizPage />
    </DashboardLayout>
  )
}


export default checkFirstLogin(withAuth(Page));
