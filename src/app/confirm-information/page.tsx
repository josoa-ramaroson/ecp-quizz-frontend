"use client"
import ConfirmInformationPage  from '@/containers/confirm-information-page'
import { DashboardLayout } from '@/components/layout'
import { withAuth } from '@/lib/hoc'
import React from 'react'

function page() {
  return (
    <DashboardLayout> 
      <ConfirmInformationPage />
    </DashboardLayout>
  )
}

export default withAuth(page);