import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { inHTMLData } from "xss-filters";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  menu: {
    display: "flex",
    flexDirection: "column",
  },
});

function Dropdown({ handleLogout, open, id, anchorEl, handleClose }) {
  const sanitizedUrl = inHTMLData("/editUser");
  const classes = useStyles();

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
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );
}

export default Dropdown;
