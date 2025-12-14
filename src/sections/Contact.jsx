import ParticlesBackground from './../components/ParticlesBackground';
import { useState } from 'react';
import {easeInOut, motion} from "framer-motion"
import emailjs from "@emailjs/browser"
emailjs.init(import.meta.env.VITE_PUBLIC_KEY);
import Astra from "../assets/Astra.png"



const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData]=useState({
    name:"",
    email:"",
    service:"",
    budget:"",
    message:""
  });

  const [errors,setErrors]=useState({});
  const [status, setStatus]=useState("");

  const handleChange=(e)=>{
    const {name, value}=e.target;
    if(name==="budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p)=>({...p, [name]:value}))
    if(errors[name]) setErrors((p)=>({...p, [name]:""}));
    };

  const validateForm=()=>{
    const required=["name","email","service","budget","message"];
    const newErrors={};
    required.forEach((f)=>{
      if(!formData[f].trim()){
        newErrors[f]="This is required field";
      }
    });
    if(formData.service!=="others" && !formData.budget.trim())
      newErrors.budget="Fill this field";
    setErrors(newErrors);
    return !Object.keys(newErrors).length; 
   };
   console.log(import.meta.env.VITE_SERVICE_ID);


   const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");
    console.log("Using IDs:", SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY);

    try{
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name:formData.name,
          reply_to:formData.email,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setFormData({
        name:"",
        email:"",
        service:"",
        budget:"",
        message:"",
      })
    }catch(err){
      console.error("EmailJs Error: ",err);
      setStatus("error");

    }
   }
   const glows=[
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]


  return(
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
    md:flex-row items-center gap-10
    ">
      <ParticlesBackground />
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c,i)=>(
          <div key={i} className={`absolute rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}/>
        ))}
      </div>

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div className="w-full md:w-1/2 flex justify-center"
        initial={{opactity:0,x:-50}}
        whileInView={{opacity:1,x:0}}
        transition={{duration:0.6}}
        >
          <motion.img src={Astra} alt="Contact"
          className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
          animate={{y:[0,-10,0]}}
          transition={{duration:2 ,repeat: Infinity,ease:"easeInOut"}}
          ></motion.img>
        </motion.div>

        <motion.div className="w-full md:w-1/2 bg-black/80 p-8 rounded-2xl shadow-lg border border-white/30 "
        initial={{opacity:0,x:50}}
        whileInView={{opacity:1,x:0}}
        transition={{duration:0.6}}
        >
          <h2 className="text-3xl font-bold mb">
            Let's Work together
          </h2>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-1">Your Name<span className="text-red-500">*</span></label>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
              className={`p-2 rounded-md bg-white/10 border ${errors.name?"border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Your Email<span className="text-red-500">*</span></label>
              <input type='text' name='email' placeholder='Your Email' value={formData.email} onChange={handleChange}
               className={`p-2 rounded-md bg-white/10 border ${errors.email?"border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              ></input>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Services<span className="text-red-500">*</span></label>
              <select name="service" 
              value={formData.service}
              onChange={handleChange} className={`p-2 rounded-md bg-white/10 border ${errors.service?"border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              >
                <option value="" disabled className="text-black">Something in mind</option>
                <option value="Web Devlopment" className="text-black">Web Development</option>
                <option value="Frontend Development" className="text-black">Frontend Development</option>
                <option value="others" className="text-black">Others</option>
              </select>
              {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}

            </div>

            {formData.service && formData.service !=="others"&& (
              <div className="flex flex-col">
                <label className="mb-1">Budget<span className="text-red-500">*</span></label>
                <input type='text' name="budget" placeholder="Your Budget"
                onChange={handleChange}
                value={formData.budget}
                 className={`p-2 rounded-md bg-white/10 border ${errors.budget?"border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
                ></input>
                {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}
              </div>
            ) }
            <div className="flex flex-col">
              <label className="mb-1">Explain Your Idea<span className="text-red-500">*</span></label>
              <textarea name="message"
              rows={5}
              placeholder="Enter Your Idea"
              value={formData.message}
              onChange={handleChange}
               className={`p-2 rounded-md bg-white/10 border ${errors.budget?"border-red-500":"border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
              ></textarea>
               {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

            </div>
            {status && (
              <p className={`text-sm ${status==="success"?"text-green-400":status=="error"?"text-red-400":"text-yellow-400"}`}>
                {status=="sending"?"sending...":status ==="success"?"Message sent succcessfully✅":"Something went wrong. Please try again❌"}
              </p>
            )}

            <motion.button 
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={status === "sending"}
            type="submit"
            >
              {status==="sending"?"sending...":"Send Message"}
            </motion.button>


          </form>

        </motion.div>

      </div>

    </section>
  )
}