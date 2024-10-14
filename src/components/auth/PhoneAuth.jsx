import React, { useState } from "react";
import { signInWithPhoneNumber } from "firebase/auth";
import { Button } from "../ui/button";
import { auth } from "../../../firebaseConfig";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  const signIn = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
      if (confirmationResult) {
        setConfirm(confirmationResult);
      } else {
        alert("Error sending OTP");
      }
    } catch (error) {
      alert(error);
    }
  };

  const confirmCode = async () => {
    if (confirm) {
      try {
        await confirm.confirm(code);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please send OTP first");
    }
  };

  return (
    <div>
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <Button onClick={signIn}>Send OTP</Button>
      {confirm && (
        <div>
          <input
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={confirmCode}>Confirm OTP</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
