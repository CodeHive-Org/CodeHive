import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import ConnectButton from "@/context/ConnectButton";

const Navbar = () => {
  const userId = "23423";
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const disconnect = () => "disconnect";
  const address = null;

  

  const logoutHandler = () => {
    localStorage.removeItem("user");
    disconnect();

    window.location.reload();

    // Disconnect the Local Wallet from the SDK
  };

  // REMOVE
  // useEffect(() => {
  //     setUser(userState);
  // }, []);

  return (
    <div className="w-full px-5 py-4 xl:px-10">
      <main className="flex items-center justify-between text-white">
        {/* Logo */}
        <div className="h-full w-full">
          <img
            onClick={() => navigate("/")}
            src="/assets/logo1.png"
            alt="CodeHive"
            className="w-[160px] object-fill cursor-pointer"
          />
          {/* <h1 className="text-2xl font-semibold">CodeHive</h1> */}
        </div>
        {/* right side */}
        

        {/* connect wallet */}
        <ConnectButton />
        {/* user */}
      </main>
    </div>
  );
};

export default Navbar;
