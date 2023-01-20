import React from "react";
import { Grid } from "@mui/material";
import ShareBox from "./ShareBox";

const GridOfChartCards = () => {
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ShareBox />
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox />
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox />
        </Grid>

        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox />
        </Grid>
      </Grid>
    </>
  );
};

export default GridOfChartCards;
