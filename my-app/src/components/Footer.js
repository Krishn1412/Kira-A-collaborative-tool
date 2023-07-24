import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: "#00106a",
    height: "50px",
    color: "#dfe9ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <span>© {new Date().getFullYear()} KIRA</span>
      <span style={{marginLeft:"200px"}}> Made with  <span role="img" aria-label="Heart">
        ❤️
      </span> by K&S </span>
    </footer>
  );
};

export default Footer;
