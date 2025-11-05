import { FaPepperHot, FaCheese } from "react-icons/fa";
import { GiMushrooms, GiBulb } from "react-icons/gi";
import { PiPepperFill } from "react-icons/pi";
import { LiaPepperHotSolid } from "react-icons/lia";

const iconMap: Record<string, React.ReactNode> = {
  Pepperoni: <FaPepperHot className="text-3xl text-red-700" />,
  Mushrooms: <GiMushrooms className="text-amber-900 text-4xl" />,
  Onions: <GiBulb className="text-yellow-500/70 text-3xl" />,
  "Extra Cheese": <FaCheese className="text-orange-500/70 text-3xl" />,
  "Green Peppers": <PiPepperFill className="text-green-600/70 text-4xl" />,
  Jalapeños: <LiaPepperHotSolid className="text-green-900 text-4xl" />,
  "Black Olives": (
    <img src="../assets/olive.png" className="w-9 h-9 object-contain" />
  ),
  "Fresh Basil": (
    <img src="../assets/basil.png" className="w-9 h-9 object-contain" />
  ),
  Mozzarella: (
    <img src="../assets/mozzarella.png" className="w-9 h-9 object-contain" />
  ),
};

export default iconMap;
