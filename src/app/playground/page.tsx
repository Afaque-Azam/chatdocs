import Navbar from '@/components/Navbar'
import Uploader from '@/components/Uploader'
import React from 'react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'

const page = () => {
  return (
    <>
        <Navbar/>
        <SignedIn>
            <Uploader/>
        </SignedIn>
        <SignedOut>
            <div className='mt-[3rem] flex w-[90%] m-auto justify-center flex-col '>
                <h1 className='text-[2rem] font-semibold text-center'>Please Sign In to use the Playground</h1>
                <Link     className="m-auto w-fit bg-gray-900 px-[2rem] py-[0.8rem] rounded-[1rem] font-semibold text-[1.5rem] hover:scale-[1.02] transition-all cursor-pointer mt-[1.5rem] " href={"/sign-in"}>Please SignIn</Link>
            </div>
        </SignedOut>
    </>
  )
}

export default page