import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useState } from "react";
import { fetchBases, fetchSizes, fetchToppings } from "../store/pizzaSlice";
import axios from "axios";
import { API_URL } from "../apiConfig";


interface PizzaData {
    name: string;
    price: string;
    base: string;
    size: string;
    toppings: string[];
    image: File | null;  //null because for initial state
}


const AddMenu = () => {

    const dispatch = useDispatch<AppDispatch>();  //<AppDispatch> is essential when using Redux Toolkit with TypeScript to ensure the dispatch function can correctly handle and validate asynchronous thunk actions.
    const bases = useSelector((state: RootState)=> state.pizza.bases);
    const sizes = useSelector((state: RootState)=> state.pizza.sizes);
    const toppings = useSelector((state: RootState) => state.pizza.toppings);


    const [pizzaData, setPizzaData] = useState<PizzaData>({
    name: "",
    price: "",
    base: "",
    size: "",
    toppings: [],
    image: null,
  });

   const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

useEffect(()=>{
    if (bases.length === 0) dispatch(fetchBases());
     if (sizes.length === 0) dispatch(fetchSizes());
    if (toppings.length === 0) dispatch(fetchToppings());
}, [dispatch, bases.length, sizes.length, toppings.length]);


//handle input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPizzaData((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };


  //handle toppings checkboxes
  const handleToppingChange = (toppingId: string) => {
    setPizzaData((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)  //includes() checks for existence, find() searches for and returns the element.
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
      setMessage({ type: "error", text: "Please enter a valid positive price." });
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
      setMessage({ type: "error", text: "Please select at least one topping." });
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
    formData.append("toppings", JSON.stringify(pizzaData.toppings));  //FormData.append() here because the standard FormData.append() method only supports appending strings or files (Blobs); since pizzaData.toppings is a JavaScript array, it must be serialized into a single, unambiguous string format (JSON) before being added to the FormData for reliable transmission to the server.
    formData.append("image", pizzaData.image);

    try {
        await axios.post(`${API_URL}/menu`, formData);
        setMessage({ type: "success", text: "Pizza added successfully! 🍕" });

        //reset form
         setPizzaData({
        name: "",
        price: "",
        base: "",
        size: "",
        toppings: [],
        image: null,
      });
        
    } catch (error: any) {
        const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "Failed to add pizza. Please try again.";
      setMessage({ type: "error", text: errorMsg });
    }  finally {
      setLoading(false);
    }
  }

  return (
    <div>

    </div>
  )
}

export default AddMenu