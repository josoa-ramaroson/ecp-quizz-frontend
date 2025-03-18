"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DashboardLayout } from '@/components/layout'

export default function NotFoundPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Oops! Page not found</h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          
          <Button variant="outline" asChild size="lg">
            <Link href="/home">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}