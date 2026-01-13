//FONT
import "@fontsource/orbitron/400.css"; //Regular
import "@fontsource/orbitron/500.css"; //Medium
import "@fontsource/orbitron/600.css"; //Semibold
import "@fontsource/orbitron/700.css"; //Bold

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/AnimatedRoutes";

import { useCurrentPizzaStore } from "./zustand/currentPizzaStore";

const App = () => {
  // const total = useSelector(selectPizzaTotal) //REDUX
  const currentTotal = useCurrentPizzaStore((state)=> state.getTotal());

  return (
    <div className="w-screen min-h-dvh bg-gradient-to-b from-[#1C1C1E] to-[#212124] overflow-y-auto">
      {currentTotal > 0 && (
        <div className="absolute right-2 top-16 text-sm font-bold bg-gradient-to-bl from-[#30c5d2] to-[#471069] text-transparent bg-clip-text sm:text-base sm:right-9">
          Current Total: <span className="font-medium">₹{currentTotal}</span>
        </div>
      )}
      <BrowserRouter>
        <Navbar />
        {/* routes copied to AnimatedRoutes for page transitions to work or we
        could even encompass app.tsx with browser routes inside main.tsx */}
        <AnimatedRoutes />
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
