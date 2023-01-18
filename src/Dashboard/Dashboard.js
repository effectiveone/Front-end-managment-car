import React from "react";
import uuid from "react-uuid";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../shared/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../store/actions/itemActions";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    padding: "10px 10px 10px 10px",
  },
  table: {
    minWidth: 650,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item.items);

  const deleteExistItem = (id) => {
    dispatch(deleteItem(id, true));
  };

  return (
    <>
      <Layout>
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Make</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Range</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Book</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((item) => (
                <TableRow key={uuid()}>
                  <TableCell>{item.make}</TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.range}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <button>Book</button>
                  </TableCell>
                  <TableCell>
                    <div onClick={() => deleteExistItem(item.id)}>
                      <RiDeleteBin5Line />
                    </div>
                    ;
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    </>
  );
};

export default Dashboard;
