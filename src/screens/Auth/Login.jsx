import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import validator from "validator";

import AnimationVideo from "../../assets/AnimationVideo.mp4";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authAction";
import { useNavigate } from "react-router-dom";
import { Button, Loader, ValidateError } from "../../components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const ServerErrors = useSelector((state) => state.authReducer.errors);
  const isLoading = useSelector((state) => state.loading);

  console.log(ServerErrors, isLoading);

  const validationCheck = (email, password) => {
    const errors = {};

    if (email == "" || password == "") {
      errors.emptyError = "You must fill email and password";
      return errors;
    }

    if (!validator.isEmail(email)) {
      errors.emailError = "Your email is not valid";
    }

    if (password.length < 8) {
      errors.passwordError = "Your password is not valid";
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("button clicked");
    const errors = validationCheck(email, password);
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      console.log("Form submited");
      dispatch(login({ email, password }, navigate));
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="relative h-screen w-screen grid grid-cols-2">
      {isLoading && <Loader />}
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
          <form className="w-full" onSubmit={handleSubmit}>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={email}
                placeholder="Your Email..."
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                placeholder="Your Password..."
                value={password}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                  errors.passwordError ? "border-red-500" : "border-gray-300"
                }`}
              />
            </label>
            {errors.emailError && (
              <div className="text-red-500 mb-2">
                Please enter a valid email address
              </div>
            )}
            {errors.passwordError && (
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
            {errors.emptyError && <ValidateError text={errors.emptyError} />}
            {ServerErrors && <ValidateError text={ServerErrors} />}
            <Button type="submit" primary className="w-full mt-3">
              Login
            </Button>
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
    </div>
  );
};

export default Login;
