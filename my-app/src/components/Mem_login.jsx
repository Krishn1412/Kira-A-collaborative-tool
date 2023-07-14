import "../styles/style1.css"
import Login from "./Login3";
import Signup from "./Signup3";
import React, { useState } from "react";

export default function App() {
  const [authType, setAuthType] = useState("login");
  return (
    <div className="App">
      {authType === "login" && <Login setAuthType={setAuthType} />}
      {authType === "signup" && <Signup setAuthType={setAuthType} />}
    </div>
  );
}
