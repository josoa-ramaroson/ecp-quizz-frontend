"use client"
import { HomePage } from '@/containers'
import { DashboardLayout } from '@/components/layout';
import { checkFirstLogin, withAuth } from '@/lib/hoc'

function Page() {
  return (
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  )
}


export default checkFirstLogin(withAuth(Page));
