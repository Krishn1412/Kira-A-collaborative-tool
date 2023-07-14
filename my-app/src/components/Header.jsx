import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      color: "#00106a",
    },
    appBar: {
      background: "#9AC5F4",
      color: "#dfe9ff",
    },
    icon: {
      padding: "10px",
    },
    title: {
      margin: "auto",
    },
    container: {
      display: "flex",
      flex: 1,
    },
    drawer: {
      background: "#fffff",
      position: "static",
      transition: "width .7s",
    },
    closed: {
      width: "0px",
    },
    opened: {
      width: "240px",
    },
    main: {
      flex: 1,
      background: "#f7faff",
      color: "#00106a",
    },
    footer: {
      background: "#00106a",
      height: "50px",
      color: "#dfe9ff",
    },
    button: {
      margin: "10px 0px",
      padding: "12px 24px",
      background: "#fffff",
      color: "#00106a",
      border: "0px solid #00106a",
      borderRadius: "4px",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#00106a",
        color: "#dfe9ff",
        cursor: "pointer",
      },
    },
  }));
const Layout = () => {
    const classes = useStyles();
    const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add_ticket">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;