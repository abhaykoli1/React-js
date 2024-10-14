import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { BikeIcon, ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Button } from "../ui/button";
import ShopHeader from "./shopHeader";
import ShopSidebar from "./shopSidebar";

function ShopLayout() {
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
        className={`flex flex-1 flex-col absolute left-0 right-0  duration-500 transition-all z-0
            ${!sidebar ? "" : "lg:left-60 "}`}
      >
        <main className="flex-1 duration-500 z-0">
          <Outlet />
        </main>
        <div className="fixed top-0 w-full right-0 backdrop-blur-xl">
          <ShopHeader
            setOpen={setSidebar}
            sidebar={sidebar}
            setSidebar={setSidebar}
          />
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
          className={` h-full lg:bg-white backdrop-blur-sm backdrop-opacity-100 fixed duration-500 transition-all  shadow-xl
            ${sidebar ? "left-0" : "-left-60 "}`}
        >
          {sidebar ? (
            <div className=" lg:bg-white h-8 w-9 absolute -right-4 top-5  rounded-md">
              <Button
                onClick={() => setSidebar(false)}
                variant="outline"
                className="h-8 w-9 !p-0  bg-transparent lg:text-black md:text-white  sm:text-white"
              >
                <ChevronLeftIcon className="h-6 w-6 " />
              </Button>
            </div>
          ) : null}

          <ShopSidebar />
        </div>
      </div>
    </div>
  );
}

export default ShopLayout;
