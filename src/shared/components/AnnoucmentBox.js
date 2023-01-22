import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAnnouncements } from "../../store/actions/announcementActions";
import { convertDate } from "../utils/helpers";
import { Box, Typography, List, ListItem, makeStyles } from "@material-ui/core";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "solid 1px black",
    backgroundColor: "yellow",
    boxShadow: "1",
    display: "flex",
    flexDirection: "column",
    height: "200px",
    width: "100%",
    padding: "10px 10px 10px 10px",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflowY: "scroll",
  },
  listItem: {
    height: "100%",
    width: "100%",
    backgroundColor: (index) => (index % 2 === 0 ? "lightgreen" : "green"),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    position: "relative",
  },
  title: {
    fontWeight: "bold",
  },
  date: {
    position: "absolute",
    right: "40px",
  },
}));

function AnnoucmentBox() {
  const dispatch = useDispatch();
  const annoucments = useSelector((state) => state.annoucment?.announcements);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <Box>
      <List className={classes.root}>
        {annoucments?.map((annoucment, index) => (
          <ListItem key={uuid()} className={classes.listItem}>
            <Typography variant="subtitle1" className={classes.title}>
              {annoucment?.title}
            </Typography>
            <Typography>{annoucment?.description}</Typography>
            <Typography variant="caption" className={classes.date}>
              {convertDate(annoucment?.createdAt)}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default AnnoucmentBox;
