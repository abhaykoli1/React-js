import {
  Facebook,
  Instagram,
  Mail,
  Map,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const footer = [
  {
    id: 1,
    title: "BIKE BUDDY",
    item1Icon: <Mail />,
    item1: "BikeRental@domain.com",
    item2Icon: <Phone />,
    item2: "000-000-0000",
    item3Icon: "",
    item3: "",
  },

  {
    id: 2,
    title: "Polices",
    item1Icon: "",
    item1: "Privacy Policy",
    item2Icon: "",
    item2: "Terms & Conditions",
    item3Icon: "",
    item3: "",
  },
  {
    id: 3,
    title: "Company",
    item1Icon: "",
    item1: "About Us",
    item2Icon: "",
    item2: "Blog",
    item3Icon: "",
    item3: "",
  },
];
const Socials = [
  {
    link: "",
    icon: <Facebook />,
  },
  {
    link: "",
    icon: <Instagram />,
  },
  {
    link: "",
    icon: <Twitter />,
  },
];

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className=" bg-[#333] text-white flex items-center justify-center ">
      <div className=" flex-1 gap-7 justify-between ">
        <div class=" grid md:grid-cols-3 sm:grid-cols-2 lg:gap-16 lg:grid-cols-3 lg:px-5 md:px-4 sm:px-3 px-3 py-3">
          {footer.map((items, index) => (
            <div key={index} className="my-2">
              <h3 className="text-[18px] font-semibold  pb-2 uppercase">
                {items.title}
              </h3>
              <p className="border-1 w-44 mb-3  border-orange-500"></p>

              {/* /// */}
              <div className=" cursor-pointer lg:text-lg md:text-md text-sm font-thin text-white hover:text-orange-500">
                <p className="flex gap-2 mb-1.5">
                  {items.item1Icon}
                  {items.item1}
                </p>
                <p className="flex gap-2 mb-1.5 ">
                  {items.item2Icon}
                  {items.item2}
                </p>
                <p className="flex  gap-1 mb-1.5">
                  {items.item3Icon}
                  {items.item3}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* // */}
        <div className="bg-orange-500 h-28 w-full flex justify-center items-center">
          <div className="">
            <div className="flex-1 text-center font-semibold">
              &copy; 2022 Corporate. All Right Reserved.
            </div>
            <div className="mt-3 text-white flex gap-5 items-center justify-center">
              {Socials.map((items, index) => (
                <div className="" key={index}>
                  <div className="">{items.icon}</div>
                </div>
              ))}
            </div>
          </div>

          {showTopBtn && (
            <div
              className="flex bg-[#333] text-white justify-center items-center lg:h-12 lg:w-12 md:h-12 md:w-12 h-10 w-10 fixed right-5 bottom-5 rounded z-999"
              onClick={goTop}
            >
              <ChevronUp size={32} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
