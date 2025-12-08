import { useState } from "react";
import { motion } from "motion/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const progress = step / 2;  // step 1 => 0.5, step 2 => 1

   const canGoNextStep1 =
    details.username.trim() !== "" &&
    details.email.trim() !== "" &&
    details.password.trim() !== "";

    const canSubmitStep2 =
    details.address.trim() !== "" &&
    details.city.trim() !== "" &&
    details.state.trim() !== "" &&
    details.phone.trim() !== "";

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
      className="relative w-full min-h-[calc(100vh-56px)] bg-cover bg-center"
      style={{ backgroundImage: `url('./assets/restaurant-hero.jpg')` }}
    >
      <motion.div className="absolute inset-0 bg-black/70 flex justify-center">
        <motion.div className="border border-white/30 w-[90dvw] xmd:w-[70dvw] sm:w-[50dvw] md:w-[55dvw] lg:w-[35dvw] h-fit mt-4 py-5 md:px-15 xmd:mt-24 backdrop-blur-xs bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 17,
            }}
            className="relative z-10 
                     bg-[linear-gradient(45deg,theme(colors.orange.600)_42%,theme(colors.orange.400)_100%)]
                     bg-clip-text text-transparent tracking-wider 
                     text-2xl sm:text-4xl font-extrabold font-['Orbitron'] mb-5 text-center"
          >
            Register
          </motion.h2>

          <p className="text-sm text-center text-orange-200/80 mb-3">
            Step {step} of 2
          </p>

           {/* Progress bar using Framer Motion x-axis (scaleX) */}
          <div className="w-[80%] mx-auto mb-5">
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-400 origin-left"
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ type: "spring", stiffness: 120, damping: 11 }}
              />
            </div>
          </div>

          <motion.form className="flex flex-col gap-5">

           {step === 1 && (<>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={details.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={details.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={details.password}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3"
              >
                {showPassword ? <FaEye size={13} /> : <FaEyeSlash size={13} />}
              </button>
            </div>
            </>)}

             {step === 2 && (
              <>
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={details.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-gray-300 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={details.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-gray-300 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={details.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-gray-300 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={details.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/20 text-white placeholder:text-gray-300 text-sm outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                  />
                </div>
              </>
            )}

            <div  className={`w-full mt-5 ${
    step === 1
      ? "flex justify-center"
      : "flex justify-between px-6"
  }`}>

                   {step === 2 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="py-2 rounded-3xl w-[30%] font-semibold shadow bg-gray-300/90 text-gray-800 hover:bg-gray-200"
                  onClick={() => setStep(1)}
                >
                  Back
                </motion.button>
              )}

                 <motion.button
                type={step === 1 ? "button" : "submit"}
                whileHover={{
                  scale: 1.1,
                  boxShadow:
                    step === 1
                      ? canGoNextStep1
                        ? "0px 0px 8px rgba(255, 99, 71, 0.8)"
                        : "0px 0px 6px rgba(156, 163, 175, 0.4)"
                      : canSubmitStep2
                      ? "0px 0px 8px rgba(255, 99, 71, 0.8)"
                      : "0px 0px 6px rgba(156, 163, 175, 0.4)",
                }}
                disabled={
                  step === 1 ? !canGoNextStep1 : !canSubmitStep2
                }
                onClick={() => {
                  if (step === 1 && canGoNextStep1) {
                    setStep(2);
                  }
                }}
                className={`py-2 rounded-3xl w-[50%] font-semibold shadow
                  ${
                    step === 1
                      ? canGoNextStep1
                        ? "bg-orange-400/90 text-white hover:bg-orange-500/70"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : canSubmitStep2
                      ? "bg-orange-400/90 text-white hover:bg-orange-500/70"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {step === 1 ? "Next" : "Register"}
              </motion.button>
            </div>

            <div className="flex justify-center -mt-2.5">
              <Link
                to="/login"
                className="text-sm font-light text-orange-300/70 underline hover:scale-105 transition-all duration-200"
              >
                Already have an account?{" "}
                <span className="font-medium">Login</span>
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
