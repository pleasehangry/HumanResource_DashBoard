import React, { useState } from "react";
import { FlatTree, motion } from "framer-motion";
import validator from "validator";

import AnimationVideo from "../../assets/AnimationVideo.mp4";
import ValidateError from "./ValidateError";
import InputForm from "../Employee/InputForm";
import { useDispatch } from "react-redux";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { AiOutlineUserAdd } from "react-icons/ai";

const AddInforForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    department: "",
    position: "",
    age: "",
    country: "",
    img: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch action to add employee to redux store
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [avatar, setAvatar] = useState({
    file: null,
    preview: defaultAvatar,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar({
        file: null,
        preview: defaultAvatar,
      });
    }
  };

  return (
    <motion.div className="p-6 m-4 bg-white rounded-md shadow-md w-1/2 mx-auto">
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-medium">Điền thêm thông tin</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-start-1 flex items-center justify-center w-full border-b-2 border-slate-300 pb-4">
            <label htmlFor="avatar">
              <img
                src={avatar.preview}
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-full overflow-hidden shadow-md"
              />
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <InputForm
            name="firstname"
            Label="First Name"
            handleChange={handleChange}
            value={formData.firstname}
            colStart="col-start-1"
          />
          <InputForm
            name="lastname"
            Label="Last Name"
            handleChange={handleChange}
            value={formData.lastname}
          />
          <InputForm
            name="position"
            Label="Position"
            handleChange={handleChange}
            value={formData.position}
            colStart="col-start-1"
          />
          <InputForm
            name="department"
            Label="Department"
            handleChange={handleChange}
            value={formData.department}
          />

          <InputForm
            name="age"
            Label="Age"
            handleChange={handleChange}
            value={formData.age}
          />
          <motion.button
            className=" border-none bg-purple-700 cursor-pointer text-white font-semibold rounded-md mt-7"
            type="submit"
            whileHover={{
              scale: 1.05,
              opacity: 0.9,
              boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.25)",
              transition: { duration: 0.2 },
            }}
            onTap={{ scale: 0.9, transition: { duration: 0.3 } }}
          >
            Lưu
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isRegisterView, setIsRegisterView] = useState(true);

  const validate = (email, password, confirmPassword) => {
    const errors = {};

    if (email == "" || password == "" || confirmPassword == "") {
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

      // Validate Confirm Password
      if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = "Confirm password does not match password";
      }
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const errors = validate(email, password, confirmPassword);

    // if (Object.keys(errors).length === 0) {
    //   // Form is valid - submit the data
    //   console.log("Form submitted");
    // } else {
    //   // Form is invalid - display the errors
    //   setErrors(errors);
    // }
    setIsRegisterView(false);
  };

  return (
    <>
      {isRegisterView ? (
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
                    placeholder="Your Email..."
                    onChange={(event) => setEmail(event.target.value)}
                    className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && <ValidateError text={errors.email} />}
                </label>
                <label className="block mb-2">
                  Password:
                  <input
                    type="password"
                    placeholder="Your Password..."
                    value={password || ""}
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
                    value={confirmPassword || ""}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className={`w-full p-2 rounded outline-none border text-lg text-headingColor ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
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
                <button className="w-full text-center py-2 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
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
      ) : (
        <motion.div layoutId="register">
          <AddInforForm />
        </motion.div>
      )}
    </>
  );
};

export default Register;
