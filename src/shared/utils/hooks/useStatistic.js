import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useDispatch, useSelector } from "react-redux";
import { useInitializeWallet } from "./useInitializeWallet";
import useTaskList from "./useTaskList";

const useStatistic = () => {
  useInitializeWallet();
  const { myTasks } = useTaskList();

  const MyReservations = useSelector(
    (state) => state.wallet.coins.MyReservations
  );

  const bankingOperations = useSelector(
    (state) => state.wallet.coins.bankingOperations
  );

  let currentMonthReservations = 0;
  let previousMonthReservations = 0;

  if (MyReservations) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    MyReservations.forEach((reservation) => {
      const reservationDate = new Date(reservation.dateOfMakingReservation);
      const reservationMonth = reservationDate.getMonth();
      const reservationYear = reservationDate.getFullYear();

      if (
        reservationMonth === currentMonth &&
        reservationYear === currentYear
      ) {
        currentMonthReservations++;
      } else if (
        reservationMonth === currentMonth - 1 &&
        reservationYear === currentYear
      ) {
        previousMonthReservations++;
      } else if (
        currentMonth === 0 &&
        reservationMonth === 11 &&
        reservationYear === currentYear - 1
      ) {
        previousMonthReservations++;
      }
    });
  }

  const difference = currentMonthReservations - previousMonthReservations;
  let ReservationValue;
  let ReservationColor;
  if (difference > 0) {
    ReservationColor = "green";
    ReservationValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {difference} <ArrowUpwardIcon color="success" />{" "}
        </div>
      </>
    );
  } else if (difference < 0) {
    ReservationColor = "red";
    ReservationValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {difference} <ArrowDownwardIcon color="error" />{" "}
        </div>
      </>
    );
  } else {
    ReservationValue = <>{difference} </>;
  }

  // Balance

  let currentMonthCoins = 0;
  let previousMonthCoins = 0;
  let currentMonth = new Date().getMonth();

  for (let i = 0; i < bankingOperations?.length; i++) {
    let operationDate = new Date(bankingOperations[i].date.$date);
    let operationCoins =
      bankingOperations[i].newValue - bankingOperations[i].previousValue;
    if (operationDate.getMonth() === currentMonth) {
      currentMonthCoins += operationCoins;
    } else {
      previousMonthCoins += operationCoins;
    }
  }

  const ballanceAccount = currentMonthCoins - previousMonthCoins;
  let BallanceValue;
  let BallanceColor;
  if (ballanceAccount > 0) {
    BallanceColor = "green";
    BallanceValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {ballanceAccount} <ArrowUpwardIcon color="success" />{" "}
        </div>
      </>
    );
  } else if (ballanceAccount < 0) {
    BallanceColor = "red";
    BallanceValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {ballanceAccount} <ArrowDownwardIcon color="error" />{" "}
        </div>
      </>
    );
  } else {
    BallanceValue = <>{difference} </>;
  }

  // My Tasks
  let currentMonthTasks = 0;
  let previousMonthTasks = 0;

  for (let i = 0; i < myTasks?.length; i++) {
    let taskDate = new Date(myTasks[i].createdAt.$date);
    if (taskDate.getMonth() === currentMonth) {
      currentMonthTasks++;
    } else if (taskDate.getMonth() !== currentMonth) {
      previousMonthTasks++;
    }
  }

  const taskDifference = currentMonthTasks - previousMonthTasks;
  let taskValue;
  let taskColor;
  if (taskDifference > 0) {
    taskColor = "green";
    taskValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {taskDifference} <ArrowUpwardIcon color="success" />{" "}
        </div>
      </>
    );
  } else if (taskDifference < 0) {
    taskColor = "red";
    taskValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {taskDifference} <ArrowDownwardIcon color="error" />{" "}
        </div>
      </>
    );
  } else {
    taskValue = <>{taskDifference} </>;
  }

  // BALANCE OF ACCOUNT

  let currentBalanceMonthCoins = 0;
  let previousBalanceMonthCoins = 0;

  for (let i = 0; i < bankingOperations?.length; i++) {
    let operationDate = new Date(bankingOperations[i].date);
    let operationCoins =
      bankingOperations[i].newValue - bankingOperations[i].previousValue;
    if (operationDate.getMonth() === currentMonth) {
      currentBalanceMonthCoins += operationCoins;
    } else {
      previousBalanceMonthCoins += operationCoins;
    }
  }

  const coinDifference = currentBalanceMonthCoins - previousBalanceMonthCoins;
  let coinValue;
  let coinColor;
  if (coinDifference > 0) {
    coinColor = "green";
    coinValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {coinDifference} <ArrowUpwardIcon color="success" />
        </div>
      </>
    );
  } else if (coinDifference < 0) {
    coinColor = "red";
    coinValue = (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {coinDifference} <ArrowDownwardIcon color="error" />
        </div>
      </>
    );
  } else {
    coinValue = <>{coinDifference}</>;
  }

  return {
    ReservationValue,
    ReservationColor,
    MyReservations,
    BallanceValue,
    BallanceColor,
    taskValue,
    taskColor,
    myTasks,
    coinValue,
    coinColor,
  };
};

export default useStatistic;
