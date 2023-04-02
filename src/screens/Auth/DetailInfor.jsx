import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AiOutlineUserAdd } from "react-icons/ai";

import defaultAvatar from "../../assets/images/default_avatar.png";
import InputForm from "../Employee/InputForm";

const DetailInfor = () => {
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
    img: null,
  });
  const clear = () => {
    setFormData({
      firstname: "",
      lastname: "",
      phone: "",
      department: "",
      position: "",
      age: "",
      img: null,
    });
  };

  const [vadidErrors, setVadidErrors] = useState({});

  const validate = (formData) => {
    // check each field for validity
    let errors = {};
    for (let i of Object.values(formData)) {
      if (typeof i === "string") {
        if (validator.isEmpty(i)) {
          errors.emptyError = "You must fill all form!";
          return errors;
        }
      }
    }
    if (
      (!validator.isNumeric(formData.age) &&
        Number.parseInt(formData.age) > 120) ||
      Number.parseInt(formData.age) < 18
    ) {
      errors.ageError = "Your age isn't valid";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const vadidErrors = validate(formData);
    if (Object.keys(vadidErrors).length === 0) {
      dispatch(addEmployee(formData));
      clear();
    } else {
      setVadidErrors(vadidErrors);
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
        setFormData({ ...formData, img: file });
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
            error={vadidErrors.ageError}
          />
          <InputForm
            name="phone"
            Label="Phone"
            handleChange={handleChange}
            value={formData.phone}
          />
          {Object.values(vadidErrors).map((error) => (
            <ValidateError key={error} text={error} />
          ))}
        </div>
        <Button type="submit" primary className="mt-3 px-12">
          Lưu
        </Button>
      </form>
    </motion.div>
  );
};

export default DetailInfor;
