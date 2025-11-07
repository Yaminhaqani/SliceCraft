//ZUSTAND
import { useNavigate, useParams } from "react-router-dom";
import { usePizzaStore } from "../zustand/pizzaStore";
import { addToCart } from "../store/cartSlice";
import type { Variants } from "motion/react"; //because of typescript
import { motion } from "motion/react";
import toast from "react-hot-toast";

//REDUX
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import type { AppDispatch, RootState } from "../store";
// import { motion} from "motion/react";
// import type { Variants } from "motion/react"; //because typescript
// import { addToCart } from "../store/cartSlice";

//REDUX
// const MenuDetail = () => {
//   // const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
//   const { id } = useParams() as { id: string }; //get the pizza ID from the URL
//   const menu = useSelector((state: RootState) => state.pizza.menu);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const pizza = menu.find((p) => p._id === id);

//   if (!pizza) {
//     return <p className="text-center mt-10 text-white">Pizza not found</p>;
//   }

//   const handleAddToCart = (pizza: {  //no e.preventDefault because it is used on submit and my button is type button
//     _id: string;
//     name: string;
//     price: number;
//   }) => {
//     dispatch(
//       addToCart({
//         id: pizza._id,
//         name: pizza.name,
//         price: pizza.price,
//       })
//     );
//   };

//   const textVariants: Variants  = {
//   hidden: { opacity: 0, y: 15 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 120, // how fast it moves
//       damping: 10,    // how bouncy it is
//     },
//   },
// };

// const containerVariants: Variants  = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.3,
//     },
//   },
// };

//   return (
//     <div className="w-full h-fit flex flex-col justify-center text-white">

//     <motion.h2 className="w-full text-center font-['Orbitron'] text-white text-2xl font-bold mb-6 mt-10"
//            initial={{opacity:0}}
//       animate={{opacity:1}}
//       transition={{
//         duration:1
//       }}
//            >
//             Pizza Details
//             </motion.h2>
//       <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full p-4 mb-4 mx-auto bg-[#232425] rounded-2xl">
//         <motion.div className="rounded-xl overflow-hidden mb-4 sm:mb-0 flex justify-center items-center">
//           <motion.img
//           initial={{x:-50, opacity:0}}
//           animate={{ x: 0, opacity: 1}}
//            transition={{ duration: 0.5, ease: "easeOut" }}
//            src={pizza.image} alt={pizza.name} className="w-full" />
//         </motion.div>

//         <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//          className="flex flex-col relative justify-center">
//           <motion.h2  variants={textVariants} className="text-2xl font-bold mb-2">{pizza.name}</motion.h2>
//           <motion.p variants={textVariants} className="text-gray-400 mb-2">
//             <span className="font-medium">Base: </span>
//             {pizza.base?.name || "N/A"}
//           </motion.p>
//           <motion.p variants={textVariants} className="text-gray-400 mb-2">
//             <span className="font-medium">Toppings: </span>{" "}
//             {pizza.toppings?.map((t) => t.name).join(", ") || "None"}
//           </motion.p>
//           <motion.p variants={textVariants} className="text-gray-400 mb-4">
//             <span className="font-medium">Size: </span>{" "}
//             {pizza.size?.name || "N/A"}
//           </motion.p>
//           <motion.p variants={textVariants} className="text-lg font-bold mb-4">Price: ₹{pizza.price}</motion.p>

//           <motion.div variants={textVariants} className="w-full flex items-center justify-around sm:justify-start sm:gap-6">
//             <motion.button
//               whileHover={{ scale: 1.09 }}
//               whileTap={{ scale: 0.9 }}
//               type="button"
//               onClick={() => {
//                 handleAddToCart(pizza);
//               }}
//               className="min-w-[100px] h-8 bg-orange-400 text-[12px] sm:text-[14px] font-['Orbitron'] px-3 rounded-md cursor-pointer text-center"
//             >
//               Add to Cart
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.09 }}
//               whileTap={{ scale: 0.9 }}
//               type="button"
//               onClick={() => {
//                 navigate(-1);
//               }}
//               className="min-w-[100px] h-8 bg-transparent border text-[12px] sm:text-[14px] font-['Orbitron'] px-3 rounded-md cursor-pointer text-center shadow-md hover:shadow-gray-500/60"
//             >
//               Back
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

//ZUSTAND
const MenuDetail = () => {
  const { id } = useParams() as { id: string }; //get the pizza ID from the URL
  const navigate = useNavigate();

  const { menu } = usePizzaStore();

  const pizza = menu.find((p) => p._id === id);

  if (!pizza) {
    return <p className="text-center mt-10 text-white">Pizza not found</p>;
  }

  const handleAddToCart = (pizza: {
    _id: string;
    name: string;
    price: number;
  }) => {
    addToCart({
      id: pizza._id,
      name: pizza.name,
      price: pizza.price,
    });
    toast.success(`${pizza.name} added to cart!`);
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120, // how fast it moves
        damping: 10, // how bouncy it is
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="w-full h-fit flex flex-col justify-center text-white"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 17,
        }}
        className="relative z-10 bg-[linear-gradient(45deg,hsla(0,100%,36%,1)_42%,hsla(0,100%,51%,1)_100%)] bg-clip-text text-transparent tracking-wider text-2xl sm:text-4xl font-extrabold mt-4 text-center"
      >
        Pizza Details
      </motion.h2>

      <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full p-4 py-4 mb-4 mx-auto bg-[#232425] rounded-2xl">
        <motion.div className="rounded-xl overflow-hidden mb-4 sm:mb-0 flex justify-center items-center">
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={pizza.image}
            alt={pizza.name}
            className="w-full"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col relative justify-center"
        >
          <motion.h2
            variants={textVariants}
            className="text-2xl font-bold mb-2"
          >
            {pizza.name}
          </motion.h2>
          <motion.p variants={textVariants} className="text-gray-400 mb-2">
            <span className="font-medium">Base: </span>
            {pizza.base?.name || "N/A"}
          </motion.p>
          <motion.p variants={textVariants} className="text-gray-400 mb-2">
            <span className="font-medium">Toppings: </span>{" "}
            {pizza.toppings?.map((t) => t.name).join(", ") || "None"}
          </motion.p>
          <motion.p variants={textVariants} className="text-gray-400 mb-4">
            <span className="font-medium">Size: </span>{" "}
            {pizza.size?.name || "N/A"}
          </motion.p>
          <motion.p variants={textVariants} className="text-lg font-bold mb-4">
            Price: ₹{pizza.price}
          </motion.p>

          <motion.div
            variants={textVariants}
            className="w-full flex items-center justify-around sm:justify-start sm:gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => {
                navigate(-1);
              }}
              className="min-w-[100px] h-8 bg-transparent border text-[12px] sm:text-[14px] font-['Orbitron'] px-3 rounded-md cursor-pointer text-center shadow-md hover:shadow-gray-500/60"
            >
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => {
                handleAddToCart(pizza);
              }}
              className="min-w-[100px] h-8 bg-orange-400 text-[12px] sm:text-[14px] font-['Orbitron'] px-3 rounded-md cursor-pointer text-center"
            >
              Add to Cart
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MenuDetail;
