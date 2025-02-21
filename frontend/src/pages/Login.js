import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  console.log("loginInfo->", loginInfo);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if ( !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://signup-login-app-api.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
    
      const result = await response.json();
      // const { success, message } = result;


      const { jwtToken, name, success, message } = result;

      // Store the token in localStorage
      localStorage.setItem("Token", jwtToken);
      localStorage.setItem("LoggedInUser", name);


      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (result?.error?.details) {
        const details = result.error.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter email"
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginInfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          New User<Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
