import OverlayMenu from "./OverlayMenu";
import { useState } from "react";
import Logo from "../assets/Logo.webp"
import { FiMenu } from "react-icons/fi";
import { useEffect,useRef } from "react";


export default function Navbaar(){

  const[menuOpen,setMenuOpen]=useState(false);
  const [visible,setVisible]=useState(true);
  const[forceVisible,setForceVisible]=useState(false);
  const lastScrollY=useRef(0);
  const timerId=useRef(null);

  useEffect(()=>{
    const homeSection=document.querySelector("#home");
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        setForceVisible(true);
        setVisible(true);
      }
      else{
        setForceVisible(false);
      }
    },{threshold:0.1}
  )
    if(homeSection){
      observer.observe(homeSection);
    }
    return()=>{
      if(homeSection) observer.unobserve(homeSection);
    }
  },[])
  useEffect(()=>{
    const handleScroll=()=>{
      if(forceVisible){
        setVisible(true);
        return;
      }
      const currentScrollY=window.scrollY;
      if(currentScrollY<lastScrollY.current){
        setVisible(true);
      }else{
        setVisible(false);
        if(timerId.current) clearTimeout(timerId.current);
        timerId.current=setTimeout(()=>{
          setVisible(false);
        },3000)
      }
        lastScrollY.current=currentScrollY;
      }
      window.addEventListener("scroll",handleScroll,{passive:true});
      return()=>{
        window.removeEventListener("scroll",handleScroll);
        if(timerId.current) clearTimeout(timerId.current);
      }
  },[forceVisible])
    return(
      <>
      <nav className={`fixed w-full top-0 left-0 flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>

      <div className="flex items-center space-x-2">
      <img src={Logo} className="w-10 h-10" alt=""/>
      <div className="text-2xl font-bold text-white hidden sm:block">Deepanshu</div>
      </div>

      <div className="block lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
      <button onClick={()=>setMenuOpen(true)} className="text-white text-3xl outline-none" aria-label="open menu">
        <FiMenu />
      </button>
      </div>

      <div className="hidden lg:block">
      <a href="#Contact" className="bg-linear-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300">Reach Out</a>

      </div>

      </nav>
      
      <OverlayMenu isOpen={menuOpen} onClose={()=>setMenuOpen(false)} />
      </>
    )
}