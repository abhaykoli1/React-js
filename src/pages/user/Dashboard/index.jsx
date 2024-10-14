import React from "react";

import UserReviews from "./reviews";
import Footer from "./footer";
import ContactForm from "./contact";
import Account from "@/components/auth/Account";
import Home from "./home";
import Slider from "./swiper";
import Pick_Drop from "@/components/user-view/pickUp_DropOff";

const UserDashboard = () => {
  return (
    <div className=" absolute top-0 right-0 left-0 bottom-0 ">
      <main
        className=""
        // className="bg-cover bg-top bg-[url('https://firebasestorage.googleapis.com/v0/b/auth-a50c2.appspot.com/o/Slider%2FBikeSlide1.jpg?alt=media&token=df644894-8b1d-4517-93d9-50950d503dfe')]"
      >
        <Home />
        <div className="relative md:h-40 lg:h-0 sm:h-40 bg-whitesmoke ">
          <div className="lg:hidden md:flex sm:flex md:px-16 sm:px-10 px-4 pt-4 md:absolute sm:absolute  w-full md:-top-20 sm:-top-24">
            <Pick_Drop />
          </div>
        </div>
        <UserReviews />
        <ContactForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserDashboard;
