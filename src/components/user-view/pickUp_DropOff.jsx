import React from "react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

const Pick_Drop = () => {
  return (
    <div className="backdrop-blur-3xl lg:backdrop-blur-lg lg:border-[0.5px] lg:text-white  w-full flex-1 rounded-xl p-4 shadow-lg">
      <p className="font-semibold xl:text-[2vw] lg:text-[2.5vw] mb-4 ">
        Book Your Ride
      </p>
      <p className="font-semibold xl:text-[1.2vw] lg:text-[1.8vw] lg:mb-2 md:pb-1 ">
        Pick UP
      </p>
      <div className="flex">
        <Input className="w-full mb-4 ring-0" type="date" />
        <Input className="w-full mb-4 flex " type="time" />
      </div>
      <h3 className="font-semibold xl:text-[1.2vw] lg:text-[1.8vw] mb-2">
        Drop Off
      </h3>
      <Input className="w-full" />
    </div>
  );
};

export default Pick_Drop;
