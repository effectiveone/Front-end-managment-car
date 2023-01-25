import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { initializeWallet } from "../../store/actions/walletActions";
import { AiOutlineMenu } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useHistory, Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { inHTMLData } from "xss-filters";
import useDrawer from "../utils/hooks/useDrawer";

export default function Navbar({ className }) {
  const { open, DrawerToogle } = useDrawer();

  let history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.userDetails);

  const sanitizedUrlDashboard = inHTMLData("/dashboard");
  const currentUserCoins = useSelector((state) => state.wallet.coins);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  const { logout } = getActions(dispatch);
  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const opendropdown = Boolean(anchorEl);
  const id = opendropdown ? "simple-popover" : undefined;

  const inputElement = useRef();
  useEffect(() => {
    dispatch(initializeWallet(localUser.mail));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
      className={className}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "green",
          }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={DrawerToogle}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <AiOutlineMenu />
            </IconButton>

            <Typography
              component={Link}
              to={sanitizedUrlDashboard}
              variant="h6"
              noWrap
            >
              My App
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            Welcome, {currentUser?.username}
            <IconButton
              ref={inputElement}
              aria-label="account of current user"
              aria-controls={id}
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Dropdown
              handleLogout={handleLogout}
              open={opendropdown}
              id={id}
              anchorEl={anchorEl}
              handleClose={handleClose}
              currentUserCoins={currentUserCoins}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
