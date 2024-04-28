import ConnectButton from "../../context/ConnectButton";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };
  const userId = "sfdsd";
  return (
    <nav className="pz-2 sticky inset-x-0 bg-background px-6 py-3">
      <main className="flex items-center justify-between py-1">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src="/assets/logo1.png"
          alt="Code Duel"
          className="object-contain w-[140px] cursor-pointer"
        />
        <div className="flex h-full w-full items-center space-x-4">
          {/* prev and next problem buttons */}
          <div className="flex items-center space-x-2 pl-4 text-lg text-foreground">
            <ChevronLeft className="cursor-pointer" size={28} />
            <span className="text-sm text-second">{"Problem 1"}</span>
            <ChevronRight className="cursor-pointer" size={28} />
          </div>
        </div>
        {/* right side */}
        <div className="flex items-center space-x-4">
          <ConnectButton />
        </div>
      </main>
    </nav>
  );
};

export default Nav;
