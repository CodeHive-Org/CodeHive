import { DollarSign, HelpCircle, Play, Users } from "lucide-react";
import { Button } from "./ui/button";

const BannerGrids = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center border-b border-secondary p-5 py-20">
      <div className="mx-auto flex flex-col items-center pb-20">
        <h1 className="text-[3rem] font-semibold">
          For Challengers and Hackers
        </h1>
      </div>
      <div
        className="mx-auto
            grid max-w-[1500px] grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-2"
      >
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <HelpCircle
              size={50}
              className="mr-3 rounded-full  text-primary "
            />
            <h2 className="mb-2 text-2xl font-bold">Questions</h2>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            molestiae laboriosam nemo veniam libero eligendi!
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 ">
            Business Opportunities
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Users size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Communities</h2>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            molestiae laboriosam nemo veniam libero eligendi! Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Eum corrupti voluptatibus,
            sunt rem at quod.
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 ">
            Business Opportunities
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <Play size={50} className="mr-3 rounded-full  text-primary " />
            <h2 className="mb-2 text-2xl font-bold">Contest</h2>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            molestiae laboriosam nemo veniam libero eligendi! Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Asperiores minima porro
            animi atque exercitationem officia neque quia.
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 ">
            Business Opportunities
          </Button>
        </div>
        <div className="col-span-1 space-y-4 rounded-md bg-black/30 p-8 sm:col-span-2 lg:col-span-1">
          <div className="flex items-start border-b border-gray-800 py-2">
            <DollarSign
              size={50}
              className="mr-3 rounded-full  text-primary "
            />
            <h2 className="mb-2 text-2xl font-bold">Rewards</h2>
          </div>
          <p className="mb-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            molestiae laboriosam nemo Lorem ipsum dolor sit amet. veniam libero
            eligendi!
          </p>
          <Button variant="outline" className="rounded-md px-4 py-2 ">
            Business Opportunities
          </Button>
        </div>
      </div>
    </main>
  );
};

export default BannerGrids;
