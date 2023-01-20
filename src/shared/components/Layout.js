import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LoginPage from "../../authPages/LoginPage/LoginPage";
import { Link, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { MdAddCircleOutline } from "react-icons/md";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import styled from "@material-ui/styles/styled";
import { Container, CssBaseline } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "green",
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    backgroundColor: "green",

    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: "green",

    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  navbar: {
    flexGrow: 1,
  },
  navbarClose: {
    // width: `calc(100% - 300px)`,
    width: "100%",

    marginRight: "-10px",
    paddingLeft: "300px",
  },
  navbarOpen: {
    width: "100%%",
    paddingLeft: "70px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentClose: {
    width: `calc(100% - 300px)`,
    marginRight: "-10px",
  },
  contentOpen: {
    width: "100%",
    marginRight: "-10px",
  },
}));

function Layout({ children }) {
  const user = useSelector((state) => state?.auth?.userDetails);
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const DrawerToogle = () => {
    setOpen(!open);
  };

  return (
    <>
      <CssBaseline />
      {user ? (
        <>
          <Drawer
            variant="permanent"
            open={open}
            anchor="left"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={DrawerToogle}>
                {open ? (
                  <BsChevronDoubleLeft size={20} />
                ) : (
                  <BsChevronDoubleRight size={20} />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {user.isAdmin && (
                <>
                  <ListItem button component={Link} to="/addVehicle">
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Car" />
                  </ListItem>
                  <ListItem button component={Link} to="/AddNewAnnouncement">
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add New Announcement" />
                  </ListItem>
                </>
              )}
            </List>
          </Drawer>
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
