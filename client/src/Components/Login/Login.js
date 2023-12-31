import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import axios from "axios";
import Cookies from "js-cookie";
import lback from "../../Assets/logback.jpg";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      console.log(response)
      if (response.data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate(location.state || "/discussionforum");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect username or password",
          timer: 3000,
          timerProgressBar: true,
        });
      }
      Cookies.set("authToken", response.data.token, { expires: 70000 });
    } catch (error) {
      console.log(error);
    }
    console.log(email, password);
  };
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:1947/auth/google/callback";
  };

  return (
    <main
      style={{
        backgroundImage: `url(${lback})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className="login-box">
        <div className="container">
          <p className="animated">Login Now</p>
        </div>
        <form onSubmit={HandleLogin}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email "
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button type="submit" id="Submit" className="submit">
            LOGIN
          </button>
          Or login with
          <button onClick={handleGoogleAuth} className="google-auth">
            <FcGoogle /> Google
          </button>
          <div className="signin">
            <p>Don't have an Account? &nbsp; </p>
            <Link style={{ color: "blue" }} to="/signup">
              {" "}
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};
