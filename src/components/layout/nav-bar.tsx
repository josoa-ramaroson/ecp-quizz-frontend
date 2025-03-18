"use client"

import { useEffect, useState } from "react"; // Add this import
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Trophy, Menu } from "lucide-react";
import {  useDailyQuizzStore, useMemberStore } from "@/store";
import { useAuth } from "@/hooks";

export default function Navbar() {
  const { member } = useMemberStore();
  const { logout } = useAuth();
  const { dailyQuiz } = useDailyQuizzStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted on client
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left - Logo */}
        <Link href="/home" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
          <Trophy className="h-6 w-6 text-primary-900" />
          <span className="text-primary-900">ECPQuizzes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/home" className="text-sm font-medium text-gray-700 hover:text-primary">
            Home
          </Link>
          <Link
            href={dailyQuiz ? `/quiz/${dailyQuiz._id}` : "/404"}
            className="text-sm font-medium text-gray-700 hover:text-primary"
          >
            Daily Quiz
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium text-gray-700 hover:text-primary">
            Leaderboard
          </Link>
        </nav>

        {/* Right - User Actions */}
        <div className="flex items-center space-x-4">
          
            <>
              {/* Rank & Points */}
              <div className="flex items-center space-x-1 border border-gray-300 rounded-lg overflow-hidden bg-primary-600 text-white">
                <span className="flex items-center gap-1 px-3 py-1 text-sm font-medium bg-primary-700">
                  <Trophy className="h-4 w-4 text-yellow-400" />
                  {/* Only show actual rank after client-side hydration is complete */}
                  {!isMounted ? "N/A" : (member?.rank || "N/A")}
                </span>
                <span className="px-3 py-1 text-sm font-bold">
                  {/* Only show actual score after client-side hydration is complete */}
                  {!isMounted ? "0" : `${member?.totalScore || 0}`} pts
                </span>
              </div>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={member?.firstName} />
                      <AvatarFallback>{!isMounted ? "U" : (member?.firstName?.charAt(0) || "U")}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{!isMounted ? "User" : (member?.firstName || "User")}</p>
                      <p className="text-xs text-gray-500">{!isMounted ? "Pseudo" : (member?.pseudo || "Your Pseudo")}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-secondary-300 " >
                    <Link href="/profile" className="cursor-pointer hover:bg-secondary-300 ">Profile</Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link href="">Settings</Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login" onClick={() => logout()}>Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
         
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>ECPQuizzes</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-4 py-6 text-center">
                <Link href="/home" className="text-base font-medium text-gray-700 hover:text-primary">
                  Home
                </Link>
                <Link href={dailyQuiz ? `/quiz/${dailyQuiz._id}` : "/404"} className="text-base font-medium text-gray-700 hover:text-primary">
                  Daily Quiz
                </Link>
                <Link href="/leaderboard" className="text-base font-medium text-gray-700 hover:text-primary">
                  Leaderboard
                </Link>
              
                <Link href="/profile" className="text-base font-medium text-gray-700 hover:text-primary">
                  Profile
                </Link>
            
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
