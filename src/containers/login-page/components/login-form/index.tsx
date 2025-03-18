"use client"

import clsx from 'clsx';
import React, { useState } from 'react'
import { ArrowRight, User } from 'lucide-react';
import { TLoginFormData } from '@/types';
import { Input } from '@/components';
import PasswordInput from './password-input';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

type TLoginForm = {
    className?: string;
    loginFormData: TLoginFormData;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm(
    {
        className,
        handleSubmit,
        handleInputChange,
        loginFormData,
    }: TLoginForm
) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitWithState = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    try {
      await handleSubmit(e); // Ensure the async operation completes
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner className="flex justify-center items-center h-20" />;
  }

  return (
    <form
        onSubmit={handleSubmitWithState}
        className={clsx("space-y-6", className)}>
        <Input 
          id='pseudo'
          value={loginFormData.pseudo}
          type="text"
          label='Pseudo'
          required={true}
          handleChange={handleInputChange}
          leftIcon={<User />}
          placeHolder='ex: SillyPenguin,...'
        />

        <PasswordInput 
          value={loginFormData.password}
          handleChange={handleInputChange}       
        />
        
        <Button 
          variant={"default"}
          disabled={isSubmitting}
          className={cn('w-full', {"opacity-50": isSubmitting})}
        >
          <ArrowRight className="w-5 h-5" />
          Continue to Quiz
        </Button>
    </form>
  )
}
