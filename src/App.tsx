import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";


// Pizza builder pages
import CreatePizza from "./pages/CreatePizza";
import Base from "./pages/Base";
import Size from "./pages/Size";
import Toppings from "./pages/Toppings";
import Review from "./pages/Review";
import { useSelector } from "react-redux";
import { selectPizzaTotal } from "./store/currentPizzaSlice";




const App = () => {

  const total = useSelector(selectPizzaTotal)

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#f7c0ec] to-[#a7bdea] -mt-3">
      {total>0 &&
      <div className="absolute right-2 top-16 text-sm font-bold bg-gradient-to-bl from-[#30c5d2] to-[#471069] text-transparent bg-clip-text sm:text-base sm:right-9">Current Total: <span className="font-medium">₹{total}</span></div>}
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<Welcome />} />

          {/* Pizza Builder - Nested Routes */}
          <Route path="/create" element={<CreatePizza />}>
            <Route path="base" element={<Base />} />
            <Route path="size" element={<Size />} />
            <Route path="toppings" element={<Toppings />} />
            <Route path="review" element={<Review />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
