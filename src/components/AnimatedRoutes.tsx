import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Welcome from '../pages/Welcome';
import CreatePizza from '../pages/CreatePizza';
import Base from '../pages/Base';
import Size from '../pages/Size';
import Toppings from '../pages/Toppings';
import Review from '../pages/Review';
import AddMenu from '../pages/AddMenu';
import MenuPage from '../pages/MenuPage';
import MenuDetail from '../pages/MenuDetail';
import { AnimatePresence } from 'motion/react';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';

// import Welcome from "./pages/Welcome";


// // Pizza builder pages
// import CreatePizza from "./pages/CreatePizza";
// import Base from "./pages/Base";
// import Size from "./pages/Size";
// import Toppings from "./pages/Toppings";
// import Review from "./pages/Review";
// import { useSelector } from "react-redux";
// import { selectPizzaTotal } from "./store/currentPizzaSlice";
// import AddMenu from "./pages/AddMenu";
// import MenuPage from './pages/MenuPage';
// import MenuDetail from './pages/MenuDetail';

function AnimatedRoutes() {
    const location = useLocation(); //for page transition animation
  return (
      <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
          {/* Landing page */}
          <Route path="/" element={<Welcome />} />

          {/* Pizza Builder - Nested Routes */}
          <Route path="/create" element={<CreatePizza />}>
            <Route path="base" element={<Base />} />
            <Route path="size" element={<Size />} />
            <Route path="toppings" element={<Toppings />} />
            <Route path="review" element={<Review />} />
          </Route>
           <Route path="menu/add-menu" element={<AddMenu />} />
           <Route path="menu" element={<MenuPage />} />
           <Route path="menu/:id" element={<MenuDetail />} />
           <Route path ="login" element={<Login />}/>
           <Route path ="register" element={<Register />}/>
           <Route path ="forgot-password" element={<ForgotPassword />}/>

        </Routes>
         </AnimatePresence>
  )
}

export default AnimatedRoutes