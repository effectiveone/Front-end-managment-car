import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LoginPage from "../../authPages/LoginPage/LoginPage";
import { useLocation } from "react-router-dom";
import { Container, CssBaseline } from "@material-ui/core";
import clsx from "clsx";
import useStyles from "../../style";
import { useTheme } from "@material-ui/core/styles";
import useDrawer from "../utils/hooks/useDrawer";
import DrawerComponent from "./DrawerComponent";

function Layout({ children }) {
  const user = useSelector((state) => state?.auth?.userDetails);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const theme = useTheme();
  const classes = useStyles(theme);
  const location = useLocation();

  const { open, handleDrawerOpen, handleDrawerClose, DrawerToogle } =
    useDrawer();

  return (
    <>
      <CssBaseline />
      {user ?? localUser ? (
        <>
          <DrawerComponent />

          <div
            className={clsx(classes.navbar, {
              [classes.navbarOpen]: !open,
              [classes.navbarClose]: open,
            })}
          >
            <Navbar
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
              open={open}
            />
          </div>
          <Container
            className={clsx(classes.content, {
              [classes.contentOpen]: !open,
              [classes.contentClose]: open,
            })}
          >
            {children}
          </Container>
        </>
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </>
  );
}

export default Layout;
