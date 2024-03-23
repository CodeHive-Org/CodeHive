import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userId = "23423";
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const disconnect = () => 'disconnect';
  const address = null;

  const loginHandler = () => {
    navigate("/login");
  };

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
    <div className="px-5 w-full py-4">
      <main className="flex items-center justify-between text-white">
        {/* Logo */}
        <div className="w-full h-full">
          <img
            onClick={() => navigate("/")}
            src="/assets/logo.png"
            alt="CodeHive"
            className="w-[180px] h-[100%] cursor-pointer"
          />
        </div>
        {/* right side */}
        {(user && user?.user) || address ? (
          <div className="flex items-center space-x-4">
            <p className="text-gray-300">{user?.user?.email || address}</p>
            <Button
              onClick={logoutHandler}
              className="bg-red-500  text-foreground hover:bg-black"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="">
            <Button onClick={loginHandler} className="px-10 py-2">
              Login
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Navbar;
