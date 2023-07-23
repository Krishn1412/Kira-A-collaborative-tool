import "../styles/style1.css"
import Login from "./Login2";
import React, { useState } from "react";


const PmLogin = () => {
  const [authType, setAuthType] = useState("login");
  return (
    <>
    <div className="App">
      {authType === "login" && <Login setAuthType={setAuthType} />}
    </div>
    </>
  );
};

export default PmLogin;
