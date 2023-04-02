import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ ease: "linear", duration: 1, repeat: Infinity }}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "5px solid white",
        }}
      />
    </div>
  );
};

export default Loader;
