import axios from "axios";
import { openAlertMessage } from "./alertActions";
export const INITIALIZE_WALLET = "INITIALIZE_WALLET";
export const ADD_COINS = "ADD_COINS";
export const SUBTRACT_COINS = "SUBTRACT_COINS";

export const initializeWallet = (mail) => async (dispatch) => {
  const res = await axios.get(`http://localhost:5002/api/auth/getWallet`, {
    params: { mail },
  });
  dispatch({
    type: "INITIALIZE_WALLET",
    payload: res.data.wallet,
  });
};

// Add coins to a user's wallet
export const addCoins = (coins, mail, token, title) => async (dispatch) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.post("http://localhost:5002/api/auth/addCoins", {
      coins,
      mail,
      title,
    });
    dispatch({ type: "ADD_COINS", payload: res.data });
    dispatch(openAlertMessage("Coins added successfully!"));
  } catch (err) {
    dispatch(openAlertMessage("Error adding coins: " + err));
  }
};

export const subtractCoins =
  (coins, mail, token, title, selectedDate) => async (dispatch) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/subtractCoins",
        {
          coins,
          mail,
          title,
          selectedDate,
        }
      );
      dispatch({ type: SUBTRACT_COINS, payload: res.data });
      dispatch(openAlertMessage(`The account has been debited ${coins}`));
    } catch (err) {
      dispatch(openAlertMessage("Error SUBTRACT coins: " + err));
      console.log("Error adding coins: " + err);
    }
  };
