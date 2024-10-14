import React, { useContext, useState } from "react";
import { Bike, BikeIcon } from "lucide-react";
// import FacebookLogin from "../Authentication/FacebookLogin";
import { MyContext } from "../../Helper/context";
import { Link, Navigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const AuthContainerPageElements = ({
  HaveAccount,
  Auth,
  GoToAuth,
  Google,
  Href,
}) => {
  const { callFunction2 } = useContext(MyContext);
  const handleClick = () => {
    if (GoToAuth === "Sign Up") {
      callFunction2(true);
    } else if (GoToAuth === "Log In") {
      callFunction2(false);
    }
  };
  return (
    <div>
      <div className="flex items-end  -mt-1 -mb-4 ">
        <BikeIcon
          size={40}
          color="tomato"
          className="-rotate-[0deg] mb-1 mr-0"
        />
        <h1
          style={{ color: "tomato" }}
          className="text-2xl text-slate-800 font-extrabold mt-6"
        >
          ike
        </h1>

        <h1 className="text-3xl text-slate-800 font-extrabold mt-6"> Buddy</h1>
      </div>

      <div className=" d-flex-row align-items-center justify-content-center mb-7">
        <h3 className="text-[20px] text-dark pt-8 font-bold">{Auth}</h3>
        <p className="font-semibold mt-3 " style={{ fontSize: "14px" }}>
          {HaveAccount}

          <Link
            onClick={() => handleClick()}
            className="cursor-pointer hover:underline"
            style={{ color: "tomato" }}
          >
            {GoToAuth}
          </Link>
        </p>

        {Google === true ? (
          <div>
            <div className="my-6">{<GoogleLogin />}</div>
            <p className="text-center px-2 text-gray-500 font-bold  text-sm my-3">
              OR
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AuthContainerPageElements;
