import { useEffect, useRef, useState } from "react"
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const ScrollIntroVideo = () => {
      const containerRef = useRef(null);
      const videoRef = useRef<HTMLVideoElement | null>(null);
      const [videoLoaded, setVideoLoaded] = useState(false);

      useEffect(()=>{
        const video = videoRef.current;

        video.addEventListener("loadedmetadata",()=>{
          setVideoLoaded(true);

          gsap.to(video, {
            currentTime: video.duration || 1,
            ease: "none",
            scrollTrigger:{
              trigger: containerRef.current,
              start: "top top",
              end: "bottom+=100% top",
              scrub: true,
              pin: true,
            }
          })
        })
      },[]);

  return (
    <div ref={containerRef}
    className="fixed top-0 left-0 w-full h-screen overflow-hidden z-20 border-2">

      <video 
      ref={videoRef}
      src="assets/intro.mp4"
      preload="auto"
      muted
      playsInline
      className="w-full h-full object-cover"/>

      {videoLoaded && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8">
          <span className=" block w-4 h-4 border-b-2 border-r-2- border-white rotate-45 animate-bounce"></span>
        </div>
      )}

    </div>
  )
}

export default ScrollIntroVideo