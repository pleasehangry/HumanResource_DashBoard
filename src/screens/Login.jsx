import React, { useState } from "react";
import { motion } from "framer-motion";

import AnimationVideo from "../assets/AnimationVideo.mp4";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      // Set error state for empty fields
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }
    // Check email and password validity here, using regular expressions or other methods
    // If email or password is not valid, set error state for the corresponding field
    // Example:
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }
    // Do the same for password validity, if needed
    // If email and password are valid, proceed with login logic
    // ...
  };

  const bgVariants = {
    animate: {
      x: ["-100%", "0%", "100%"],
      transition: {
        x: {
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="relative h-screen w-screen grid grid-cols-2">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video autoPlay loop muted>
          <source src={AnimationVideo} type="video/mp4" />
        </video>
      </div>
      <div className="bg-white p-20 flex items-center justify-center">
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-textColor text-3xl font-semibold">
            Welcome Back!
          </h2>
          <p className="text-headingColor text-base">
            Welcome back! Please enter your details
          </p>
          <form className="w-full" action="">
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                placeholder="Your Email..."
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                placeholder="Your Password..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
              />
            </label>
            {emailError && (
              <div className="text-red-500 mb-2">
                Please enter a valid email address
              </div>
            )}
            {passwordError && (
              <div className="text-red-500 mb-2">
                Please enter a valid password
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="mr-2"
                />
                <span>Remember me</span>
              </label>
              <a className="text-sm" href="#">
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-purple-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4"
            >
              Log in
            </button>
            <button className="w-full text-center py-2 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt=""
              />{" "}
              <span>Login with Google</span>
            </button>
          </form>
        </div>
      </div>
      <motion.div className=""></motion.div>
    </div>
  );
};

export default Login;
