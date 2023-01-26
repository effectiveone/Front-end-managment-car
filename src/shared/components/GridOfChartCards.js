import React from "react";
import { Grid } from "@mui/material";
import ShareBox from "./ShareBox";
import useStatistic from "../utils/hooks/useStatistic";
const GridOfChartCards = () => {
  const {
    ReservationColor,
    ReservationValue,
    MyReservations,
    BallanceValue,
    BallanceColor,
    taskValue,
    taskColor,
    myTasks,
    coinValue,
    coinColor,
  } = useStatistic();
  console.log("myTasks", myTasks);
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <ShareBox
            title={
              <>
                Progress in <br />
                earning coins
              </>
            }
            value={BallanceValue}
            color={BallanceColor}
          />
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox
            title="My Reservations"
            color={ReservationColor}
            value={ReservationValue}
          />
        </Grid>
        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox title="My Tasks" value={taskValue} color={taskColor} />
        </Grid>

        <Grid item xl={3} lg={3} sm={6} xs={12}>
          <ShareBox title="My Balance" value={coinValue} color={coinColor} />
        </Grid>
      </Grid>
    </>
  );
};

export default GridOfChartCards;
