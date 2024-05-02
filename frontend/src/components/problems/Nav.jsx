import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import {
  WalletConnectButton,
  WalletDisconnectButton,
} from "@tronweb3/tronwallet-adapter-react-ui";
import { User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const Nav = () => {
  const navigate = useNavigate();
  const { address, disconnect, connect } = useWallet();

  const walletAddress =
    address && address.slice(0, 5) + "..." + address.slice(address.length - 4);

  const [position, setPosition] = useState("bottom");

  if (!address) {
    toast.info("Please Connect Your Wallet", {
      position: "bottom-right",
      duration: 2500,
      className:
        "flex items-center justify-center p-6 border-2 rounded-md shadow-lg bg-blue-50 text-blue-700 dark:bg-blue",
    });

    setTimeout(() => {
      navigate("/");
    }, 2500);
  }

  return (
    <nav className="pz-2 sticky inset-x-0 bg-black py-5">
      <Toaster />
      <MaxWidthWrapper className="">
        <main className="flex items-center justify-between ">
          {/* Logo */}
          <div className="flex h-full w-full items-center space-x-4">
            <img
              onClick={() => navigate("/")}
              src="/assets/logo1.png"
              alt="Code Duel"
              className="mr-4 h-[100%] w-[140px] cursor-pointer"
            />

            {/* <Link
              to="/problems"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second",
              })}
            >
              Problems
            </Link> */}
            {/* <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second",
              })}
            >
              Feeds
            </Link>
            <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second",
              })}
            >
              contest
            </Link>
            <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second",
              })}
            >
              Contact Us
            </Link> */}
          </div>
          {/* right side */}
          {address ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">{walletAddress}</p>
              {/* dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <User
                    size={28}
                    className="text-gray-100 hover:text-primary"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max border-gray-300 bg-third text-accent ">
                  {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuItem>
                      <Link to="/myquestion">My Questions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/addquestion">Add Question</Link>
                    </DropdownMenuItem>
                    <WalletDisconnectButton />
                    {/* <DropdownMenuItem onClick={()=>disconnect()}>
                      Disconnect
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="">
              <WalletConnectButton />
            </div>
          )}
        </main>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Nav;
