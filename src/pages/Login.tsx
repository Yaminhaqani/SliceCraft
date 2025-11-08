import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [details, setDetails] = useState({email:"", password:""});
    // const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target;
        setDetails((prev)=> ({...prev,[name]:value}))
    }


  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="border border-white relative w-full min-h-[calc(100vh-56px)] bg-cover bg-center"
      style={{ backgroundImage: `url('./assets/restaurant-hero.jpg')` }}
    >
      <motion.div className="border border-cyan-400 absolute inset-0 bg-black/70 backdrop-blur-xs flex justify-center">

        <motion.div className="border border-white w-[90dvw] xmd:w-[70dvw] sm:w-[50dvw] md:w-[55dvw] lg:w-[35dvw] h-fit mt-4 md:px-15">
              <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 17,
        }}
        className="relative z-10 
                     bg-[linear-gradient(45deg,theme(colors.orange.600)_42%,theme(colors.orange.400)_100%)]
                     bg-clip-text text-transparent tracking-wider 
                     text-2xl sm:text-4xl font-extrabold font-['Orbitron'] mb-5 text-center"
      >
       Login
              </motion.h2>

      <motion.form className="flex flex-col gap-5 border">
        <div>
            <input type="email" name="email" placeholder="Email Address" value={details.email} onChange={handleChange} required/>
            {/* <span></span> icon */}
        </div>

         <div>
            <input type="password" name="password" placeholder="Password" value={details.password} onChange={handleChange} required/>
            {/* <span></span> icon */}
        </div>

        <div className="flex justify-center -mt-2.5">
            <Link to="forgot-password" className="text-sm font-light text-orange-300/70 underline">
            Forgot Password?
            </Link>
        </div>


        <motion.button
        type="submit"
          whileHover={{
            scale: 1.1,
            boxShadow: details.email && details.password
              ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
              : "0px 0px 6px rgba(156, 163, 175, 0.4)",
          }}
          disabled={!details.email && !details.password}
          className={`px-6 py-3 rounded-xl font-semibold shadow
            ${
              details.email && details.password
                ? "bg-orange-400/90 text-white border-none hover:bg-orange-500/70"
                : "bg-gray-300 text-gray-500 border-none cursor-not-allowed"
            }`}
        >
          Next
        </motion.button>
        
      </motion.form>

        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
