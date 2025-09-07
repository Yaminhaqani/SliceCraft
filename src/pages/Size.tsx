import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { setSize } from "../store/currentPizzaSlice";

const Size = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // options from pizzaSlice
  const sizes = useSelector((state: RootState) => state.pizza.sizes);
  

  // current selection from currentPizzaSlice
  const currentSize = useSelector((state: RootState) => state.currentPizza.size);


  const handleSelect = (size: { name: string; price: number; image?: string }) => {
    dispatch(setSize(size));
  };

  return (
    <div className="relative w-full h-fit flex flex-col items-center px-6 py-10">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 17,
        }}
        className="relative z-10 bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_42%,hsla(0,100%,51%,1)_100%)]
                   bg-clip-text text-transparent tracking-wider 
                   text-2xl sm:text-4xl font-extrabold mb-7 text-center"
      >
        Choose Size
      </motion.h2>

      {/* List of sizes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sizes.map((size) => (
          <motion.div
            key={size.name}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 9,
            }}
            className={`p-4 rounded-xl border flex flex-col items-center cursor-pointer
              ${
                currentSize?.name === size.name
                  ? "border-none bg-gradient-to-b from-red-300/60 to-red-500/30"
                  : "border-none bg-gradient-to-r from-[#f9cdc3] to-[#facefb]"
              }`}
            onClick={() => handleSelect(size)}
          >
            {/* Pizza size image */}
            {size.image && (
              <img
                src={size.image}
                alt={size.name}
                className="w-24 h-24 object-contain mb-2"
              />
            )}
            <p className="font-medium">{size.name}</p>
            <p className="text-sm">₹{size.price}</p>
          </motion.div>
        ))}
      </div>

        {/* Prev/Next Navigation */}
      <div className="flex justify-between items-center w-full max-w-2xl mt-auto py-8">
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 8px rgba(100, 100, 100, 0.3)",
          }}
          onClick={() => navigate("/create/base")}
          className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
        >
          Prev
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: currentSize
              ? "0px 0px 8px rgba(255, 0, 0, 0.8)"
              : "0px 0px 6px rgba(156, 163, 175, 0.4)",
          }}
          onClick={() => navigate("/create/toppings")}
          disabled={!currentSize}
          className={`px-6 py-3 rounded-xl font-semibold shadow transition
            ${
              currentSize
                ? "bg-red-500 text-white border-none hover:bg-red-600"
                : "bg-gray-300 text-gray-500 border-none cursor-not-allowed"
            }`}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Size;
