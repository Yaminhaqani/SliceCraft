import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
// import ScrollIntroVideo from '../components/ScrollIntroVideo';


const Welcome = () => {
  return (
    <>
    {/* <ScrollIntroVideo/> */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className=" w-full flex flex-col items-center py-36 sm:py-36 z-10"
    >



      <h2 className="relative z-10 
                     bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_42%,hsla(0,100%,51%,1)_100%)]
                     bg-clip-text text-transparent tracking-wider 
                     text-2xl sm:text-4xl font-extrabold mb-7">
        Welcome to Slice Craft
      </h2>


      <Link to="/create/base" className="relative z-10">
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(255,0,0,0.8)"
          }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 9,
            duration: 0.5
          }}
          className="text-white tracking-wide rounded-2xl px-6 py-2 font-medium
                     bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_0%,hsla(0,100%,51%,1)_100%)]
                     border border-transparent hover:border-red-600"
        >
          Create Your Pizza
        </motion.button>
      </Link>
    </motion.div>
    </>
  );
};

export default Welcome;
