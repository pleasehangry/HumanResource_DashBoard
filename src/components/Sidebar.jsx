import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { motion, sync } from "framer-motion";

import { useStateContext } from "../context/ContextProvider";
import { links } from "../constants/dummy";
import {
  AiFillShop,
  AiOutlineDoubleLeft,
  AiOutlineGroup,
} from "react-icons/ai";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div
      className="ml-3 h-screen md:overflow-hidden overflow-auto
    md:hover:overflow-auto pb-10"
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center p-2">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center
          gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <AiOutlineGroup className="text-3xl" />{" "}
              <span>Quản lý nhân sự</span>
            </Link>
            <div>
              <button
                type="button"
                onClick={() => {
                  setActiveMenu(false);
                }}
                className="text-xl rounded-full
            p-3 hover:bg-light-gray block"
              >
                <AiOutlineDoubleLeft />
              </button>
            </div>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
