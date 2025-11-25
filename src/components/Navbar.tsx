import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <>
        <nav  className='flex justify-between py-[2rem] px-[2rem]  ' >
            <div>
                <h1 className='sans-font text-[2rem] font-semibold ' >ChatDoc</h1>
            </div>
            <div className='flex gap-[2rem] font-semibold text-[1.3rem] items-center ' >
                <Link className='hover:scale-[1.02] transition-all '  href={"/"} >Home</Link>
                <Link  className='hover:scale-[1.02] transition-all '  href={"/playground"} >Playground</Link>
                <Link className='hover:scale-[1.02] transition-all '  href={"/#howitworks"} >How it Work</Link>
                <SignedOut>
                  <Link className='hover:scale-[1.02] transition-all '  href={"/sign-in"} >SignIn</Link>
                </SignedOut>
                <SignedIn>
                  <Link className='hover:scale-[1.02] transition-all '  href={"/user-profile"} >Profile</Link>
                </SignedIn>
            </div>
        </nav>
    </>
  )
}

export default Navbar