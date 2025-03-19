"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, AtSignIcon, LucideFacebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { EditForm } from "./components"
import { useMemberStore } from "@/store"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { TEditFormSchema } from "@/types"
import { useMember } from "@/hooks"
import { handleApiExceptions } from "@/lib/utils"
import { useState, useEffect } from "react"
import { usePersonalStats } from "@/hooks/use-personal-stats.hook"
import Link from "next/link"

type TProfilePage = {
  isPopupOpen?: boolean;
}
export default function ProfilePage({ isPopupOpen = false }: TProfilePage) {
  const { member } = useMemberStore();
  const { updateMemberProfile } = useMember();
  // Add client-side mounted state
  const [isMounted, setIsMounted] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(isPopupOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { personalStats } = usePersonalStats();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  
  const handleSubmit = async (data: TEditFormSchema) => {
    setIsSubmitting(true);
    await handleApiExceptions(async () => { 
      await updateMemberProfile(data);  
      setIsEditOpen(false);
    });
    setIsSubmitting(false);
  }
  
  // During SSR and initial client render, show a skeleton/loading state
  if (!isMounted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  // After hydration, render based on member data
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {(!member || !personalStats) ? (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] max-h-[calc(100vh-6rem)]">
          <div className="sm:hidden z-10 w-full flex justify-center items-center">
            <Button variant="link" className="flex items-center gap-1 text-primary-700 hover:text-primary-900">
              <Link href="/home" className="flex gap-">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to home</span>
              </Link>
            </Button>
          </div>
          <Card>

            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback>{member.firstName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{member.firstName}</CardTitle>
              <CardDescription>
                <div className="flex w-full items-center justify-start">
                  <AtSignIcon className="h-4 w-4 flex-shrink-0" />
                  <p>{member.pseudo}</p>
                </div>
                <div className="flex w-full items-center justify-center">
                  <LucideFacebook className="h-4" />
                  <p>{member.facebookName}</p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold">{member.totalScore}</div>
                <div className="text-xs text-muted-foreground uppercase">Total Score</div>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">#{member.rank}</div>
                  <div className="text-xs text-muted-foreground uppercase">Rank</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{personalStats.quizzesTaken}</div>
                  <div className="text-xs text-muted-foreground uppercase">Quizzes</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full hover:bg-primary-700" onClick={()=> setIsEditOpen(true)}>
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">                    
                    {
                      isPopupOpen ? 
                      <>
                        <span className="text-3xl">👋</span> 
                        <span>Welcome to ECP Daily Quiz!</span>
                      </> : 
                      <>
                        <span className="text-2xl">✏️</span>
                        <span>Edit Profile</span>
                      </>
                    }
                    </DialogTitle>
                    {isPopupOpen && 
                      <CardDescription className="text-center mt-2">
                        <p className="mb-2">We&apos;re excited to have you join our community! 🎉</p>
                        <p>Complete your profile information to enhance your experience and connect with fellow English learners. 
                        This will help us personalize your quizzes and show your achievements on the leaderboard.</p>
                      </CardDescription>
                    }
                  </DialogHeader>
                  {(member && !isSubmitting) && <EditForm member={member} onSubmit={handleSubmit}/>}
                  {(member && isSubmitting) && <LoadingSpinner />}
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your quiz performance at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{personalStats.quizzesTaken}</div>
                    <div className="text-xs text-muted-foreground">Quizzes Taken</div>
                  </div>
                  <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{personalStats.averageScore}%</div>
                    <div className="text-xs text-muted-foreground">Average Score</div>
                  </div>
                  <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{personalStats.perfectScore}</div>
                    <div className="text-xs text-muted-foreground">Perfect Scores</div>
                  </div>
                  <div className="space-y-1 text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold">{personalStats.questionAnswered}</div>
                    <div className="text-xs text-muted-foreground">Questions Answered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Badge Earned</CardTitle>
                <CardDescription>Take badge and earn a prise</CardDescription>
              </CardHeader>
              <CardContent>
               <div className="flex items-center justify-center h-full w-full">
                <p className="text-blue-700">Available in future version</p>
               </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

