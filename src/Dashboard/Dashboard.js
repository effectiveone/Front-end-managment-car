import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../shared/components/Layout";

import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems } from "../store/actions/itemActions";

import AnnoucmentBox from "../shared/components/AnnoucmentBox";
import TaskCardList from "../shared/components/TaskCardList";
import TableOfElectricCars from "../shared/components/TableOfElectricCars";
import GridOfChartCards from "../shared/components/GridOfChartCards";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: "50px",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.item.items);
  const userAdmin = useSelector((state) => state.auth?.userDetails?.isAdmin);
  useEffect(() => {
    if (!items.length) {
      dispatch(fetchItems());
    }
  }, [dispatch, items]);

  const deleteExistItem = (id) => {
    dispatch(deleteItem(id, true));
  };

  return (
    <>
      <Layout>
        <Grid className={classes.container}>
          <GridOfChartCards />
          <AnnoucmentBox />
          <TaskCardList />
          <TableOfElectricCars />
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;
