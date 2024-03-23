import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
import { User } from "lucide-react";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Nav = () => {
  const navigate = useNavigate();
  const address = useAddress();
  const loginHandler = () => {
    return navigate("/login");
  };

  const disconnect = useDisconnect();

  const [position, setPosition] = React.useState("bottom");

  const logoutHandler = () => {
    disconnect();
    return <Navigate to="/" />;
  };

  return (
    <nav className="sticky inset-x-0 bg-secondary pz-2 py-3">
      <MaxWidthWrapper className="">
        <main className="flex items-center justify-between ">
          {/* Logo */}
          <div className="flex items-center space-x-4 w-full h-full">
            <img
              onClick={() => navigate("/")}
              src="/assets/logo.png"
              alt="Code Duel"
              className="w-[180px] h-[100%] cursor-pointer"
            />

            <Link
              to="/problems"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second"
              })}
            >
              Problems
            </Link>
            <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second"
              })}
            >
              Feeds
            </Link>
            <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second"
              })}
            >
              contest
            </Link>
            <Link
              to="/contest"
              className={buttonVariants({
                variant: "link",
                className: "text-sm text-second"
              })}
            >
              Contact Us
            </Link>
          </div>
          {/* right side */}
          {address ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-400">{address}</p>
              {/* dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <User
                    size={28}
                    className="text-gray-100 hover:text-primary"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max bg-third border-gray-300 text-accent ">
                  {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuItem>
                      <Link to="/accountsettings">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/addquestion">Add Question</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="">
              <Button
                onClick={loginHandler}
                className="border-b border-primary
                                 px-10 py-2"
              >
                Login
              </Button>
            </div>
          )}
        </main>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Nav;
