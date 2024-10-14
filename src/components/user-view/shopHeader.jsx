import React, { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "../auth/Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  BikeIcon,
  LogIn,
  LogOut,
  Map,
  MapPinned,
  MenuIcon,
  Phone,
  PhoneCallIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { auth } from "../../../firebaseConfig";
import { Button } from "../ui/button";
import { MyContext } from "@/Helper/context";

const ShopHeader = ({ setOpen, setSidebar, sidebar }) => {
  const { toast } = useToast();

  console.log("sidebar", sidebar);
  async function handleLogout() {
    try {
      setTimeout(() => {
        auth.signOut();
        window.location.href = "/auth";
      }, 2000);
      toast({
        title: "Have a nice day sir,",
        description: "User logged out Successfully",
      });
      console.log("User logged out successfully!");
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There's a server problem",
      });
      console.error("Error logging out:", error.message);
    }
  }

  function handleLogin() {
    console.log("dome");
    // return <Navigate to={"/auth"} />;
    window.location.href = "/auth/login";
  }
  const [user, setUser] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <header className="header flex items-center justify-between px-4 py-3 backdrop-blur-sm  shadow-lg">
      {sidebar === true ? null : (
        <div className="flex">
          <Button variant="outline" className="px-1 bars bg-transparent ">
            <MenuIcon
              onClick={() => setSidebar(true)}
              size={36}
              color="#fff"
              className=""
            />
          </Button>
          <title className="flex items-end px-2 -mt-3 logo ">
            <BikeIcon size={35} color="tomato" className="-rotate-[0]  pb-1" />
            <h1
              style={{ color: "tomato" }}
              className="text-2xl text-slate-800 font-extrabold"
            >
              ike
            </h1>

            <h1 className="text-3xl text-slate-800 font-extrabold">Buddy</h1>
          </title>
        </div>
      )}
      <span></span>
      <div className="flex items-center">
        <div className="mr-7 reachUs">
          <a
            href="#contact"
            className=" cursor-pointer  hover:text-orange-600 hover:underline flex gap-1"
          >
            <MapPinned size={21} className="" />
            Reach us
          </a>
        </div>
        <div className="flex flex-1 justify-end">
          <DropdownMenu>
            <div>
              {!user ? (
                <Button
                  onClick={() => handleLogin()}
                  variant="outline"
                  className="h-10 text-[16px] px-4 "
                >
                  <LogIn size={20} />
                  <p className="pl-2">Login</p>
                </Button>
              ) : (
                <div>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-10 w-10 avtar">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="w-56 mt-5">
                    <DropdownMenuLabel>Hi, Abhay</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLogout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              )}
            </div>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
