"use client"
import Navbar from "@/components/layout/nav-bar"
import { refreshDataHoc } from "@/lib/hoc"
import { Toaster } from "react-hot-toast"


function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
        <div className="min-h-screen  flex flex-col ">
            <Navbar />
            <main className="flex-1 max-w-6xl container mx-auto py-6 px-4">{children}</main>
            
            <Toaster toastOptions={{duration: 2000}}/>
        </div>
    
  )
}

export const DashboardLayout = refreshDataHoc(Layout);
