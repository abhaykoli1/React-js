import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { Form } from "react-bootstrap";
import AuthContainerPageElements from "../../components/auth/AuthContainerPageElements";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function AuthRegister() {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          // ProfileIcon: pIcon,
          userName: userName,
          email: user.email,
          avtar: userName[0].toUpperCase(),
          role: "user",
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  // const handleFnameChange = (e) => {
  //   const Name = e.target.value;
  //   setPIcon(Name.charAt(0));
  //   // let i = 0;
  //   // for (i; i < Name.length; i++) {
  //   //   setPIcon(Name[0]);
  //   //   console.log("Letter", Name[0]);
  //   console.log("Profile Letter", pIcon);
  //   // }
  // };

  return (
    <section
      style={{ height: "100vh" }}
      id="signUpPage"
      className="h-full  bg-white shadow-md px-5 pt-10"
    >
      <AuthContainerPageElements
        HaveAccount={"Already have an Account? "}
        Auth={"SIGN UP"}
        GoToAuth={"Log In"}
        Google={false}
      />
      <div className="mt-4">
        <Form onSubmit={handleRegister}>
          <div className="mb-3">
            <Label className="label">User Name</Label>
            <Form.Group>
              <Input
                type="text"
                className="form-control"
                placeholder="First name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Label className="label">Email address</Label>
            <Form.Group>
              <Input
                size="lg"
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Label className="label">Password</Label>
            <Form.Group>
              <Input
                style={{
                  paddingLeft: "14px",
                  paddingTop: "11px",
                  paddingBottom: "11px",
                }}
                type="password"
                className="text-red-400"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Label className="label">Confirm</Label>
            <Form.Group>
              <Input
                style={{
                  paddingLeft: "14px",
                  paddingTop: "11px",
                  paddingBottom: "11px",
                }}
                type="password"
                className="form-control"
                placeholder="Confirm Your Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="d-grid">
            <Button
              type="submit"
              variant="outline"
              className="w-full h-12 shadow-lg bg-orange-600 duration-500 hover:bg-gray-700 hover:!border-gray-500 active:outline-none after:border-none"
            >
              <p className="pl-2 text-[16px] font-semibold text-white ">
                SIGN UP
              </p>
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
}
export default AuthRegister;

/* <Form.Group controlId="photo">
                      <Form.Label id="InputLabel">Photo</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setPhoto(e.target.files)}
                      />
                      {photo && (
                        <Image
                          src={URL.createObjectURL(photo)}
                          alt="Uploaded Photo"
                        />
                      )}
                    </Form.Group> */

/* <div className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Group>
            <Form.Control
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
              />
          </Form.Group>
        </div> */
