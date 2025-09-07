import logo from "../assets/Logo.png";
import {motion} from "motion/react"

const Navbar = () => {
  return (
    <>
      <div className="w-full h-[80px] bg-transparent flex items-center mt-2">
        <div className="h-full w-[100px] flex items-center shrink-0">
          <img src={logo} alt="Logo" className="h-full w-full object-cover" />
        </div>
        <motion.div
            initial={{y : -250}}
            animate={{y : 0}}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15
            }}

         className="border-b-2 border-b-black/30 flex w-[65%] h-[40px] items-baseline-last -ml-3 md:w-[90%]">
            <h2 className="bg-[linear-gradient(360deg,hsla(0,0%,0%,1)_16%,hsla(0,0%,42%,1)_67%)] bg-clip-text text-transparent text-md tracking-wider font-extrabold">Slice Craft</h2>
        </motion.div>
      </div>
    </>
  );
};

export default Navbar;
