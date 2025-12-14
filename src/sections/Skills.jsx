import { FaJava } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { SiMongodb } from "react-icons/si";
import { FaReact } from "react-icons/fa6";
import { TiHtml5 } from "react-icons/ti";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaPython } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useMotionValue } from "framer-motion";





export default function Skills() {
  const skills = [
    { icon: <FaJava />, name: "Java" },
    { icon: <IoLogoJavascript />, name: "Javascript" },
    { icon: < SiMongodb />, name: "Mongodb" },
    { icon: < FaReact />, name: "ReactJS" },
    { icon: < TiHtml5 />, name: "HTML5" },
    { icon: < RiTailwindCssFill />, name: "TailwindCSS" },
    { icon: < FaNodeJs />, name: "NodeJS" },
    { icon: < FaPython />, name: "Python" },
    { icon: < GrMysql />, name: "MySQL" },
  ];
  const repeated = [...skills, ...skills];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackingRef = useRef(null);
  const touchY = useRef(null);
  const X = useMotionValue(0);


  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    }, { threshold: [0.1] });
    io.observe(el);
    return () => io.disconnect(el);
  }, [])

  useEffect(() => {
    if (!active) return;
    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => touchY.current = e.touches[0].clientY;
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    }
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = X.get() + dir * dt * SPEED;
      const loop = trackingRef.current?.scrollWidth ? trackingRef.current.scrollWidth / 2 : 0;
      if (!loop) return;
      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      X.set(next);
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, X]);

  useEffect(() => {// reset position on resize
    X.set(0);
  }, [X]);


  return (
    <section id="skills"
      ref={sectionRef}
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse
        "/>
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
        opacity-20 blur-[120px] animate-pulse delay-500
        "/>
      </div>

      <motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] to-[#00bf8f]  z-10"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My Skills</motion.h2>

      <motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10 "
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My expertise includes a diverse set of technologies and tools that I have mastered over time.
      </motion.p>

      <div className="relative w-full overflow-visible">
        <motion.div ref={trackingRef}
          style={{ x: X, whiteSpace: "nowrap", willChange: "transform" }}
          className="flex gap-10 text-6xl text-[#1cd8d2]">
          {repeated.map((s, i) => (
            <div key={i}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">{s.icon}</span>
              <p className="text-sm">
                {s.name}
              </p>
            </div>
          ))}

        </motion.div>
      </div>

    </section>
  )
}