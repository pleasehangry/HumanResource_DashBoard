import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineUserAdd } from "react-icons/ai";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "./InputForm";
import { Button } from "../../components";
import { addEmployee } from "../../actions/employeeActions";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);

  const [avatar, setAvatar] = useState({
    file: null,
    preview: defaultAvatar,
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    department: "",
    position: "",
    age: "",
    country: "",
    img: avatar.file,
  });

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const clear = () => {
    setFormData({
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      department: "",
      position: "",
      age: "",
      country: "",
      img: null,
    });
  };

  const [vadidErrors, setvadidErrors] = useState({});

  function validate(formData) {
    // check each field for validity
    if (!formData.firstname) {
      vadidErrors.firstname = "First name is required";
    }
    if (!formData.lastname) {
      vadidErrors.lastname = "Last name is required";
    }
    if (!formData.phone || !validator.isMobilePhone(formData.phone)) {
      vadidErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.department) {
      vadidErrors.department = "Department is required";
    }
    if (!formData.position) {
      vadidErrors.position = "Position is required";
    }
    if (
      !formData.age ||
      !validator.isInt(formData.age, { min: 18, max: 120 })
    ) {
      vadidErrors.age = "Age must be between 18 and 120";
    }
    if (!formData.country) {
      vadidErrors.country = "Country is required";
    }
    if (!formData.img) {
      vadidErrors.img = "Please upload an image";
    }
    vadidErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      // handle errors
    } else {
      dispatch(addEmployee(formData));
      dispatch(register(authData));
      clear();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              name="img"
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
            type="email"
            Label="Email"
            handleChange={handleChange}
            value={formData.email}
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
          <Button label="Lưu" className="" />
        </div>
      </form>
    </motion.div>
  );
};

export default AddEmployee;
