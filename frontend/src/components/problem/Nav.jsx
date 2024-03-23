"use client";

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import { useAddress } from '@thirdweb-dev/react';
import { ArrowLeft, ChevronLeft, ChevronRight, MoveLeft, User } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const address = useAddress();

    const loginHandler = () => {
        navigate("/login");
    }
    const userId = 'sfdsd';
    return (
        <nav className='sticky inset-x-0 bg-background pz-2 py-3 px-6'>
            <main className='flex items-center justify-between '>
                {/* Logo */}
                <div className='flex items-center space-x-4 w-full h-full'>
                    <img
                        onClick={() => navigate('/')}
                        src='/assets/logo.png'
                        alt='Code Duel'
                        className='w-[180px] h-[100%] cursor-pointer'
                    />

                    {/* prev and next problem buttons */}
                    <div className='pl-4 text-lg flex space-x-2 items-center text-foreground'>
                        <ChevronLeft className='cursor-pointer' size={28} />
                        <span className='text-second text-sm'>{"Problem 1"}</span>
                        <ChevronRight className='cursor-pointer' size={28} />
                    </div>
                </div>
                {/* right side */}
                <div className='flex items-center space-x-4'>
                    <p className='text-gray-400'>{address}</p>
                    <User className='text-white' size={28} />
                    {/* <Button variant='link' className='bg-red-500  text-foreground hover:bg-black'>
                        Logout
                    </Button> */}
                </div>
            </main>
        </nav>
    )
}

export default Nav