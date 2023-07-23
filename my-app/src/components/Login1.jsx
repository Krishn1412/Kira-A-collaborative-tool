import React, { useRef, useState, useEffect } from "react";
import { get, isEmpty, set } from "lodash-es";
import axios from 'axios';
import { Avatar, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { indigo, red } from "@mui/material/colors";
import PropTypes from "prop-types";
import {  useNavigate } from "react-router-dom";

async function validate(refs, form) {
  for (const [attribute, ref] of Object.entries(refs.current)) {
    var errors;
    if (ref.validate) {
      errors = await ref.validate(get(form, attribute));
    }
    if (!isEmpty(errors)) {
      console.log(errors);
      return false;
    }
  }
  return true;
}

export default function Login(props) {
  const { setAuthType, } = props;
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState();
  const [showError, setError] = useState(false);
  const navigate = useNavigate();
  const refs = useRef({});

  const updateForm = (attribute, value) => {
    const copy = { ...form };
    set(copy, attribute, value);
    setForm(copy);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ok = await validate(refs, form);
    if (!ok) {
      return;
    }
    const api_body = {
      "username": form.email,
      "password": form.password
    }
    const apiUrl = 'http://localhost:4000/api/v1/login/em';
    console.log("hehe");
    // Make the API call using Axios


    try {
      const response = await axios.post(apiUrl, api_body);
      // Handle the response from the API if needed
      console.log('Response:', response.data);
      const { user, token } = response.data;
      console.log(user.username, user.password, token);
      const emInfo = {
        username: user.username,
        userid: user._id,
        token: token,
      };
      const emInfoString = JSON.stringify(emInfo);
      document.cookie = `emInfo=${emInfoString}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      navigate( "/EM_Dashboard",{ 
        state: {
          username: user.username,
          password: user.password,
          token: token, // Add the cookie value if available
        },
      });
      
    } catch (error) {
      setError(true);
      // Handle errors if the request fails
      console.error('Error:', error);
    }
    console.log(form);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    {showError && <div style={{ color: "red" }}>Invalid username or password</div>}
      <div style={{ width: "60%" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Avatar style={{ backgroundColor: red[500], color: "white" }}>
              <LockOutlined />
            </Avatar>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Log In</h2>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={get(form, "email", "")}
            onChange={(event) => updateForm("email", event.target.value)}
            inputRef={(ref) => (refs.current.email = ref)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={get(form, "password", "")}
            onChange={(event) => updateForm("password", event.target.value)}
            inputRef={(ref) => (refs.current.password = ref)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
              style: {
                paddingRight: 0
              }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "8px" }}
          >
            Log In
          </Button>
        </form>
        <div>
          <Button
            onClick={() => console.log("Forgot Password")}
            style={{
              textTransform: "initial",
              marginTop: "16px",
              color: indigo[500]
            }}
          >
            Forgot Password?
          </Button>
        </div>
        <div>
          <Button
            onClick={() => setAuthType("signup")}
            style={{
              textTransform: "initial",
              color: indigo[500]
            }}
          >
            Don't have an account?
          </Button>
        </div>
        {/* <div style={{ marginTop: "16px" }}>{JSON.stringify(form, null, 2)}</div> */}
      </div>
    </div>
  );
}

Login.propTypes = {
  setAuthType: PropTypes.func
};
