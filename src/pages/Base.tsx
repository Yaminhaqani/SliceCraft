//ZUSTAND IMPORTS

import { useNavigate } from "react-router-dom";
import { usePizzaStore, type PizzaOption } from "../zustand/pizzaStore";
import { useCurrentPizzaStore } from "../zustand/currentPizzaStore";
import { useEffect } from "react";
import { motion } from "motion/react"



//REDUX IMPORTS
// import { motion } from "motion/react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import type { AppDispatch, RootState } from "../store";
// import { setBase } from "../store/currentPizzaSlice";
// import { useEffect } from "react";
// import { fetchBases } from "../store/pizzaSlice";


//REDUX BASED
// const Base = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   // options from pizzaSlice
//   const bases = useSelector((state: RootState) => state.pizza.bases);

//   useEffect(()=>{
//     dispatch(fetchBases());
//   },[dispatch]);

//   // current selection from currentPizzaSlice
//   const currentBase = useSelector(
//     (state: RootState) => state.currentPizza.base
//   );

//   const handleSelect = (base: { name: string; price: number }) => {
//     dispatch(setBase(base));
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center px-6 pt-10 ">
//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           type: "spring",
//           stiffness: 120,
//           damping: 17,
//         }}
//         className="relative z-10 
//                      bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_42%,hsla(0,100%,51%,1)_100%)]
//                      bg-clip-text text-transparent tracking-wider 
//                      text-2xl sm:text-4xl font-extrabold mb-7 text-center"
//       >
//         Choose Base
//       </motion.h2>

//       {/* Grid of base options */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
//         {bases.map((base) => (
//           <motion.div
//             key={base.name}
//             whileHover={{ scale: 1.05 }}
//              transition={{
//               type: "spring",
//               stiffness: 120,
//               damping: 9,
//             }}
//             onClick={() => handleSelect(base)}
//             className={`cursor-pointer rounded-2xl shadow-lg border-2 p-6 text-center
//               ${
//                 currentBase?.name === base.name
//                   ? "border-none bg-gradient-to-b from-red-300/60 to-red-500/30"
//                   : "border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
//               }`}
//           >
//             <h3 className="text-xl font-semibold mb-2">{base.name}</h3>
//             <p className="text-gray-600 font-medium">₹{base.price}</p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Prev/Next Navigation */}
//       <div className="flex justify-between items-center w-full max-w-2xl mt-auto py-8">
//         <motion.button
//           whileHover={{
//             scale: 1.1,
//             boxShadow: "0px 0px 8px rgba(100, 100, 100, 0.3)",
//           }}
//           onClick={() => navigate("/")}
//           className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
//         >
//           Prev
//         </motion.button>

//         <motion.button
//           whileHover={{
//             scale: 1.1,
//             boxShadow: currentBase
//               ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
//               : "0px 0px 6px rgba(156, 163, 175, 0.4)",
//           }}
//           onClick={() => navigate("/create/size")}
//           disabled={!currentBase}
//           className={`px-6 py-3 rounded-xl font-semibold shadow transition
//             ${
//               currentBase
//                 ? "bg-red-500 text-white border-none hover:bg-red-600"
//                 : "bg-gray-300 text-gray-500 border-none cursor-not-allowed"
//             }`}
//         >
//           Next
//         </motion.button>
//       </div>
//     </div>
//   );
// };


//ZUSTAND BASED
const Base = () => {

  const navigate = useNavigate();

  //Zustand stores
  const { bases, fetchBases } = usePizzaStore();
  const { base: currentBase, setBase } = useCurrentPizzaStore();

  useEffect(()=>{
    fetchBases();
  }, [fetchBases]);

  const handleSelect = (base: PizzaOption) => {
    setBase(base);
  }

return(
      <motion.div
       initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
       className="w-full h-fit flex flex-col items-center px-6 pt-10">
      {/* Title */}
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
                     text-2xl sm:text-4xl font-extrabold mb-7 text-center"
      >
        Choose Base
      </motion.h2>

      {/* Grid of base options */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 w-full max-w-4xl md:pt-5">
        {bases.map((base) => (
          <motion.div
            key={base.name}
            whileHover={{ scale: 1.05 }}
             transition={{
              type: "spring",
              stiffness: 120,
              damping: 9,
            }}
            onClick={() => handleSelect(base)}
            className={`cursor-pointer rounded-2xl shadow-lg border-2 p-6 text-center
              ${
                currentBase?.name === base.name
                  ? "border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
                  : "border border-orange-500/70 bg-gray-900/30 text-gray-300"
                  //"border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
              }`}
          >
            <h3 className="text-xl font-semibold mb-2">{base.name}</h3>
            <p className="text-gray-400 font-medium">₹{base.price}</p>
          </motion.div>
        ))}
      </div>

      {/* Prev/Next Navigation */}
      <div className="flex justify-between items-center w-full md:w-[40dvw] max-w-2xl mt-auto py-8 md:mt-7">
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 8px rgba(100, 100, 100, 0.3)",
          }}
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
        >
          Prev
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: currentBase
              ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
              : "0px 0px 6px rgba(156, 163, 175, 0.4)",
          }}
          onClick={() => navigate("/create/size")}
          disabled={!currentBase}
          className={`px-6 py-3 rounded-xl font-semibold shadow
            ${
              currentBase
                ? "bg-orange-400/90 text-white border-none hover:bg-orange-500/70"
                : "bg-gray-300 text-gray-500 border-none cursor-not-allowed"
            }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
)
};


export default Base;
