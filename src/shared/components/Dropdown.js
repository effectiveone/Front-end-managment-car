import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { inHTMLData } from "xss-filters";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RiCoinsLine } from "react-icons/ri";

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "column",
  },
  coinContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
  },
  currentUser: {
    transform: "translateX(100%)",
  },
});

function Dropdown({ handleLogout, open, id, anchorEl, handleClose }) {
  const sanitizedUrl = inHTMLData("/editUser");
  const classes = useStyles();
  const currentUserCoins = useSelector((state) => state.wallet.coins);

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={classes.menu}
    >
      <MenuItem component={Link} to={sanitizedUrl}>
        Profile
      </MenuItem>
      <MenuItem className={classes.coinContainer}>
        <RiCoinsLine />
        <p className={classes.currentUser}>{currentUserCoins}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}

export default Dropdown;
