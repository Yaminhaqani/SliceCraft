//ZUSTAND

import { useNavigate } from "react-router-dom";
import { usePizzaStore, type PizzaOption } from "../zustand/pizzaStore";
import { useCurrentPizzaStore } from "../zustand/currentPizzaStore";
import { useEffect } from "react";
import { motion } from "motion/react";
import iconMap from "../utils/iconMap";

//REDUX
// import { motion } from "motion/react";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../store";
// import { useNavigate } from "react-router-dom";
// import { toggleToppings } from "../store/currentPizzaSlice";
// import iconMap from "../utils/iconMap";
// import { useEffect } from "react";
// import { fetchToppings } from "../store/pizzaSlice";

//REDUX
// const Toppings = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const toppings = useSelector((state: RootState) => state.pizza.toppings);

//   useEffect(() => {
//       dispatch(fetchToppings());
//     }, [dispatch]);

//   const currentTopping = useSelector(
//     (state: RootState) => state.currentPizza.toppings
//   );

//   const handleToggle = (topping: { name: string; price: number }) => {
//     dispatch(toggleToppings(topping));
//   };

//   return (
//     <div className="relative w-full h-fit flex flex-col items-center px-6 pt-10">
//       <motion.h2
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{
//           type: "spring",
//           stiffness: 120,
//           damping: 17,
//         }}
//         className="relative z-10 bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_42%,hsla(0,100%,51%,1)_100%)]
//                    bg-clip-text text-transparent tracking-wider
//                    text-2xl sm:text-4xl font-extrabold pb-7 text-center"
//       >
//         Choose Toppings
//       </motion.h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
//         {toppings.map((topping) => (
//           <motion.div
//             key={topping.name}
//             whileHover={{ scale: 1.05 }}
//             transition={{
//               type: "spring",
//               stiffness: 120,
//               damping: 9,
//             }}
//             onClick={() => handleToggle(topping)}
//             className={`cursor-pointer rounded-2xl shadow-lg border-2 p-6 text-center
//               ${
//                 currentTopping.some((t) => t.name === topping.name)
//                   ? "border-none bg-gradient-to-b from-red-300/60 to-red-500/30"
//                   : "border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
//               }`}
//           >
//             <span className="flex justify-center">{iconMap[topping.name]}</span>
//            <div className="flex justify-center gap-1">
//                 <span>{topping.name}</span> - <span>₹{topping.price}</span>
//               </div>
//             {/* <h3 className="text-xl font-semibold mb-2">{topping.name}</h3>
//             <p className="text-gray-600 font-medium">₹{topping.price}</p> */}
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
//           onClick={() => navigate("/create/size")}
//           className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
//         >
//           Prev
//         </motion.button>

//         <motion.button
//           whileHover={{
//             scale: 1.1,
//             boxShadow: currentTopping
//               ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
//               : "0px 0px 6px rgba(156, 163, 175, 0.4)",
//           }}
//           onClick={() => navigate("/create/review")}
//           className={`px-6 py-3 rounded-xl font-semibold shadow transition
//             ${
//               currentTopping
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

//ZUSTAND
const Toppings = () => {
  const navigate = useNavigate();

  const { toppings, fetchToppings } = usePizzaStore();
  const { toppings: currentToppings, toggleToppings } = useCurrentPizzaStore();

  useEffect(() => {
    fetchToppings();
  }, [fetchToppings]);

  const handleToggle = (topping: PizzaOption) => {
    toggleToppings(topping);
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="relative w-full h-fit flex flex-col items-center px-6 pt-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 17,
        }}
        className="relative z-10 bg-[linear-gradient(45deg,theme(colors.orange.600)_42%,theme(colors.orange.400)_100%)]
                   bg-clip-text text-transparent tracking-wider 
                   text-2xl sm:text-4xl font-extrabold pb-7 text-center"
      >
        Choose Toppings
      </motion.h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl md:pt-5">
        {toppings.map((topping) => (
          <motion.div
            key={topping.name}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 9,
            }}
            onClick={() => handleToggle(topping)}
            className={`cursor-pointer rounded-2xl shadow-lg border-2 p-6 text-center
              ${
                currentToppings.some((t) => t.name === topping.name)
                  ? "border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
                  : "border border-orange-500/70 bg-gray-900/30 text-gray-300"
              }`}
          >
            <span className="flex justify-center">{iconMap[topping.name]}</span>
            <div className="flex justify-center gap-1">
              <span>{topping.name}</span> -{" "}
              <span className="text-gray-400 font-medium">
                ₹{topping.price}
              </span>
            </div>
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
          onClick={() => navigate("/create/size")}
          className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
        >
          Prev
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: currentToppings
              ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
              : "0px 0px 6px rgba(156, 163, 175, 0.4)",
          }}
          onClick={() => navigate("/create/review")}
          className={`px-6 py-3 rounded-xl font-semibold shadow
            ${
              currentToppings
                ? "bg-orange-400/90 text-white border-none hover:bg-orange-500/70"
                : "bg-gray-300 text-gray-500 border-none cursor-not-allowed"
            }`}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Toppings;
