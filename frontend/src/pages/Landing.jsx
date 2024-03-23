import BannerGrids from "@/components/BannerGrids";
import { Faq } from "@/components/Faq";
import Footer from "@/components/Footer";
import Logos from "@/components/Logos";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col space-y-4">
        {" "}
        {/* Container */}
        {/* hero section */}
        <section
          className="w-full px-5 py-32 flex
     items-center justify-center"
        >
          <div className="max-w-full flex max-lg:flex-col items-center gap-10 justify-between flex-row-reverse">
            {/* image */}
            <div
              className="xl:w-[900px] flex-1 md:w-[600px] max-w-[760px]
        shadow-xl shadow-[#2A2A2A] "
            >
              <img
                src="/assets/home-ss.png"
                alt="homepage-screenshot"
                className="w-full h-full"
                // className='xl:w-[900px] shadow-xl shadow-[#2A2A2A]
                // rounded-md'
              />
            </div>
            {/* right section */}
            <section
              className="flex flex-1 flex-col space-y-4 items-start 
        max-lg:items-center "
            >
              <h1 className="text-white  w-[370px] xl:w-[700px] flex flex-col font-extrabold lg:text-[2.6rem] max-lg:w-full max-lg:text-center text-[2rem]">
                A New Way to
                <span className="">Solve Challenges and win rewards</span>{" "}
              </h1>
              <p className="text-foreground text-gray-300 max-lg:text-center max-lg:w-full w-[70%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                magnam inventore rerum nam id beatae!
              </p>
              <Button className="px-8 py-4 mt-10">
                <Link to="/problems">Enter App !</Link>
              </Button>
            </section>
          </div>
        </section>
        <Logos />
        {/* components */}
        <BannerGrids />
        {/* faq */}
        <Faq />
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
