import { AdbOutlined, Label, PhoneEnabled, Title } from "@mui/icons-material";
import { Box, Divider, Drawer, List } from "@mui/material";
import {
  BadgeCheck,
  Bike,
  BikeIcon,
  ChartNoAxesCombined,
  Contact,
  Home,
  LayoutDashboard,
  Phone,
  Settings,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/shop/home",
    icon: <Home color="gray" />,
  },
  {
    id: "settings",
    label: "Settings",
    // path: "/admin/orders",
    icon: <Settings color="gray" />,
  },
  {
    id: "contact",
    label: "Contact Us",
    path: "#contact",
    icon: <Contact color="gray" />,
  },
];

const ShopSidebar = () => {
  const navigate = useNavigate();
  return (
    <div
      className=""
      // className="lg:bg-transparent md:bg-white sm:bg-white "
    >
      <Box sx={{ width: 240 }} role="presentation" bgcolor={""}>
        <title className="flex  items-end  mb-3 -mt-1 mx-6 ">
          <BikeIcon size={36} color="tomato" className="-rotate-[0] mb-1" />
          <h1
            style={{ color: "tomato" }}
            className="text-2xl text-slate-800 font-extrabold mt-6"
          >
            ike
          </h1>

          <h1 className="text-3xl text-slate-800 font-extrabold mt-6">
            {" "}
            Buddy
          </h1>
        </title>

        {/* <Divider className="border" /> */}
        <div className="h-screen pt-2">
          <List>
            {adminSidebarMenuItems.map((items) => (
              // <div
              //   onClick={() => {
              //     navigate(items.path);
              //   }}
              //   key={items.id}
              //   disablepadding="true"
              //   className="flex cursor-pointer text-xl items-center gap-5 rounded-md px-3
              //  py-3 hover:bg-gray-100 hover:text-slate-100 mx-4"
              // >
              <a
                onClick={() => {
                  navigate(items.path);
                }}
                href={items.path}
                key={items.id}
                disablepadding="true"
                className="flex cursor-pointer text-xl items-center rounded-md px-3 
                py-3 hover:bg-gray-100 hover:text-slate-100 mx-4"
              >
                {items.icon}
                <label className="text-gray-500 pl-5">{items.label}</label>
              </a>
              // </div>
            ))}
          </List>
        </div>
      </Box>
    </div>
  );
};

export default ShopSidebar;
