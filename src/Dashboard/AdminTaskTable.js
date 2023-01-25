import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, fetchAllTasks } from "../store/actions/taskActions";
import Layout from "../shared/components/Layout";
import Dashboard from "./Dashboard";
import uuid from "react-uuid";
import useNestedRows from "../shared/utils/hooks/useNestedRows";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AdminTaskTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task?.allTasks);
  const user = useSelector((state) => state.auth.user);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  useEffect(() => {
    if (!tasks?.length) {
      dispatch(fetchAllTasks());
    }
  }, [dispatch, tasks]);

  const handleUpdateTask = (task) => {
    dispatch(updateTask(task));
  };

  const nestedRows = useNestedRows(tasks);

  return (
    <>
      {currentUser?.isAdmin ? (
        <>
          <Layout>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Coins To Earn</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Responsive Person</TableCell>
                    <TableCell align="center">Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nestedRows}
                  {/* {tasks?.map((task) => (
                    <TableRow key={uuid()}>
                      <TableCell component="th" scope="row">
                        {task.title}
                      </TableCell>
                      <TableCell align="right">{task.description}</TableCell>
                      <TableCell align="right">{task.coinsToEarn}</TableCell>
                      <TableCell align="right">
                        {task.responsivePerson}
                      </TableCell>
                      <TableCell align="right">{task.status}</TableCell>
                      <TableCell align="right">{task.time}</TableCell>
                      <TableCell align="right">{task.createdAt}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </Layout>
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
