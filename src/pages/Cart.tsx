import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/cartStore";
import { motion } from "motion/react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);

  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);


  const [showConfirm, setShowConfirm] = useState(false);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-gray-300"
      >
        <p className="text-xl mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-400 text-black px-4 py-2 rounded-md"
        >
          Go to Menu
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="max-w-4xl mx-auto p-4 text-white"
    >
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] items-start sm:items-center gap-3 sm:gap-4 bg-[#232425] p-4 rounded-lg"
          >
            {/* Left */}
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-400">Size: {item.size}</p>
              <p className="text-orange-400 font-bold">₹{item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 sm:justify-center sm:mr-10">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 border rounded-md"
              >
                <FiMinus />
              </button>

              <span className="min-w-[24px] text-center">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 border rounded-md"
              >
                <FiPlus />
              </button>
            </div>

            {/* Right */}
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4">
              <p className="font-semibold">₹{item.price * item.quantity}</p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-500"
              >
                <FiTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-4">
        <p className="text-xl font-bold">Total: ₹{total}</p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirm(true)}
            className="border px-4 py-2 rounded-md"
          >
            Clear Cart
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-orange-400 text-black px-6 py-2 rounded-md"
          >
            Checkout
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#232425] rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">Clear cart?</h3>
            <p className="text-gray-400 text-sm mb-6">
              This will remove all items from your cart.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md border text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  clearCart();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-md bg-red-500 text-white"
              >
                Yes, clear
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
