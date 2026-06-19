import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [data, setData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const submit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/signup",
        data
      );

      localStorage.setItem(
        "email",
        data.email
      );

      alert("OTP Sent");

      navigate("/otp");
    } catch (err) {
  console.log("ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  alert(
    JSON.stringify(err.response?.data)
  );
}
  };

  return (
    <div className="form">
      <h1>Signup</h1>

      <input
        placeholder="Username"
        onChange={(e) =>
          setData({
            ...data,
            username:
              e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setData({
            ...data,
            email:
              e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setData({
            ...data,
            password:
              e.target.value,
          })
        }
      />

      <button onClick={submit}>
        Signup
      </button>
    </div>
  );
}

export default Signup;