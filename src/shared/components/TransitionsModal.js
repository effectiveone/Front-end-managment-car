import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  containerDates: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
    transform: "translateX(15px)",
    width: "150px",
    height: "50px",
    gridColumnGap: "-20px ",
    position: "relative",
    "&:hover": {
      background: "grey",
    },
  },
  bookedDate: {
    backgroundColor: "red",
    borderRadius: "50%",
    width: "10px",
    height: "10px",
    position: "absolute",
    bottom: "20px",
    right: "30px",
  },
}));

const TransitionsModal = ({
  handleVisibility,
  open,
  token,
  mail,
  updateItemReservations,
  id,
}) => {
  const classes = useStyles();
  const user = { token, mail };
  const [selectedDate, handleDateChange] = useState(new Date());
  const reservedSpots = useSelector((state) => state.item.reservations);
  const handleDateChangeFunction = (date, isBook) => {
    if (isBook) {
      alert(`Asset on ${date} is booked`);
    } else {
      handleDateChange(date);
    }
  };
  const day = moment();
  const renderDay = (day, selectedDate, dayInCurrentMonth) => {
    const isBooked = reservedSpots.find((bookedDate) =>
      moment(bookedDate.date).isSame(day, "day")
    );

    return (
      <React.Fragment key={day.toDate().getTime()}>
        <div
          className={classes.containerDates}
          onMouseEnter={() => {
            classes.containerDates += " " + classes.containerDatesHover;
          }}
          onMouseLeave={() => {
            classes.containerDates = classes.containerDates.replace(
              " " + classes.containerDatesHover,
              ""
            );
          }}
        >
          <div
            onClick={() =>
              handleDateChangeFunction(day.format("YYYY-MM-DD"), isBooked)
            }
            style={{ transform: "translate(100%, 50%)" }}
          >
            {day.format("D")}
          </div>
          {isBooked && <div className={classes.bookedDate} />}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleVisibility}
      closeAfterTransition
      // BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              renderInput={({ ref, ...other }) => (
                <TextField inputRef={ref} {...other} />
              )}
              day={day.toDate()}
              key={day.toDate().getTime()}
              renderDay={renderDay}
              onChange={handleDateChange}
              selected={selectedDate}
            />
          </LocalizationProvider>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleVisibility}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={reservedSpots?.includes(selectedDate.toString())}
              onClick={() =>
                updateItemReservations(id, { date: selectedDate }, user)
              }
            >
              Save
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
