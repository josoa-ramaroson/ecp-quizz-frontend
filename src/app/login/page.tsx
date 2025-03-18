"use client"
import { LoginPage } from '@/components'
import { useAccessToken } from '@/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';


export default function Page() {
  const router = useRouter();
  const { accessToken, verifyAccessToken } = useAccessToken(); // Get auth token from zustand store
  useEffect(() => {
      if (verifyAccessToken()) {
        router.replace("/home"); // Redirect to login if not authenticated
      } 
  }, 
  [router, accessToken]);
  
  
  return (
    <>
    <LoginPage 
    />
    <Toaster toastOptions={{duration: 2000}}/>
    </>
  )
}
