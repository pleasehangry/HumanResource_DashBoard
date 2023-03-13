import React, { useEffect } from "react";
import {
  AiFillBell,
  AiFillCaretDown,
  AiFillMessage,
  AiOutlineArrowDown,
  AiOutlineMenu,
  AiOutlineNotification,
  AiOutlineWechat,
} from "react-icons/ai";

import { UserProfile } from "./";
import { useStateContext } from "../context/ContextProvider";

const NavButton = ({ title, customFunc, icon, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setIsClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="flex justify-between p-2 md:mx-6 relative ">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        dotColor="#03C9D7"
        icon={<AiOutlineMenu />}
      ></NavButton>
      <div className="flex">
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => {
            handleClick("chat");
          }}
          icon={<AiOutlineWechat />}
        />
        <NavButton
          title="Notification"
          dotColor="#03C9D7"
          customFunc={() => {
            handleClick("notification");
          }}
          icon={<AiOutlineNotification />}
        />
        <div>
          <div
            className="flex items-center gap-2 cursor-pointer p-1
          hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src="https://avatars.githubusercontent.com/u/81598637?s=40&v=4"
              alt="Avatar"
            ></img>
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 text-14 font-bold ml-1">
                Quang Hoang
              </span>
            </p>
            <AiOutlineArrowDown className="text-gray-400 text-14" />
          </div>
        </div>
        {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
