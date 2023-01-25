import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { RiCoinsLine } from "react-icons/ri";
import { sanitizedUrl } from "../../api";

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
    transform: "translateX(10%)",
  },
});

function Dropdown({
  handleLogout,
  open,
  id,
  anchorEl,
  handleClose,
  currentUserCoins,
}) {
  const classes = useStyles();

  return (
    <Menu
      id={id}
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{ square: true }}
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
      <MenuItem component={Link} to={sanitizedUrl.editUser}>
        Profile
      </MenuItem>
      <MenuItem
        className={classes.coinContainer}
        component={Link}
        to={sanitizedUrl.MyWallet}
      >
        <RiCoinsLine />
        <p className={classes.currentUser}>{currentUserCoins.coins}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}

export default Dropdown;
