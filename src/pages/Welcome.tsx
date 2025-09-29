import {motion} from "motion/react"
import { Link } from "react-router-dom"



const Welcome = () => {
  return (
    <div>

      <motion.div
      className="relative w-full h-[45dvh] xl:h-[60dvh]  border border-amber-50"
      initial="hidden"
      animate="visible"
      transition={{
        staggerChildren:0.3,  // Delay between each child
        delayChildren: 0.2    // Delay before first child starts
      }}>
        

        <motion.img className="w-full h-full object-cover object-top sm:object-[-50%58%]"
        variants={{
          hidden:{opacity:0},
          visible: { opacity: 1, transition: { duration: 0.6 } }
        }}
         src="assets/PizzaHero.jpg" alt="PizzaHero" />

<Link to="/create/base">
         <motion.button className="absolute top-15 left-2 bg-orange-500/90 border-none tracking-tight font-['Orbitron'] font-medium text-white rounded-md p-0.5 shadow-md hover:shadow-amber-500/40 cursor-pointer sm:top-20 sm:text-xl"
         whileHover={{scale:1.04}}
         whileTap={{scale: 0.95}}
         variants={{
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
          type: "spring", 
          stiffness: 100,
          damping: 12
        } 
      }
    }}
         >
          CRAFT YOUR OWN PIZZA
         </motion.button>
</Link>

<Link to="/create/toppings">
         <motion.button className="absolute top-23 left-2 bg-transparent border tracking-tight text-sm font-light text-white rounded-sm shadow-md hover:shadow-gray-500/60 cursor-pointer sm:top-29 sm:text-md"
         whileHover={{scale:1.05}}
         whileTap={{scale: 0.95}}
         variants={{
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
          type: "spring", 
          stiffness: 100,
          damping: 12
        } 
      }
    }}
         >
          Browse our menu
         </motion.button>
         </Link>
      </motion.div>
      

    </div>
  )
}

export default Welcome