import React, { useEffect } from "react";
import Layout from "../shared/components/Layout";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { initializeWallet } from "../store/actions/walletActions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyReservations = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth?.userDetails);

  const MyReservations = useSelector((state) => state.wallet.MyReservations);

  useEffect(() => {
    dispatch(initializeWallet(localUser.mail));
  }, [dispatch, localUser]);

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Selected Date</TableCell>
              <TableCell>Coins</TableCell>
              <TableCell>Date of Making Reservation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {MyReservations?.map((open) => (
              <React.Fragment key={open._id}>
                <TableRow>
                  <TableCell>{open.title}</TableCell>
                  <TableCell>{open.selectedDate}</TableCell>
                  <TableCell>{open.coins}</TableCell>
                  <TableCell>
                    {open?.dateOfMakingReservation?.slice(0, 10)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MyReservations;
