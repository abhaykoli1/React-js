import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { Form } from "react-bootstrap";
import AuthContainerPageElements from "../../components/auth/AuthContainerPageElements";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import PhoneAuth from "@/components/auth/PhoneAuth";

function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // Signed in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login", user);

        console.log("User logged in Successfully ", email);
        toast({
          description: "User logged in Successfully",
        });
      })
      .catch((error) => {
        setError(true);
        console.log(error.message);
        toast({ description: "Invalid Credentials" });
      });
  };

  if (Error) {
    setTimeout(() => {
      setIsLoading(false);
      setError(false);
    }, 2000);
  }

  return (
    <section
      style={{ height: "100vh" }}
      id="LoginPage"
      className="h-full bg-light px-5 pt-10 bg-white shadow-md"
    >
      <AuthContainerPageElements
        HaveAccount={"Create a new Account? "}
        Auth={"LOG IN"}
        GoToAuth={"Sign Up"}
        Google={true}
        // Href={"SignUp"}
      />
      {/* <PhoneAuth /> */}
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label className="label">Email</Label>
          <Form.Group>
            <Input
              className="py-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </Form.Group>
        </div>

        <div className="mb-3">
          <Label className="label">Password</Label>
          <Form.Group>
            <Input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <p className="font-semibold text-sm hover:text-orange-500 text-end mt-1 mb-2">
            <a href="#Home">Forget password?</a>
          </p>
        </div>
        <div className=" text-center w-full mb-9">
          {!isLoading === true ? (
            <Button
              type="submit"
              variant="outline"
              className="w-full h-12 shadow-lg text-white hover:text-[#333] bg-gray-800 hover:bg-gray-700 duration-500 hover:!border-gray-500 active:outline-none after:border-none"
            >
              <p className="pl-2 text-[16px] font-semibold "> LOGIN</p>
            </Button>
          ) : (
            <div>
              <Button
                variant="outline"
                className="w-full h-12 shadow-lg  bg-gray-800 hover:bg-gray-700 hover:!border-gray-500 active:outline-none after:border-none"
                disabled
              >
                <ReloadIcon
                  color="white"
                  className="mr-2 h-4 w-4 animate-spin"
                />
                <span className="ml-2 text-[16px] text-white">Loading...</span>
              </Button>
              {Error ? (
                <span className="text-red-600 duration-500">
                  Invalid Credentials! please try again
                </span>
              ) : null}
            </div>
          )}
        </div>
      </Form>
    </section>
  );
}

export default AuthLogin;
