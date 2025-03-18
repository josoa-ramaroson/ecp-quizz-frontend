"use client"

import LeaderboardPage from '@/components/containers/leaderboard-page'
import { DashboardLayout } from '@/components/layout'
import React from 'react'

export default function Page() {
  return (
    <DashboardLayout>
       <LeaderboardPage />
    </DashboardLayout>
  )
}
