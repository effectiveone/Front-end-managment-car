import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
}));

const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
  if (!selectedDates) {
    return <PickersDay {...pickersDayProps} />;
  }

  const start = moment(date).startOf("week");
  const end = moment(date).endOf("week");

  const dayIsBetween = moment(date).isBetween(start, end, null, "[]");

  const isFirstDay = moment(date).isSame(start, "day");
  const isLastDay = moment(date).isSame(end, "day");

  return (
    <PickersDay
      {...pickersDayProps}
      disableMargin
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
};

const TransitionsModal = ({ handleVisibility, open }) => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleVisibility}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Choose a week</h2>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              label="Week picker"
              value={selectedDate}
              onChange={(newValue) => {
                handleDateChange(newValue);
              }}
              renderDay={renderWeekPickerDay}
              renderInput={(params) => <TextField {...params} />}
              inputFormat="'Week of' MMM d"
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
              onClick={handleVisibility}
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
