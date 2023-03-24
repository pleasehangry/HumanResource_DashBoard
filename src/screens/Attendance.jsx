import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineOrderedList,
  AiOutlinePicLeft,
  AiOutlineSearch,
} from "react-icons/ai";

import DropdownFilter from "../components/DropdownFilter";
import { textVariant, zoomIn } from "../utils/motion";
import { fetchEmployees } from "../actions/employeeActions";

const listEms = [
  {
    id: "1",
    first_name: "Hoang",
    last_name: "Hoang",
    position: "CEO",
    img: "https://th.bing.com/th?id=ORMS.2504fc7ad102f749b1f0cc03be698990&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.5&p=0",
  },
  {
    id: "2",
    first_name: "Hoang",
    last_name: "Hoang",
    position: "CEO",
    img: "https://th.bing.com/th?id=ORMS.2504fc7ad102f749b1f0cc03be698990&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.5&p=0",
  },
  {
    id: "3",
    first_name: "Hoang",
    last_name: "Hoang",
    position: "CEO",
    img: "https://th.bing.com/th?id=ORMS.2504fc7ad102f749b1f0cc03be698990&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1.5&p=0",
  },
];

const Attendance = () => {
  const dispatch = useDispatch();

  const today = new Date().toISOString().substr(0, 10);

  const [date, setDate] = useState(today);

  const [isListView, setIsListView] = useState(false);

  const employees = useSelector((state) => state.employees) || listEms;
  const currentPage = useSelector((state) => state.currentPage);
  const numberOfPages = useSelector((state) => state.numberOfPages);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [currentPage, numberOfPages, dispatch]);

  const handlePageChange = (pageNumber) => {
    fetchEmployees(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 border border-slate-200 rounded-xl">
      <div className="py-8">
        <div>
          <motion.h2
            variants={textVariant(0.5)}
            initial="hidden"
            animate="show"
            className="text-2xl font-semibold leading-tight"
          >
            Chấm công
          </motion.h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.1,
            }}
            className="flex flex-row mb-1 sm:mb-0 sm:flex-row border border-slate-500 rounded-md"
          >
            <DropdownFilter
              label="Sắp sếp"
              options={["Thấp đến cao", "Cao đến thấp"]}
            />
            <DropdownFilter
              label="Sắp sếp"
              options={["Thấp đến cao", "Cao đến thấp"]}
            />
            <div className="flex items-center justify-center border ">
              <input
                placeholder="Search"
                className="p-2 bg-white text-lg outline-none"
              />
              <span className="text-2xl p-2">
                <AiOutlineSearch />
              </span>
            </div>
            <div className="p-2 block items-center">
              <input
                className="outline-none text-base font-light"
                placeholder="halo"
                type="date"
                defaultValue={today}
              />
            </div>
          </motion.div>
          <motion.div
            variants={zoomIn(0.5, 0.3)}
            initial="hidden"
            animate="show"
            className="flex items-center justify-center p-2 bg-slate-200 ml-auto rounded-md"
          >
            <button
              className={`p-1 ${isListView && "bg-white"} rounded-sm`}
              onClick={() => {
                setIsListView(true);
              }}
            >
              <span className="text-xl font-semibold">
                <AiOutlineOrderedList />
              </span>
            </button>
            <button
              className={`p-1 rounded-sm ${!isListView && "bg-white"}`}
              onClick={() => {
                setIsListView(false);
              }}
            >
              <span className="text-xl font-semibold">
                <AiOutlinePicLeft />
              </span>
            </button>
          </motion.div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {isListView ? (
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created at
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, i) => (
                    <tr key={i}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={employee.img}
                              alt=""
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {employee.first_name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {employee.position}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 21, 2020
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Activo</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="container bg-white border rounded-md py-5 px-1">
              <div className="grid grid-cols-4 gap-4">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className={`flex flex-col items-center ${
                      false ? "bg-green-200" : "bg-red-200"
                    } shadow-lg rounded-lg overflow-hidden`}
                  >
                    <img
                      src={employee.img}
                      className="w-32 h-32 object-cover rounded-full mt-5"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-slate-800 text-center ">
                        {employee.last_name} {employee.first_name}
                      </h2>
                      <p className="text-slate-800">{employee.position}</p>
                      <p className="text-slate-800 text-center">Active</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10">
            <ul className="inline-flex justify-center w-full -space-x-px mx-auto">
              <li>
                <button
                  disabled={currentPage == 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Prev
                </button>
              </li>
              {Array.from({ length: numberOfPages }).map((_, i) => (
                <li>
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  disabled={currentPage === numberOfPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
