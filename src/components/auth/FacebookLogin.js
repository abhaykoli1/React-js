// import { FacebookAuthProvider, signInWithPopup } from "@firebase/auth";
import React from "react";
import { FacebookLoginButton } from "react-social-login-buttons";
import { toast } from "react-toastify";
// import { auth, db } from "../Firebase/firebaseConfig";
// import { doc, setDoc } from "firebase/firestore";
// import { BiBorderRadius } from "react-icons/bi";

const FacebookLogin = () => {
  // function facebookLogin() {
  //   const provider = new FacebookAuthProvider();
  //   signInWithPopup(auth, provider).then(async (result) => {
  //     console.log(result);
  //     const user = result.user;
  //     if (result.user) {
  //       await setDoc(doc(db, "Users", user.uid), {
  //         email: user.email,
  //         firstName: user.displayName,
  //         photo: user.photoURL,
  //         lastName: "",
  //       });
  //       toast.success("User logged in Successfully", {
  //         position: "top-center",
  //       });
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 3000);
  //     }
  //   });
  // }
  return (
    <div className="pt-2">
      <FacebookLoginButton
        size="50px"
        className="d-flex align-items-center justify-content-center rounded-full"
        // onClick={facebookLogin}
        onClick={() =>
          toast.success("FaceBook Login", {
            position: "top-center",
          })
        }
      >
        <span>Facebook</span>
      </FacebookLoginButton>
    </div>
  );
};

export default FacebookLogin;
