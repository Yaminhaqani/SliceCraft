import logo from "../assets/logo2.png";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "../constants/navLinks";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";


const Navbar = () => {
  const [hamToggle, setHamToggle] = useState(false);
  const location = useLocation();
  return (
    <nav className="h-14 w-full flex sticky top-0 z-50 items-center justify-between sm:px-12 px-4 bg-black/30 backdrop-blur-md border-b border-white/10 text-white">
      {/* Hamburger */}
      <motion.button
      whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
      onClick={()=>setHamToggle((prev)=>!prev)}
       className="absolute flex flex-col justify-around w-8 h-7 z-50 sm:hidden">
        <motion.span
        animate={hamToggle ? {rotate:45, y:9.5}:{rotate:0, y:0}}
        style={{transformOrigin:"center"}}
         className="w-full h-1 bg-gray-300 rounded-md"></motion.span>
        <motion.span
        animate={hamToggle ? {opacity:0}:{opacity:1}}
         className="w-full h-1 bg-gray-300 rounded-md"></motion.span>
        <motion.span
        animate={hamToggle ? {rotate:-45, y:-9.5}:{rotate:0, y:0}}
        style={{transformOrigin:"center"}}
         className="w-full h-1 bg-gray-300 rounded-md"></motion.span>
      </motion.button>
   
    {/* Logo */}
        <Link to="/" className="h-full w-fit flex items-center overflow-hidden ml-10 sm:ml-0">
        <motion.div
        initial={{y:-100}}
        animate={{y:0, rotate:360}}
        transition={{
          type:"spring",
           stiffness: 150,
    damping: 15,
    duration: 0.8,
        }}
         className=" h-full overflow-hidden">
          <img
            className="h-full w-auto scale-160 object-contain invert-[8%] pb-0.5"
            src={logo}
            alt="logo"
          />
        </motion.div>
        
        {/* <span className="font-semibold text-lg mt-2">SliceCraft</span> */}

  <motion.div
    className="flex"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    }}
  >
    {["Slice", "Craft"].map((word, i) => (
      <motion.span
        key={i}
        className="font-semibold text-lg text-white"
        variants={{
          hidden: { y: -20, opacity: 0 },
           visible: { y: 0, opacity: 1 },
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {word}
      </motion.span>
    ))}
  </motion.div>
        </Link>
      

      {/* Desktop Navigation Links */}
      <div className="flex">
        <motion.ul
        initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Animate children one after another
      },
    },
  }}
         className="hidden sm:flex gap-6 mr-6 w-fit">
          {navLinks.map((link) => (
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               variants={{
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
              key={link.id}
              className="flex items-center cursor-pointer"
            >
              <Link to={link.to} className={`flex items-center gap-2 px-1 py-1 rounded-md ${
    location.pathname === link.to
      ? "bg-orange-500/70 text-white"   
      : "text-gray-400 hover:bg-orange-500/30" 
  }`}>
                {link.icon}
                {link.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
        whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.90 }}
     transition={{ 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }}
         className="flex items-center">
          <Link
            to="/cart"
            className={`p-2 rounded-full ${
    location.pathname === "/cart"
      ? "bg-orange-500/70 text-white"   
      : "text-gray-400 hover:bg-orange-500/30" 
  }`}
            aria-label="View cart"
          >
            <FaShoppingCart className="text-lg" />
          </Link>
        </motion.div>
      </div>

      {/* MOBILE NAV LINKS. */}
      <AnimatePresence>
      {hamToggle && (
        <motion.div
        initial={{x:"-100%"}}
        animate={{x:0}}
        exit={{x:"-100%"}}
        className="flex flex-col absolute top-0 -left-1 w-[60%] h-screen bg-gray-900/70 border-t-0 border-l-0 border-b-0 border-r-0 shadow-orange-900/20 shadow-sm backdrop-blur-md">
          
          <motion.div className="flex w-full justify-center"
          >
             <motion.ul
              initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible:{
              transition:{
                staggerChildren: 0.1,
              }
            }
          }}
          className="flex flex-col w-[85%] h-fit gap-6 mt-24">
            {navLinks.map((link)=>(
              <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               variants={{
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
              key={link.id}
               className="">
                <Link to={link.to} className={`pl-4 py-1 flex items-center gap-1.5 transition-colors rounded-lg ${
    location.pathname === link.to
      ? "bg-orange-500/70 text-white"   
      : "text-gray-400 hover:bg-orange-500/30" 
  }`}>
                {link.icon}
                {link.label}
              </Link>

              </motion.li>
            ))}

              </motion.ul>

          </motion.div>


        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
