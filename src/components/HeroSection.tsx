"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import ImageSec1 from "@/assets/Sec1Img.png"
import Marquee from "react-fast-marquee";
import AOS from 'aos';
import 'aos/dist/aos.css';
const HeroSection = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  
  return (
    <>
      <div className='w-full justify-center flex items-center min-h-[70vh] flex-col my-[3rem]  max-mobile:min-h-[50vh]  ' >
         <div className='w-[60%] flex flex-col items-center gap-[1rem] max-laptop:w-[75%] max-slaptop:w-[90%] max-mobile:w-full max-tablet:mt-[3rem] ' >
          <div data-aos="zoom-in-up" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-delay="500"  className='!text-[1.5rem] font-semibold w-[55%] max-mobile:w-[80%] flex justify-center items-center rounded-[0.5rem] ' >
          <TypeAnimation
                        sequence={[
                          'Chat with your PDFs 🤖📄',
                          1000,
                          'Ask anything, get instant answers ⚡️',
                          1000,
                          'Make boring docs talk 🗣️',
                          1000,
                          'Turn files into conversations 💬',
                          1000,
                          'No more scrolling — just ask! 🙌',
                          1000,
                        ]}
                        wrapper="span"
                        speed={30}
                        repeat={Infinity}
                      />
          </div>
           <h1 data-aos="fade-up"  data-aos-duration="1000" data-aos-easing="ease-in-out"  className='sans-font text-[6.5rem] text-center font-[600] max-tablet:text-[6rem] max-mobile:text-[5rem] max-smobile:text-[4.5rem] max-xsmobile:text-[4rem] max-[340px]:text-[3.5rem] ' >Turn PDFs Into Chat No Boring Stuff</h1>
           <h6 data-aos="fade-up"  data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-delay="200" className='text-[1.7rem] font-semibold text-gray-300 w-[60%] text-center max-mobile:w-[80%] ' >ChatDoc turns boring documents into real-time convos—get answers fast, no scrolling needed.</h6>
           <div data-aos="fade-up"  data-aos-duration="2000" data-aos-easing="ease-in-out" data-aos-delay="300" className='flex items-center justify-center gap-[2rem]  mt-[2rem] ' >
             <Link href={"/playground"} className=' bg-[#ffffff3b] text-white font-semibold px-[2rem] py-[0.5rem] rounded-[0.5rem] text-[1.5rem] hover:scale-[1.03] transition-all '  >Launch Playground</Link>
             <Link href={"/howitwork"} className=' bg-[#ffffff3b] text-white font-semibold px-[2rem] py-[0.5rem] rounded-[0.5rem] text-[1.5rem]  hover:scale-[1.03] transition-all' >How It Works?</Link>
           </div>
         </div>
         <div className='w-[100%] h-[40vh] animate-float  relative z-[-5] max-mobile:h-[15vh] '>
          <Image className='animate-blink w-[100%] h-full object-cover object-top ' src={ImageSec1} alt='' />
         </div>
         <div className='text-[2rem] overflow-hidden w-full font-semibold  ' >
          <Marquee
          gradient={false}
          speed={60}
          pauseOnHover>
          <h3 className="mx-[3rem] animate-pulse">⚡ Chat with Any PDF</h3>
          <h3 className="mx-[3rem] animate-pulse">💬 Instant AI Responses</h3>
          <h3 className="mx-[3rem] animate-pulse">📄 No More Boring Reading</h3>
          <h3 className="mx-[3rem] animate-pulse">🧠 Smart Contextual Replies</h3>
          <h3 className="mx-[3rem] animate-pulse">🚀 Built for Speed & Clarity</h3>
          </Marquee>
         </div>
      </div>
    </>
  )
}

export default HeroSection