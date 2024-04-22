import Footer from "@/components/Footer";
import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const address = "sdfsdcs";

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // const formData = new URLSearchParams();
    // formData.append("email", email);
    // formData.append("username", username);
    // formData.append("password", password);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/add_user",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //       }
    //     }
    //   );
    //   console.log("Response:", response.data);

    //   if ("Err" in response.data) {
    //     toast.error(`User with this Email/Username id already exists !`);
    //   } else {
    //     toast.success("Login successful");
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({ user: response.data.Ok })
    //     );

    //     setTimeout(() => {
    //       navigate("/");
    //     }, 1000);
    //   }
    // } catch (error) {
    //   console.log("errro : ", error);
    //   toast.error("Login failed");
    // }
  };

  if (address) 
    <Navigate to='/' />

  return (
    <main className="flex flex-col justify-between min-h-screen">
      <div className="relative flex items-center justify-center flex-1 bg-black">
        <nav className="fixed w-full top-1 text-white flex justify-start px-5 p-6 border-b border-gray-800 ">
          <img src="/assets/logo.png" alt="logo" height={150} width={150} />
        </nav>
        <div className="w-full max-w-md border border-gray-800 rounded-md p-10">
          <form
            onSubmit={handleSubmit}
            className="text-[#FACC15] shadow-md rounded-md p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#FACC15] text-center">
              Signup
            </h2>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-white font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-white font-bold mb-2"
              >
                UserName
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-10">
              <label
                htmlFor="password"
                className="block text-white font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            {/* <div className="mb-10">
                <label htmlFor="confirmPassword" className="block text-white font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div> */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Sign up
              </button>
              <a
                href="/auth/forgot-password"
                className="text-[#FACC15] hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </form>

          <h1 className="text-second text-xl font-semibold text-center">or</h1>

          {/* <ConnectWallet className="connectwallet-class" /> */}
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FACC15] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        <Toaster />
      </div>
      <Footer />
    </main>
  );
};

export default Signup;
