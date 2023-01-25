import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import LoginPage from "../../authPages/LoginPage/LoginPage";
import { Link, useLocation } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { MdAddCircleOutline } from "react-icons/md";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Container, CssBaseline } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { sanitizedUrl } from "../../api";
import useStyles from "../../style";
import { useTheme } from "@material-ui/core/styles";

function Layout({ children }) {
  const user = useSelector((state) => state?.auth?.userDetails);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const theme = useTheme();
  const classes = useStyles(theme);
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
      {user ?? localUser ? (
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
              {(user?.isAdmin ?? localUser?.isAdmin) && (
                <>
                  <ListItem button component={Link} to={sanitizedUrl.Vehicle}>
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Car" />
                  </ListItem>
                  <ListItem button component={Link} to={sanitizedUrl.Task}>
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add task" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to={sanitizedUrl.Announcement}
                  >
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Add Announcement" />
                  </ListItem>
                  <ListItem
                    button
                    component={Link}
                    to={sanitizedUrl.AdminTaskTable}
                  >
                    <ListItemIcon>
                      <MdAddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="Task inspection" />
                  </ListItem>
                </>
              )}
            </List>
            <Divider />
            <List>
              <ListItem
                button
                component={Link}
                to={sanitizedUrl.MapWithEVStations}
              >
                <ListItemIcon>
                  <MdAddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Ev Station" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to={sanitizedUrl.MyReservations}
              >
                <ListItemIcon>
                  <MdAddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="My Reservations" />
              </ListItem>
              <ListItem button component={Link} to={sanitizedUrl.MyTasks}>
                <ListItemIcon>
                  <MdAddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="My Tasks" />
              </ListItem>

              <ListItem button component={Link} to={sanitizedUrl.MyWallet}>
                <ListItemIcon>
                  <MdAddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="My Wallet" />
              </ListItem>
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
