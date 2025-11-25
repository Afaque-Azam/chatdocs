"use client"
import React, { useEffect } from 'react'
import Image from 'next/image';

import Icon1 from "@/assets/searchIcon.png"
import Icon2 from "@/assets/brain.png"
import Icon3 from "@/assets/rocket.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const FeatureSec = () => {

    const features = [
        {
          title: "Instant Answers",
          icon: Icon1,
          description: "Ask anything, get answers fast. No more digging through docs."
        },
        {
          title: "Smart Summarization",
          icon: Icon2,
          description: "Understands the whole doc and gives you the key stuff, fast."
        },
        {
          title: "No Setup Needed",
          icon: Icon3,
          description: "Drop your file, start chatting. No installs or extra steps."
        }
      ];
      
        useEffect(() => {
          AOS.init();
        }, [])
      
      

  return (
    <>
        <div className='py-[8rem] bg-[#ffffff0d] ' >
            <p data-aos="fade-down" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-delay="100"  className='text-center w-[60%] text-[2.5rem] m-auto max-tablet:w-[90%]  text-gray-300  font-semibold' >
            Say goodbye to doc overload. ChatDoc gives you fast, smart, and simple answers—straight from your files.
            </p>
            <div>
                <div className='flex justify-around mt-[8rem] flex-wrap max-tablet:gap-y-[5rem] ' >
                    {
                        features.map((i, index) => (
                           <div
                           data-aos="flip-left" data-aos-duration="1500" data-aos-easing="ease-in-out" data-aos-delay={`${index* 100}` }
                           style={{ boxShadow: '0px 0px 20px 6px rgb(72,64,196,0.30)' }} 
                            key={index} className='w-[25%] bg-black py-[2rem] px-[1rem] rounded-[1rem] flex items-center flex-col gap-[0.5rem] hover:scale-[1.03] transition-all max-tablet:w-[40%] max-mobile:w-[70%] max-smobile:w-[80%] '  > 
                                <Image className='w-[20%]' src={i.icon} alt='Icon'  />
                                <h2 className='text-[2rem] text-center font-semibold ' >{i.title}</h2>
                                <p className='text-[1.6rem] text-center text-gray-200 ' >{i.description}</p>
                           </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default FeatureSec