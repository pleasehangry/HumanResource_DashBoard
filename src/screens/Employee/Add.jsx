import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineUserAdd } from "react-icons/ai";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "./InputForm";

const AddEmployee = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 m-4 bg-white rounded-md shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-medium">Thêm nhân viên</h2>
        <AiOutlineUserAdd className="w-6 h-6 text-gray-400" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-start-2 flex items-center justify-center w-full border-b-2 border-slate-300 pb-4">
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
            name="email"
            Label="Email"
            handleChange={handleChange}
            value={formData.name}
            colStart="col-start-1"
          />
          <InputForm
            name="password"
            Label="Password"
            type="password"
            handleChange={handleChange}
            value={formData.name}
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
            className="p-3 border-none bg-purple-700 cursor-pointer text-white font-semibold rounded-md divide-y-2 mt-2"
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

export default AddEmployee;
