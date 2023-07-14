import "../styles/style1.css"
import Login from "./Login2";
import Signup from "./Signup2";
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
