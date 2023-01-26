import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@mui/material/IconButton";
import clsx from "clsx";
import { sanitizedUrl } from "../../api";
import Divider from "@material-ui/core/Divider";
import { MdAddCircleOutline } from "react-icons/md";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import useStyles from "../../style";
import useDrawer from "../utils/hooks/useDrawer";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const DrawerComponent = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useSelector((state) => state?.auth?.userDetails);

  const localUser = JSON.parse(localStorage.getItem("user"));
  const { open, DrawerToogle } = useDrawer();
  return (
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
              <ListItem button component={Link} to={sanitizedUrl.Announcement}>
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
          <ListItem button component={Link} to={sanitizedUrl.MapWithEVStations}>
            <ListItemIcon>
              <MdAddCircleOutline />
            </ListItemIcon>
            <ListItemText primary="Ev Station" />
          </ListItem>
          <ListItem button component={Link} to={sanitizedUrl.MyReservations}>
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
    </>
  );
};

export default DrawerComponent;
