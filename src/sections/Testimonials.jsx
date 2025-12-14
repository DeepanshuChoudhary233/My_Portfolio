import problemsolver from '../assets/problemsolver.jpg';
import coder from '../assets/coder.jpg';
import learner from '../assets/learner.webp';
import thinker from '../assets/thinker.jpg';
import { motion } from 'framer-motion';


const testimonials=[
  {name:"problem-solver",
    review:"Solved more than 250 coding problems on LeetCode and other coding platforms.",
    image:problemsolver
  },
  {name:"Competitive Coder",
    review:"Participated in multiple contests on leetcode and codechef and attended a hackathon.",
    image:coder
  },
  {name:"Continuous learner",
    review:"Always exploring new technologies and improving my skills set",
    image:learner
  },
  {name:"Creative Thinker",
    review:"Passionate about finding innovative solutions to complex problems.",
    image:thinker
  }
];


export default function Testimonials() {
  return (
    <section id="testimonials" className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
    <motion.h2 className="text-4xl font-bold mb-16"
    initial={{opacity:0, y:-50}}
    animate={{opacity:1, y:0}}
    transition={{duration:0.6}}
    >
      Highlights
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full">
      {
        testimonials.map((t,i)=>(
          <motion.div key={t.name+1}
          initial={{opacity:0, y:50}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.5, delay:i*0.2}}
          viewport={{once:true}}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full border border-white/40 mb-4 object-cover"
            loading="lazy"></img>
            <p className="text-gray-200 italic mb-4">
              {t.review}
            </p>
            <h3 className="text-lg font-semibold">
              &#8226;{t.name}
            </h3>

          </motion.div>
        )) 
      }

    </div>

    </section>
  )
}