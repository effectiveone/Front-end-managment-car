import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, fetchBacklogTasks } from "../../store/actions/taskActions";
import { makeStyles } from "@material-ui/core/styles";
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
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task?.backlogTasks);
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchBacklogTasks());
    }
  }, [dispatch, tasks]);

  const handleUpdateTask = (_id, responsivePerson, status) => {
    dispatch(updateTask(_id, responsivePerson, status));
  };

  const handleNext = () => {
    setCurrentCard(currentCard + 1);
  };

  const handlePrevious = () => {
    setCurrentCard(currentCard - 1);
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Grid container spacing={3}>
        {tasks.slice(currentCard, currentCard + 3).map((task, index) => {
          const { _id } = task;
          return (
            <Grid item xs={4} key={_id}>
              <Paper className={classes.paper}>
                <Typography variant="h5" className={classes.title}>
                  {task.title}
                </Typography>
                <Typography variant="body2" className={classes.description}>
                  {task.description}
                </Typography>
                <Box className={classes.buttonContainer}>
                  <IconButton
                    onClick={handleUpdateTask(_id, localUser?.mail, "Request")}
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
      {tasks.length === 0 && (
        <>
          {" "}
          <Grid container>"No task avaible!"</Grid>
        </>
      )}
      <Grid container>
        {/* {currentCard < tasks.length - 3 && ( */}
        <Grid item className={classes.rightArrow}>
          <SliderArrows direction={"right"} handleClick={handleNext} />
        </Grid>
        {/* )} */}
        {/* {currentCard > 0 && ( */}
        <Grid item className={classes.leftArrow}>
          <SliderArrows direction={"left"} handleClick={handlePrevious} />
        </Grid>
        {/* )} */}
      </Grid>
    </Grid>
  );
};

export default TaskCardList;
