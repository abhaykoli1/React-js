import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";

import { FcGoogle } from "react-icons/fc";
function GoogleLogin() {
  const { toast } = useToast();

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      // console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          userName: user.displayName,
          avtar: user.photoURL,
          role: "user",
        });
        await getDoc(doc(db, "Users", user.uid), {});
        console.log("adminEmail :", user.email);
        toast({
          description: "User logged in Successfully",
        });
      }
    });
  }
  return (
    <div>
      <Button
        onClick={googleLogin}
        variant="outline"
        className="w-full h-12 shadow-lg bg-slate-100 hover:!border-gray-500 active:outline-none after:border-none"
      >
        <FcGoogle size={28} />
        <p className="pl-2 text-[16px] font-semibold">Google Login</p>
      </Button>
    </div>
  );
}
export default GoogleLogin;
