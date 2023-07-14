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
import B from "./B"
import C from "./C"
import Header from "./Header"
import { BrowserRouter, Routes, Route } from "react-router-dom";

let App = () => {
    return (
        <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route path="blogs" element={<B />} />
          <Route path="contact" element={<C />} />
        </Route>
      </Routes>
    </BrowserRouter>
        </>
    );
}


export default App;
