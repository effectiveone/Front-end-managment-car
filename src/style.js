import { makeStyles } from "@material-ui/core/styles";

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
    padding: "20px 20px 20px 20px",
  },
  contentOpen: {
    width: `calc(100% - 100px)`,
    marginRight: "-10px",
    padding: "20px 20px 20px 20px",
  },
}));

export default useStyles;
