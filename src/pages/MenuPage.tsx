//REDUX IMPORTS
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../store";
// import { useEffect } from "react";
// import { fetchMenu } from "../store/pizzaSlice";
// import {motion} from "motion/react"
// import { addToCart } from "../store/cartSlice";
// import { useNavigate } from "react-router-dom";

//ZUSTAND IMPORTS
import { useNavigate } from "react-router-dom";
import { usePizzaStore } from "../zustand/pizzaStore";
import { useCartStore } from "../zustand/cartStore";
import { useEffect } from "react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

//redux based
// const MenuPage = () => {

//    const dispatch = useDispatch<AppDispatch>();
//    const navigate = useNavigate();

//    const menu = useSelector((state: RootState)=> state.pizza.menu);

//    useEffect(()=>{
//     dispatch(fetchMenu());
//    }, [dispatch])

//    const handleAddToCart = (pizza:{_id: string; name: string; price: number})=>{
//     dispatch(
//       addToCart({
//         id: pizza._id,
//         name: pizza.name,
//         price: pizza.price,
//       })
//     );
//    }

//   return (
//     <div className="w-full h-fit">
//            <motion.h2 className="w-full text-center font-['Orbitron'] text-white mt-4 text-2xl font-bold"
//            initial={{opacity:0}}
//       animate={{opacity:1}}
//       transition={{
//         duration:1
//       }}
//            >
//             Choose from Menu</motion.h2>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[93%] max-w-4xl mx-auto py-3 ">
//         {menu.map(pizza=>(
//           <motion.div
//           initial={{opacity:0, y:30}}
//           whileInView={{opacity:1, y:0}}
//           transition={{duration: 0.5, ease: "easeOut"}}
//           viewport={{once: true, margin:"-100px"}}
//            onClick={() => navigate(`/menu/${pizza._id}`)}
//           key={pizza._id}
//            className="relative bg-[#232425] rounded-2xl overflow-hidden h-[410px] cursor-pointer">
//             <img src={pizza.image}
//              alt={pizza.image}
//              loading="lazy"
//             className="w-full object-cover"/>
//             <h3 className="text-gray-200 text-lg font-bold mt-3 px-3">{pizza.name}</h3>
//             {/* <p>Base: {pizza.base.name}</p>
//             <p>Toppings: {pizza.toppings.map(t=> t.name).join(', ')}</p>
//             <p>Size: {pizza.size.name}</p> */}
//             <p className="text-gray-400 text-md mb-3 px-3">₹{pizza.price}</p>
//             <motion.button
//             whileHover={{scale:1.09}}
//             whileTap={{scale:0.9}}
//             type="button"
//              onClick={(e)=>{
//               e.stopPropagation(); //stops click from bubbling to parent div
//               handleAddToCart(pizza)}}
//             className="absolute bottom-4 right-4 bg-orange-400 text-[12px] font-['Orbitron'] p-1 rounded-md cursor-pointer">
//               Add to Cart
//               </motion.button>
//           </motion.div>

//         ))}
//     </div>
//     </div>
//   )
// }

//zustand based
const MenuPage = () => {
  const navigate = useNavigate();

  // Pizza Store
  const { menu, fetchMenu } = usePizzaStore();

  //Fetch Menu
  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="w-full h-fit"
    >
      <motion.h2
        className="w-full text-center font-['Orbitron'] bg-[linear-gradient(45deg,theme(colors.orange.600)_42%,theme(colors.orange.400)_100%)] bg-clip-text text-transparent tracking-wider mt-4 text-2xl sm:text-4xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        Choose from Menu
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[93%] max-w-4xl mx-auto py-3 ">
        {menu.map((pizza) => (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20px" }} //amount also does the same as margin.
            onClick={() => navigate(`/menu/${pizza._id}`)}
            key={pizza._id}
            className="relative bg-[#232425] rounded-2xl overflow-hidden h-[400px] xxs:h-[450px] xs:h-[490px] x:h-[500px] sm:h-[420px] xmd:h-fit md:h-[370px] lg:h-[400px] cursor-pointer"
          >
            <img
              src={pizza.image}
              alt={pizza.image}
              //  loading="lazy"
              className="w-full object-cover"
            />
            <h3 className="text-gray-200 text-lg font-bold mt-3 px-3">
              {pizza.name}
            </h3>
            <p className="text-gray-400 text-md mb-3 px-3">Starting at ₹{pizza.basePrice}</p>

          
            <motion.button
              whileHover={{ scale: 1.09 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={(e) => {
                e.stopPropagation(); //stops click from bubbling to parent div
                navigate(`/menu/${pizza._id}`)
              }}
              className="absolute bottom-4 xxs:bottom-3 x:bottom-2 md:bottom-4 right-4 bg-orange-400 text-[12px] font-['Orbitron'] p-1 rounded-md cursor-pointer"
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuPage;
