import clsx from "clsx";
import React, { useRef } from "react";
import StarGrid from "./ui/StarGrid";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { Button } from "./ui/button";

const Hero = () => {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  const navigate = useNavigate();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 },
      );

      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.6",
      );

      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8",
      );
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 1.3 },
        "+=0.3",
      );
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.8 },
        "-=1",
      );
    },
    { scope: container },
  );

  const clickHandler = () => {
    navigate("/problems");
  };

  return (
    <div
      ref={container}
      className="relative mt-28 flex 
    flex-col items-center"
    >
      <StarGrid />
      <h1 className="hero__heading mx-auto w-[90%] text-balance text-center text-5xl font-medium text-white opacity-0 md:text-7xl">
        A New Way to Solve Challenges and <span>win rewards</span>{" "}
      </h1>
      <p
        className="hero__body mx-auto mt-6 max-w-[40%] text-alance
        text-center text-slate-300 opacity-0"
      >
        {`"Solve challenges, reap rewards – it's more than just leveling up your skills"`}
      </p>

      <Button
        onClick={clickHandler}
        className="text-medium z-10 mt-5 cursor-pointer
      rounded-full bg-rose-700/90 px-10 py-2 text-white hover:bg-primary"
      >
        Lets goo
      </Button>
      <div className="hero__image glass-container mt-16 w-fit opacity-0 max-sm:w-[90%]">
        <div className="hero__glow absolute inset-0 -z-10 bg-rose-600/30 opacity-0 blur-2xl filter" />
        <img
          className="mx-auto rounded-lg"
          src="/assets/main-ss.png"
          alt="home screenshot"
          sizes="100%"
        />
      </div>
    </div>
  );
};

export default Hero;
