import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleChevronLeft,
  Menu,
  MenuIcon,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Button } from "../ui/button";

function AdminLayout() {
  const [sidebar, setSidebar] = useState(true);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const islargeScreen = useMediaQuery({ query: "(max-width: 1023px)" });

  useEffect(() => {
    {
      isSmallScreen
        ? setSidebar(false)
        : islargeScreen
        ? setSidebar(true)
        : null;
    }
  }, [isSmallScreen, islargeScreen]);

  return (
    <div className="flex min-h-screen w-full ">
      <div
        className={`flex flex-1 flex-col absolute left-0 right-0  duration-500 transition-all z-0 bg-whitesmoke 
      ${!sidebar ? "" : "lg:left-60 "}`}
      >
        <main className="mt-16 flex-1 left-0 flex-col flex  p-4 md:p-6 duration-500 z-0 ">
          <Outlet />
        </main>

        {/* header  */}
        <div className="fixed top-0 w-full right-0  bg-light">
          <AdminHeader setOpen={setSidebar} />
        </div>
        {sidebar ? (
          <div
            onClick={() => setSidebar(false)}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className={`
          ${
            isSmallScreen
              ? "w-full h-screen fixed right-0 top-0 bottom-0 duration-500 transition-all"
              : ""
          }`}
          />
        ) : null}

        <div
          className={` h-full bg-white fixed duration-500 transition-all border-r 
      ${sidebar ? "left-0" : "-left-60 "}`}
        >
          {sidebar ? (
            <Button
              onClick={() => setSidebar(false)}
              variant="outline"
              className="h-8 w-9 !p-0 absolute -right-5 top-4 shadow-md border-gray-300"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
          ) : (
            <Button
              onClick={() => setSidebar(true)}
              variant="outline"
              className=" px-1  absolute -right-14 top-3 shadow-sm border-gray-300"
            >
              <MenuIcon size={33} color="black" />
            </Button>
          )}

          <AdminSidebar />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
