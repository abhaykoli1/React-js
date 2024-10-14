import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "../ui/button";
import GoogleLogin from "./GoogleLogin";

function Account() {
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const userId = auth.currentUser.uid;
      {
        userId ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      console.log("Autenticaton is :", isAuthenticated);
      console.log("user - Id :", userId);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());

        setRole(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);
  // console.log("role", role.role);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User  logged out successfully");
      })
      .catch((error) => {
        console.error("Error logging out user:", error);
      });
  };

  // if (!isAuthenticated) {
  //   console.log("login Page");
  // } else if (isAuthenticated && role.role === "user") {
  //   console.log("you Logged in to shop");
  // } else if (isAuthenticated && role.role === "admin") {
  //   console.log("you Logged in to admin dashboard");
  // }
  return (
    <div>
      {userDetails ? (
        <>
          <div className="flex items-center bg-dark h-40">
            <div
              className=" w-11 h-11 bg-success rounded-full flex items-center justify-center
             text-light size-20 text-2xl"
            >
              <img
                alt=""
                src={userDetails.photo}
                style={{ borderRadius: "100%" }}
              />
              {userDetails.ProfileIcon}
            </div>
            <div className="flex-col -mb-5 pl-5 text-light">
              <div className="bg-dark"></div>
              <h3 className="-mb-0"> {userDetails.firstName}</h3>
              <p> {userDetails.role}</p>
              {/* {userDetails ? setRole(userDetails.role) : null} */}
              <p>{userDetails.email}</p>
            </div>
          </div>
          {/* <div>
            <p className="text-light">First Name: {userDetails.firstName}</p>
            <p className="text-light">Last Name: {userDetails.lastName}</p>
          </div> */}
        </>
      ) : (
        <div class="spinner-grow text-success flex" role="status"></div>
      )}
      <Button onClick={() => handleLogout()}>Logout</Button>
      <div className="mt-10">
        <GoogleLogin />
      </div>
    </div>
  );
}
export default Account;
