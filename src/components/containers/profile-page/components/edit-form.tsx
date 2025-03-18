"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '../schema';
import { IMember } from '@/interfaces';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TEditFormSchema } from '@/types';
import { useGeneratePseudo } from '@/hooks';

type TEditFormProps = {
    member: IMember,
    onSubmit:  (DataTransfer: TEditFormSchema) => Promise<void>
}
export default function EditForm({ member, onSubmit }: TEditFormProps) {
    const { generatePseudo } = useGeneratePseudo()
    const [showPassword, setShowPassword] = useState(false);
    const hookForm = useForm<TEditFormSchema>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            firstName: member.firstName,
            facebookName: member.firstName,
            pseudo: member.pseudo,
            newPassword: "",
            confirmPassword: ""
        }
    });

    const handleGeneratePseudo = () => {    
        const pseudo = generatePseudo();
        hookForm.setValue('pseudo', pseudo);
    }


    return (
        <Form {...hookForm}>
            <form onSubmit={hookForm.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={hookForm.control}
                    name='firstName'
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: SillyName" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={hookForm.control}
                    name='facebookName'
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>Facebook Name</FormLabel>
                            <FormControl>
                                <Input placeholder="ex: SillyMe..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={hookForm.control}
                    name='pseudo'
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <div className="flex items-center relative">
                                    <Input type="text"  placeholder="ex: SillyPinguin..." {...field} />
                                    <button
                                        type="button"
                                        className="absolute right-3 text-gray-500 hover:bg-secondary-100 active:bg-secondary-300 p-2 rounded-full"
                                        title='Generate a pseudo'
                                        onClick={handleGeneratePseudo}
                                    >
                                        <RefreshCcw size={18} /> 
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={hookForm.control}
                    name='newPassword'
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <div className='flex items-center relative'>
                                    <Input type={showPassword? "text": "password"}  placeholder="Member's password" {...field} />
                                    <button
                                        type="button"
                                        className="absolute right-3 text-gray-500 p-2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                
                    control={hookForm.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem className='mb-4'>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input type="password"  placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full'>Save Changes</Button>
            </form>

        </Form>
    )
}
