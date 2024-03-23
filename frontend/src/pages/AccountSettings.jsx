import { useGetUser } from "@/hooks/getUser";
import { Button } from "@/components/ui/button";
import React from "react";
import Nav from "@/components/problems/Nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Navigate } from "react-router-dom";

export default function AccountSettings() {
  const user = useGetUser();
  console.log("user : ", user);
  setTimeout(() => {
    if (!user.user) {
      return <Navigate to="/problems" />;
    }
  }, []);

  return (
    <main className="px-10 bg-background min-h-screen py-2 w-full rounded-md ">
      {/* right side */}
      <Nav />
      <MaxWidthWrapper>
        <section className="flex justify-between w-[69%] max-w-[1300px]max-md:flex-col-reverse">
          <div className="flex px-2 py-6 flex-col space-y-10  justify-center items-start">
            <h1 className="text-2xl border-b ">User Details : </h1>
            <ul className="list-none">
              {user &&
                Object.entries(user.Ok).map(([key, value], index) => (
                  <li key={index} className="flex space-x-6 w-full">
                    <h1 className="text-[1.3rem] font-semibold">{key} : </h1>
                    <p className="text-green-200 text-[1.2rem]">
                      {String(value)}
                    </p>
                  </li>
                ))}
            </ul>
            <Button className="px-6 text-white bg-red-500">
              Update Details
            </Button>
          </div>
          {/* left side */}
          <div className="mt-10">
            <img
              src={"https://avataaars.io/"}
              className="w-[190px] bg-[#141414] rounded-md"
              alt="your-avatar"
            />
          </div>
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
