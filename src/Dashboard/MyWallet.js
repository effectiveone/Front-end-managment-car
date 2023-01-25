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
import useNestedRows from "../shared/utils/hooks/useNestedRows";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyWallet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const localUser = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.auth?.userDetails);

  const wallet = useSelector((state) => state.wallet.coins.bankingOperations);
  const walletBalance = useSelector((state) => state.wallet.coins);
  // const bankingOperations = useSelector(
  //   (state) => state.wallet.wallet?.bankingOperations
  // );
  useEffect(() => {
    dispatch(initializeWallet(localUser.mail));
  }, [dispatch, localUser]);

  // Use the wallet and bankingOperations data here
  const nestedRows = useNestedRows(wallet);

  return (
    <Layout>
      <h2>Your wallet currently has {walletBalance.coins} coins</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell> Change</TableCell>
              <TableCell>Previous Value</TableCell>
              <TableCell>New Value</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nestedRows}
            {/* {wallet?.map((open) => (
              <React.Fragment key={open._id}>
                <TableRow>
                  <TableCell>{open.title}</TableCell>
                  <TableCell>{open.previousValue}</TableCell>
                  <TableCell>{open.newValue}</TableCell>
                  <TableCell>
                    {open.newValue > open.previousValue ? (
                      <span style={{ color: "green" }}>
                        +{open.newValue - open.previousValue}
                      </span>
                    ) : (
                      <span style={{ color: "red" }}>
                        {open.newValue - open.previousValue}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{open?.date?.slice(0, 10)}</TableCell>
                </TableRow>
              </React.Fragment>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default MyWallet;
