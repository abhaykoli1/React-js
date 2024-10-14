import React, { useContext } from "react";
import { MyContext } from "../../Helper/context";
import AuthLogin from "../../pages/auth/login";
import AuthRegister from "@/pages/auth/register";

const AuthLayout = () => {
  const { openAuth } = useContext(MyContext);
  return (
    <div
      id="AuthCon"
      className="bg-dark h-screen"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        backgroundColor: "whitesmoke",
      }}
    >
      <div
        className={`z-2 absolute left-0 duration-500 bg-light md:w-96 lg:w-96 w-full
            ${openAuth ? "-translate-x-full" : ""}
            `}
      >
        <AuthLogin />
      </div>

      <div className="lg:w-full h-full pl-96 ">
        {/* <Image src={Home} width={"800px"} /> */}
      </div>

      <div
        className={`z-2 duration-500 md:w-96 lg:w-96 w-full
          absolute left-0 
           ${openAuth ? " " : "-translate-x-full"}
          `}
      >
        <AuthRegister />
      </div>
    </div>
  );
};

export default AuthLayout;
