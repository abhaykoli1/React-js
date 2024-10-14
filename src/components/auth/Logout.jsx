import { LogoutOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { useToast } from "@/hooks/use-toast";

function LogoutButton() {
  const [isLoading, setIsLoading] = useState();
  const { toast } = useToast();
  async function handleLogout() {
    setIsLoading(!isLoading);
    try {
      setTimeout(() => {
        auth.signOut();
        window.location.href = "/shop";
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
    <div>
      {/* {!isLoading ? ( */}
      <div
      // onClick={handleLogout}
      >
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-transparent outline-black text-black inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogoutOutlined />
          Logout
        </Button>
      </div>
      {/* ) : null} */}
      {/* // <LoadingButton /> */}
    </div>
  );
}

export default LogoutButton;
