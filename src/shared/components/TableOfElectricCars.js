import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { makeStyles } from "@material-ui/core/styles";
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
import {
  deleteItem,
  fetchAllCars,
  updateReservation,
  fetchReservationsById,
} from "../../store/actions/itemActions";
import TransitionsModal from "./TransitionsModal";

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
function TableOfElectricCars() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const items = useSelector((state) => state.item.cars);
  const userAdmin = localStorage.getItem("user");
  const { token, mail, isAdmin } = userAdmin;
  useEffect(() => {
    if (!items?.length) {
      dispatch(fetchAllCars());
    }
  }, []);

  const deleteExistItem = (id) => {
    dispatch(deleteItem(id, true));
  };

  const updateItemReservations = (id, date, user) => {
    dispatch(updateReservation(id, date, user));
  };

  const [currentId, setCurrentId] = useState();
  const handleVisibility = (id) => {
    setOpen(!open);
    dispatch(fetchReservationsById(id));
    setCurrentId(id);
  };

  const handleCloseModal = (id) => {
    setOpen(false);
  };
  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Range</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Book</TableCell>
              {isAdmin && <TableCell>Delete</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map(({ id, make, model, range, price }) => {
              return (
                <>
                  <React.Fragment>
                    <TransitionsModal
                      handleVisibility={handleCloseModal}
                      open={open}
                      token={token}
                      mail={mail}
                      id={currentId}
                      updateItemReservations={updateItemReservations}
                    />
                  </React.Fragment>
                  <TableRow key={id}>
                    <TableCell>{make}</TableCell>
                    <TableCell>{model}</TableCell>
                    <TableCell>{range}</TableCell>
                    <TableCell>{price}</TableCell>

                    <TableCell>
                      <button onClick={() => handleVisibility(id)}>Book</button>
                    </TableCell>
                    {isAdmin && (
                      <>
                        {" "}
                        <TableCell>
                          <RiDeleteBin5Line />
                        </TableCell>{" "}
                      </>
                    )}
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default TableOfElectricCars;
