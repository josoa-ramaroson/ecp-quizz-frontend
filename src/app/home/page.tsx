"use client"
import { HomePage } from '@/components/containers'
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
