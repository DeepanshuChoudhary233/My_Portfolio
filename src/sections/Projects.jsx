import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useMemo } from "react";
import { useScroll } from "framer-motion";
import calculator from "../assets/calculator.png";
import notesapp from "../assets/notesapp.png";
import imagephone from "../assets/imagephone.png";
import imagelaptop from "../assets/imagelaptop.png";
import { motion,AnimatePresence,useMotionValue, useMotionValueEvent } from 'framer-motion';


const useIsMobile=(query="(max-width: 639px)")=>{
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  )
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  },[query])
  return isMobile;
}



export default function Projects() {
  const isMobile=useIsMobile();
  const sceneref=useRef(null);
  const projects=useMemo(()=>[
    {
      title:"Notes Web App",
      link:"https://github.com/DeepanshuChoudhary233/Notepad1",
      bgColor:"#073c91",
      image:notesapp,
    },
    {
      title:"Image Gallery",
      link:"https://github.com/DeepanshuChoudhary233/Image-gallery",
      bgColor:"#f8c3f3",
      image:isMobile?imagephone:imagelaptop,
    },
    {
      title:"Calculator",
      link:"https://github.com/DeepanshuChoudhary233/Calculator",
      bgColor:"#064e3b",
      image:calculator,
    }
  ],[isMobile]);

  const {scrollYProgress}=useScroll({
    target:sceneref,
    offset:["start start","end end"]
  })
  const threshold=projects.map((_,i)=>(i+1)/projects.length);
  const [activeIndex,setActiveIndex]=useState(0);
  useMotionValueEvent(scrollYProgress,"change",(v)=>{
    const idx=threshold.findIndex((t)=>v<=t);
    setActiveIndex(idx==-1?threshold.length-1:idx);
  });

  const activeProject=projects[activeIndex];


  return (
    <section id="projects" ref={sceneref} className="relative text-white"
    style={{
      height : `${100 * projects.length}vh`,
      backgroundColor : activeProject.bgColor,
      transition : "background-color 400ms ease",
    }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile? "mt-4" : "mt-8"}`}>
          My Work</h2>

          <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "mt-4":"" }`}>
            {projects.map((project,idx)=>(
              <div key={project.title}
              className={`absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                idx===activeIndex ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"}`}
                style={{width:"85%", maxWidth:"1200px"}}
                >
                  <AnimatePresence mode="wait">
                    {idx===activeIndex && (
                      <motion.h3 key={project.title}
                      initial={{opacity:0, y:-30}}
                      animate={{opacity:1, y:0}}
                      exit={{opacity:0, y:30}}
                      transition={{duration:0.5, ease:"easeOut"}}
                      className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 font-semibold
                        italic &{isMobile?"-mt-24":""}`}
                        style={{
                          zIndex:5,
                          textAlign: isMobile? "center":"left",
                        }}
                      >
                        {project.title}
                      </motion.h3>
                    )}

                  </AnimatePresence>
                  <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl 
                    md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] $(
                    isMobile ? "mb-6 rounded-lg ":"mb-10 sm:mb-12 rounded-xl")
                    h-[62vh] sm:h-[66vh]
                    `}
                    style={{zIndex:10,transition:"box-shadow 250ms ease"}}
                    >
                    <img src={project.image} alt={project.title} 
                    className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                    style={{
                      position:"relative",
                      zIndex: 10,
                      filter:"drop-shadow(0,16px 40px rgba(0,0,0,0.65))",
                      transition:"filter 200ms ease"
                    }}
                    loading="lazy"
                    />
                    
                    <div className="pointer-events-none absolute inset-0"
                    style={{
                      zIndex: 11,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%,rgba(0,0,0,0) 40%)"
                    }}
                    ></div>
                  </div>
              </div>
            ))}
          </div>

          <div className={`absolute ${isMobile ? "bottom-20":"bottom-10"}`}>
            <a href={activeProject.link} 
            target="_blank"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title} Project`}
            >
              View Project
            </a>
          </div>
      </div>


      </section>
  )
}