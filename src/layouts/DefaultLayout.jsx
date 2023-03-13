import React from "react";

import { Sidebar, Navbar } from "../components";
import { useStateContext } from "../context/ContextProvider";

const DefaultLayout = ({ children }) => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {activeMenu ? (
        <div
          className="w-72 fixed sidebar
            dark:bg-secondary-dark-bg
            bg-white"
        >
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
          activeMenu ? "md:ml-72" : "flex-2"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg nav-bar w-full">
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
