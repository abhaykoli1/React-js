import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Menu, CircleChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { toast } from "@/hooks/use-toast";

const AdminHeader = ({ setOpen }) => {
  const [change, setChange] = useState(false);
  function handler() {
    setChange(!change);
    setOpen(!change);
  }

  async function handleLogout() {
    try {
      setTimeout(() => {
        auth.signOut();
        window.location.href = "/auth/login";
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

  return (
    <header
      className={`flex items-center justify-between px-4 py-3 bg-white border-b  h-16
    ${setOpen ? "" : "-translate-x-60"} 
    
    `}
    >
      <span></span>
      <div>
        <div className="flex flex-1 justify-end">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-transparent text-black inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-md  "
          >
            <LogoutOutlined />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
