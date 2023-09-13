import React, { useRef, useState } from "react";
import "./login.css";
import Room from "@mui/icons-material/Room";
import Cancel from "@mui/icons-material/Cancel";

import axios from "axios";

function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        "https://traveler-api.up.railway.app/api/users/login",
        user
      );
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        Ser-Dev
        <Room />
        TRAVELER
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User 
        Name"
          ref={nameRef}
        />

        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="loginBtn">Login</button>

        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}

export default Login;
