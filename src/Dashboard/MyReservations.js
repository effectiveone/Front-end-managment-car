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
import { useSelector } from "react-redux";
import { useInitializeWallet } from "../shared/utils/hooks/useInitializeWallet";
import useNestedRows from "../shared/utils/hooks/useNestedRows";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyReservations = () => {
  useInitializeWallet();
  const classes = useStyles();
  const MyReservations = useSelector(
    (state) => state.wallet.coins.MyReservations
  );

  const nestedRows = useNestedRows(MyReservations);

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date of Making Reservation</TableCell>
              <TableCell>Selected Date</TableCell>
              <TableCell>Coins</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nestedRows}

            {/* {MyReservations?.map((open) => (
              <React.Fragment key={open._id}>
                <TableRow>
                  <TableCell>{open.title}</TableCell>
                  <TableCell>{open.selectedDate?.slice(0, 10)}</TableCell>
                  <TableCell>{open.coins}</TableCell>
                  <TableCell>
                    {open?.dateOfMakingReservation?.slice(0, 10)}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MyReservations;
