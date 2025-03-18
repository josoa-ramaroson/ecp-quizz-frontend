"use client"
import {  Footer, Heading } from '@/components'
import { EHeading } from '@/enums'
import { ArrowRight } from 'lucide-react'
import { FeaturesGrid } from './components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'


export default function WelcomePage() {

  const router = useRouter()
  
  const [isChangingPage, setIsChangingPage] = useState(false)
  
  const onStartQuizClicked = () => {
    setIsChangingPage(true);
    router.push("/login");
    // Remove the setIsChangingPage(false) here - it won't execute
    // because the page navigation interrupts the function
  };

  return (
    <div className="min-h-screen bg-gradient-to-b pt-32 from-background-light via-background to-background-dark">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center space-y-6 flex flex-col items-center">
        <Heading 
          as={EHeading.HEADING_1}
          className="text-secondary-900">
          Welcome to{' '}
          <span className="text-primary-600 relative inline-block">
            ECP Daily Quiz
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-primary-200 rounded-full"></div>
          </span>
        </Heading> 
   
        <Heading
          as={EHeading.HEADING_6}
          >
          Take daily English quizzes and compete for bi-weekly prizes!
        </Heading>

        <Button 
          className="rounded-xl"
          size="lg"
          variant="default"
          onClick={onStartQuizClicked}
          disabled={isChangingPage}
          >
          {isChangingPage ? 
            <LoadingSpinner className="mr-2" /> : 
            <ArrowRight className="mr-2" />
          }
          Start Quiz
        </Button>
      </div>

      <FeaturesGrid />
    </div>
 
    <Footer text='Ready to improve your English? Join our daily quiz challenge!' />
  </div>
  )
}
