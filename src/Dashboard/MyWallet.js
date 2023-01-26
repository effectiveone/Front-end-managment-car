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
import useNestedRows from "../shared/utils/hooks/useNestedRows";
import { useInitializeWallet } from "../shared/utils/hooks/useInitializeWallet";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MyWallet = () => {
  const classes = useStyles();
  useInitializeWallet();
  const wallet = useSelector((state) => state.wallet.coins.bankingOperations);
  const walletBalance = useSelector((state) => state.wallet.coins);

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
