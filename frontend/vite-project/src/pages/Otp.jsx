import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Otp() {
  const navigate = useNavigate();

  const [otp, setOtp] =
    useState("");

  const verify = async () => {
    const email =
      localStorage.getItem(
        "email"
      );

    try {
      await axios.post(
        "http://localhost:5000/api/verifyotp",
        {
          email,
          otp,
        }
      );

      alert(
        "Account Created"
      );

      navigate("/login");
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="form">
      <h1>OTP Verification</h1>

      <input
        placeholder="Enter OTP"
        onChange={(e) =>
          setOtp(
            e.target.value
          )
        }
      />

      <button onClick={verify}>
        Verify OTP
      </button>
    </div>
  );
}

export default Otp;