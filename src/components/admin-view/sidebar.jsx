import { Label, Title } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  BadgeCheck,
  Bike,
  ChartNoAxesCombined,
  LayoutDashboard,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard color="gray" />,
  },
  {
    id: "rides",
    label: "Rides",
    path: "/admin/rides",
    icon: <Bike color="gray" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck color="gray" />,
  },
];

const AdminSidebar = ({ sidebar }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ width: 240 }} role="presentation" bgcolor={""}>
      <title className="flex gap-2 items-end    mt-4  pb-4  mx-4 z-20">
        <ChartNoAxesCombined size={30} color="black" />
        <h1 className="text-[26px] text-black font-medium">Admin Panel</h1>
      </title>
      <List>
        {adminSidebarMenuItems.map((items) => (
          <div
            onClick={() => {
              navigate(items.path);
            }}
            key={items.id}
            disablepadding="true"
            className="flex cursor-pointer text-xl items-center rounded-md px-3 
               py-3 hover:bg-gray-100 hover:text-slate-100 mx-4"
          >
            {/* <ListItemButton> */}
            {items.icon}
            <label className="pl-5 text-gray-500 ">{items.label}</label>
            {/* </ListItemButton> */}
          </div>
        ))}
        {/* <Divider className="text-white " /> */}
      </List>
    </Box>
  );
};

export default AdminSidebar;
