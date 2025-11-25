import FeatureSec from "@/components/FeatureSec"
import Footer from "@/components/Footer"
import HeroSection from "@/components/HeroSection"
import HS from "@/components/HS"
import Navbar from "@/components/Navbar"
import VideoTut from "@/components/VideoTut"
const page = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <FeatureSec/>
    <HS/>
    <VideoTut/>
    <Footer/>
    </>
  )
}

export default page