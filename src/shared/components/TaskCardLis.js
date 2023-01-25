import React from "react";
import useTaskList from "../utils/hooks/useTaskList";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box, Typography, Paper } from "@mui/material";

import SliderArrows from "./SliderArrows/SliderArrows";
import { AiFillEdit } from "react-icons/ai";

const useStyles = makeStyles({
  mainContainer: {
    position: "relative",
    height: "180px",
  },
  paper: {
    padding: "10px",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    marginBottom: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  updateButton: {
    padding: 0,
  },
  rightArrow: {
    position: "absolute",
    bottom: "10px",
    right: "0px",
    zIndex: 2,
  },
  leftArrow: {
    position: "absolute",
    bottom: "10px",
    right: "25px",
    zIndex: 3,
  },
});

const TaskCardList = () => {
  const classes = useStyles();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const { tasks, currentCard, handleNext, handlePrevious, handleUpdateTask } =
    useTaskList();

  return (
    <Grid container className={classes.mainContainer}>
      <Grid container spacing={3}>
        {tasks.slice(currentCard, currentCard + 3)?.map((task, index) => {
          const { _id, title, description } = task;
          return (
            <Grid item xs={4} key={_id}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                  {title}
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {description}
                </Typography>
                <Box className={classes.buttonContainer}>
                  <IconButton
                    onClick={() => handleUpdateTask(_id, localUser?.mail)}
                    className={classes.updateButton}
                  >
                    <AiFillEdit />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {tasks.length === 0 && <Grid container>"No task avaible!"</Grid>}
      <Grid container>
        <Grid item className={classes.rightArrow}>
          <SliderArrows direction={"right"} handleClick={handleNext} />
        </Grid>
        <Grid item className={classes.leftArrow}>
          <SliderArrows direction={"left"} handleClick={handlePrevious} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TaskCardList;
