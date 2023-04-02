import React, { useState } from "react";
import { FlatTree, motion } from "framer-motion";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AnimationVideo from "../../assets/AnimationVideo.mp4";
import { ValidateError } from "../../components";
import { register } from "../../actions/authAction";

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");
  const [errors, setErrors] = useState({});
  const history = useNavigate();

  const validate = (email, username, password, confirmPassword) => {
    const errors = {};

    if (
      email == "" ||
      username == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      errors.empty = "You must fill all forms";
      return errors;
    } else {
      if (!validator.isEmail(email)) {
        errors.email = "Invalid email address";
      }

      // Validate Password
      if (!validator.isLength(password, { min: 8 })) {
        errors.password = "Password must be at least 8 characters long";
      }

      if (
        !((username) => {
          "/^[a-zA-Z0-9]+$/".test(username);
        })
      ) {
        errors.username = "Username is not valid";
      }

      // Validate Confirm Password
      if (password === confirmPassword) {
        errors.confirmPassword = "Confirm password does not match password";
      }
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(email, password, confirmPassword);
    if (Object.keys(errors).length === 0) {
      dispatch(
        register(({ email, username, password, confirmPassword }, history))
      );
      console.log("Create user succeessfully");
    } else {
      setErrors({});
      console.log(password, confirmPassword, password === confirmPassword);
      setErrors(errors);
    }
  };

  return (
    <div className="relative h-screen w-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="hidden absolute inset-0 -z-10 overflow-hidden md:block">
        <video autoPlay loop muted>
          <source src={AnimationVideo} type="video/mp4" />
        </video>
      </div>
      <motion.div
        layoutId="register"
        transition={{
          layout: { duration: 1, type: "spring", bounce: 0.8 },
        }}
        className="bg-white p-20 flex items-center justify-center"
      >
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-textColor text-3xl font-semibold">
            Welcome Back!
          </h2>
          <p className="text-headingColor text-base">
            Welcome back! Please enter your details
          </p>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email || ""}
                name="email"
                placeholder="Your Email..."
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <ValidateError text={errors.email} />}
            </label>
            <label className="block mb-2">
              Username:
              <input
                type="username"
                value={username || ""}
                name="username"
                placeholder="Username..."
                onChange={(event) => setUsername(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.username && <ValidateError text={errors.username} />}
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                placeholder="Your Password..."
                value={password || ""}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && <ValidateError text={errors.password} />}
            </label>
            <label className="block mb-2">
              Confirm password:
              <input
                type="password"
                placeholder="Your Password..."
                name="password2"
                value={confirmPassword || ""}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <span className="text-base text-red-500">
                  <ValidateError text={errors.confirmPassword} />
                </span>
              )}
              {errors.empty && <ValidateError text={errors.empty} />}
            </label>
            <button
              type="submit"
              className="bg-purple-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4"
            >
              Register
            </button>
            <button
              type="submit"
              className="w-full text-center py-2 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt=""
              />{" "}
              <span>Continue with Google</span>
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
