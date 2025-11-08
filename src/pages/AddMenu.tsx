import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchBases, fetchSizes, fetchToppings } from "../store/pizzaSlice";
import axios from "axios";
import { API_URL } from "../apiConfig";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

interface PizzaData {
  name: string;
  price: string;
  description: string;
  base: string;
  size: string;
  toppings: string[];
  image: File | null; //null because for initial state
}

const AddMenu = () => {
  const dispatch = useDispatch<AppDispatch>(); //<AppDispatch> is essential when using Redux Toolkit with TypeScript to ensure the dispatch function can correctly handle and validate asynchronous thunk actions.
  const bases = useSelector((state: RootState) => state.pizza.bases);
  const sizes = useSelector((state: RootState) => state.pizza.sizes);
  const toppings = useSelector((state: RootState) => state.pizza.toppings);

  const navigate = useNavigate();

  const [pizzaData, setPizzaData] = useState<PizzaData>({
    name: "",
    description: "",
    price: "",
    base: "",
    size: "",
    toppings: [],
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (bases.length === 0) dispatch(fetchBases());
    if (sizes.length === 0) dispatch(fetchSizes());
    if (toppings.length === 0) dispatch(fetchToppings());
  }, [dispatch, bases.length, sizes.length, toppings.length]);

  //handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPizzaData((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };

  //handle toppings checkboxes
  const handleToppingChange = (toppingId: string) => {
    setPizzaData((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId) //includes() checks for existence, find() searches for and returns the element.
        ? prev.toppings.filter((id) => id !== toppingId)
        : [...prev.toppings, toppingId],
    }));
    if (message) setMessage(null);
  };

  //handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPizzaData((prev) => ({ ...prev, image: e.target.files![0] }));
      if (message) setMessage(null);
    }
  };

  //handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    //validate
    if (!pizzaData.name.trim()) {
      setMessage({ type: "error", text: "Pizza name is required." });
      setLoading(false);
      return;
    }

    if (!pizzaData.price) {
      setMessage({
        type: "error",
        text: "Please enter a valid positive price.",
      });
      setLoading(false);
      return;
    }

    if (!pizzaData.base) {
      setMessage({ type: "error", text: "Please select a base." });
      setLoading(false);
      return;
    }

    if (!pizzaData.size) {
      setMessage({ type: "error", text: "Please select a size." });
      setLoading(false);
      return;
    }

    if (pizzaData.toppings.length === 0) {
      setMessage({
        type: "error",
        text: "Please select at least one topping.",
      });
      setLoading(false);
      return;
    }

    if (!pizzaData.image) {
      setMessage({ type: "error", text: "Please upload an image." });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", pizzaData.name.trim());
    formData.append("price", pizzaData.price);
    formData.append("base", pizzaData.base);
    formData.append("size", pizzaData.size);
    formData.append("description", pizzaData.description);
    formData.append("toppings", JSON.stringify(pizzaData.toppings)); //FormData can only send strings or files (like images). Here toppings state is an array of IDs and FormData doesn’t understand arrays. So stringy will convert the array into a string. And in backend we parse it to convert back.
    formData.append("image", pizzaData.image);

    try {
      const res = await axios.post(`${API_URL}/menu`, formData);
      setMessage({ type: "success", text: res.data.message });

      //reset form
      setPizzaData({
        name: "",
        price: "",
        base: "",
        size: "",
        description: "",
        toppings: [],
        image: null,
      });
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } catch (error: any) {
      const backendMsg = error.response?.data?.message;
      const backendErrors =
        error.response?.data?.errors?.join(", ") ||
        "Failed to add pizza. Please try again.";

      let errorMsg = "";
      if (backendMsg) errorMsg += backendMsg;

      if (Array.isArray(backendErrors) && backendErrors.length > 0) {
        //Before calling .join(), make sure backendErrors is actually an array
        errorMsg += " → " + backendErrors.join(", ");
      } else if (typeof backendErrors === "string") {
        errorMsg += " → " + backendErrors; // in case backend sent a single string
      }

      setMessage({ type: "error", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="w-full h-fit flex flex-col items-center"
    >
      <motion.h2
        className="w-full text-center font-['Orbitron'] text-white mt-4 text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        Add New Pizza
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className=" flex flex-col w-[93%] h-fit py-3 text-gray-100 gap-2"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Pizza Name"
          value={pizzaData.name}
          onChange={handleChange}
          className="w-full p-1.5 border rounded "
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={pizzaData.price}
          onChange={handleChange}
          className="w-full p-1.5 border rounded "
          required
        />

        {/* Base Select */}
        <select
          name="base"
          value={pizzaData.base}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-black/10 text-white"
          required
        >
          <option className="bg-gray-400" disabled value="">
            -Select Base-
          </option>
          {bases.map((base) => (
            <option key={base._id} value={base._id} className="bg-black/60">
              {base.name}
            </option>
          ))}
        </select>

        {/* Size Select */}
        <select
          name="size"
          value={pizzaData.size}
          onChange={handleChange}
          className="w-full p-2 border rounded bg-black/10 text-white"
          required
        >
          <option className="bg-gray-400" value="">
            Select Size
          </option>
          {sizes.map((size) => (
            <option key={size._id} value={size._id} className="bg-black/60">
              {size.name}
            </option>
          ))}
        </select>

        {/* Toppings Checkboxes */}
        <div className="my-2.5">
          <p className="font-semibold mb-2 font-['Orbitron']">
            Choose Toppings:
          </p>
          <div className="flex flex-wrap gap-3">
            {toppings.map((topping) => (
              <label key={topping._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={pizzaData.toppings.includes(topping._id)}
                  onChange={() => handleToppingChange(topping._id)}
                  className="custom-checkbox"
                />
                {topping.name}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Pizza Description"
          value={pizzaData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
        />

        {/* Image Upload */}
        <div className="w-full mb-2">
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors font-['Orbitron'] font-semibold">
            Pizza Image:
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* Icon (you can use an SVG or emoji) */}
              <svg
                className="w-8 h-8 mb-4 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-300">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // ← hidden but still functional
              id="pizza-image-upload"
            />
          </label>

          {/* Optional: Image preview */}
          {pizzaData.image && (
            <div className="mt-4">
              <p className="text-sm text-gray-300 mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(pizzaData.image)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border border-gray-600"
                onLoad={() =>
                  URL.revokeObjectURL(URL.createObjectURL(pizzaData.image!))
                }
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-500/70 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Pizza"}
          </button>

          {/* Cancel / Reset Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 px-3 py-2 rounded text-center text-sm ${
              message.type === "success"
                ? "bg-green-900/30 text-green-300 border border-green-700"
                : "bg-red-900/30 text-red-300 border border-red-700"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default AddMenu;
