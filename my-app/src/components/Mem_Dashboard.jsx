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
import AssignTicket from "./Assign_ticket"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Board from "./Simp_view";


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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 100px;
`;

const CardWrapper = styled.div`
  margin-bottom: 60px;
  @media (min-width: 768px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (min-width: 992px) {
    flex: 0 0 33.33%;
    max-width: 33.33%;
  }
`;

const Card = styled.div`
  padding: 16px;
  margin: 20px;
  background: ${(props) => props.theme.white};
  height: 100%;
  position: relative;
  border: none;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.15);
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  h3.card-title {
    font-weight: 700;
    font-size: 1.2rem;
    color: ${(props) => props.theme.darkPurple};
  }

  p {
    color: ${(props) => props.theme.lightPurple};
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 40px;
  }

  .card-link {
    position: absolute;
    bottom: 10px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }

  .card-icon {
    width: 40px;
    margin-bottom: 6px;
    position: relative;
    top: 0;
    left: -8px;
  }
`;



const handleit = () =>{
  document.cookie = `userInfo=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// const cookies = document.cookie;
  // console.log(cookies);

const MMD = () => {
  const classes = useStyles();
  const [isOpened, setIsOpened] = useState(false);
  
  return (
    <div className={classes.root}>
         <AppBar className={classes.appBar}>
           <Toolbar>
             <IconButton
              color="inherit"
              onClick={() => setIsOpened(!isOpened)}
              className={classes.icon}
            >
              {isOpened ? (
                <ChevronLeftIcon />
              ) : (
                <MenuIcon />
              )}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Member Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <div className={classes.container}>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawer, {
                [classes.closed]: !isOpened,
                [classes.opened]: isOpened,
              }),
            }}
          >
            <Button
              className={classes.button}
              component={Link}
              to="/Mem_Dashboard"
              onClick={() => setIsOpened(false)} // Close the drawer after clicking the button
            >
              Dashboard
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/update_ticket"
              onClick={() => setIsOpened(false)} // Close the drawer after clicking the button
            >
              Update Tickets
            </Button>
            <Button
              className={classes.button}
              component={Link}
              to="/"
              onClick={handleit}
            >
              Logout
            </Button>
          </Drawer>
          <main className={classes.main}>
            
          <Board/>

      </main>
        </div>
        <div className={classes.footer}>
          <Typography variant="h6">Footer</Typography>
        </div>
      </div>
  );
};

export default MMD;
