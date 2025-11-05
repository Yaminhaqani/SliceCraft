// import { useSelector } from "react-redux";
// import type { RootState } from "../store";
import iconMap from "../utils/iconMap";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import sizeMap from "../utils/sizeMap";
import { useCurrentPizzaStore } from "../zustand/currentPizzaStore";

const Review = () => {

  //REDUX
  // const base = useSelector((state: RootState) => state.currentPizza.base);
  // const size = useSelector((state: RootState) => state.currentPizza.size);
  // const toppings = useSelector(
  //   (state: RootState) => state.currentPizza.toppings
  // );

  //ZUSTAND
  const { base, size, toppings } = useCurrentPizzaStore();

  const navigate = useNavigate();

    const handleConfirm = () => {
    const confirmed = window.confirm("Order Confirmed! 🍕");
    if (confirmed) {
      navigate('/'); 
    }
  };

  return (
    <div className="px-8 pt-10 pb-4 flex flex-col items-center h-fit text-gray-50">
      <h2 className="text-3xl font-bold mb-6 bg-[linear-gradient(45deg,theme(colors.orange.600)_42%,theme(colors.orange.400)_100%)] text-transparent bg-clip-text">
        Review Your Pizza
      </h2>

      {/* Base */}
      <div className="mb-6 w-[200px]">
        <p className="font-bold">Base:</p>
        <p className="text-gray-300">{base ? `${base.name} (₹${base.price})` : "Not selected"}</p>
      </div>

      {/* Size */}
      <div className="mb-6 w-[200px]">
        <p className="font-bold">Size:</p>
       {size &&( 
        <img
          src={sizeMap[size.name]}
          alt={size.name}
          className="w-24 h-24 object-contain mb-0.5"
        />)}
        <p className="text-gray-300">{size ? `${size.name} (₹${size.price})` : "Not selected"}</p>
      </div>

      {/* Toppings */}
      <div className="mb-3 w-[200px]">
        <p className="font-bold">Toppings:</p>
        {toppings.length > 0 ? (
          <ul className="list-disc list-inside">
            {toppings.map((t, index) => (
              <li key={index} className="flex items-center gap-4 pt-1.5">
                {iconMap[t.name]}
                <span className="text-gray-300">
                  {t.name} (₹{t.price})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-black/55">No toppings selected</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex w-[100dvw] md:w-[40dvw] justify-between items-center mt-8 px-6 sm:w-[50%] sm:px-0">
      
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 8px rgba(100, 100, 100, 0.3)",
          }}
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border-none text-gray-700 bg-white hover:bg-gray-100 shadow"
        >
          Prev
        </motion.button>

          <button
          className="px-6 py-3 rounded-xl border-none bg-gradient-to-r from-green-500 to-emerald-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          onClick={handleConfirm}
        >
          Confirm
        </button>

      </div>
    </div>
  );
};

export default Review;
