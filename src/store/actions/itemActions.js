import { openAlertMessage } from "./alertActions";

import axios from "axios";

export const ADD_CAR_START = "ADD_CAR_START";
export const ADD_CAR_SUCCESS = "ADD_CAR_SUCCESS";
export const ADD_CAR_FAILURE = "ADD_CAR_FAILURE";

export const UPDATE_ITEM_START = "UPDATE_ITEM_START";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const UPDATE_ITEM_FAILURE = "UPDATE_ITEM_FAILURE";

export const UPDATE_CAR_PROPERTIES_START = "UPDATE_CAR_PROPERTIES_START";
export const UPDATE_CAR_PROPERTIES_SUCCESS = "UPDATE_CAR_PROPERTIES_SUCCESS";
export const UPDATE_CAR_PROPERTIES_FAILURE = "UPDATE_CAR_PROPERTIES_FAILURE";

export const DELETE_CAR_START = "DELETE_CAR_START";
export const DELETE_CAR_SUCCESS = "DELETE_CAR_SUCCESS";
export const DELETE_CAR_FAILURE = "DELETE_CAR_FAILURE";

export const GET_RESERVATIONS_START = "GET_RESERVATIONS_START";
export const GET_RESERVATIONS_SUCCESS = "GET_RESERVATIONS_SUCCESS";
export const GET_RESERVATIONS_FAILURE = "GET_RESERVATIONS_FAILURE";

export const FETCH_CAR_BY_ID_START = "FETCH_CAR_BY_ID_START";
export const FETCH_CAR_BY_ID_SUCCESS = "FETCH_CAR_BY_ID_SUCCESS";
export const FETCH_CAR_BY_ID_FAILURE = "FETCH_CAR_BY_ID_FAILURE";

export const FETCH_ALL_CARS_START = "FETCH_ALL_CARS_START";
export const FETCH_ALL_CARS_SUCCESS = "FETCH_ALL_CARS_SUCCESS";
export const FETCH_ALL_CARS_FAILURE = "FETCH_ALL_CARS_FAILURE";

export const fetchAllCars = () => async (dispatch) => {
  dispatch({ type: FETCH_ALL_CARS_START });
  try {
    const res = await axios.get("http://localhost:5002/api/auth");
    dispatch({ type: FETCH_ALL_CARS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_ALL_CARS_FAILURE, payload: err });
  }
};

export const fetchReservationsById = (id) => async (dispatch) => {
  dispatch({ type: GET_RESERVATIONS_START });
  try {
    const res = await axios.get(
      `http://localhost:5002/api/auth/reservations/${id}`
    );
    dispatch({ type: GET_RESERVATIONS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_RESERVATIONS_FAILURE, payload: err });
  }
};

export const fetchCarById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_CAR_BY_ID_START });
  try {
    const res = await axios.get(`http://localhost:5002/api/auth/cars/${id}`);
    dispatch({ type: FETCH_CAR_BY_ID_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_CAR_BY_ID_FAILURE, payload: err });
  }
};

export const addItem = (item, user) => (dispatch) => {
  console.log("item", item);
  const { token } = user;
  dispatch({ type: ADD_CAR_START });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .post("http://localhost:5002/api/auth/add", item)
    .then((res) => {
      dispatch({ type: ADD_CAR_SUCCESS, payload: res.data });
      dispatch(openAlertMessage(res.data));
    })
    .catch((err) => {
      dispatch({ type: ADD_CAR_FAILURE, payload: err });
      dispatch(openAlertMessage(err));
    });
};

export const updateReservation = (id, date, user) => (dispatch) => {
  const { token } = user;
  dispatch({ type: UPDATE_ITEM_START });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .put(`http://localhost:5002/api/auth/update/${id}`, date)
    .then((res) => {
      dispatch({ type: UPDATE_ITEM_SUCCESS, payload: res.data });
      dispatch(openAlertMessage(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: UPDATE_ITEM_FAILURE, payload: err });
      // dispatch(openAlertMessage(err));
    });
};

export const updateProperties = (id, updates, user) => (dispatch) => {
  const { token } = user;
  dispatch({ type: UPDATE_CAR_PROPERTIES_START });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .put(
      `http://localhost:5002/api/auth/update-properties/${id}`,
      updates,
      token
    )
    .then((res) => {
      dispatch({ type: UPDATE_CAR_PROPERTIES_SUCCESS, payload: res.data });
      dispatch(openAlertMessage(res.data));
    })
    .catch((err) => {
      dispatch({ type: UPDATE_CAR_PROPERTIES_FAILURE, payload: err });
      dispatch(openAlertMessage(err));
    });
};

export const deleteItem = (id, user) => (dispatch) => {
  const { token, isAdmin } = user;
  if (!isAdmin) return;
  dispatch({ type: DELETE_CAR_START });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .delete(`http://localhost:5002/api/auth/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({ type: DELETE_CAR_SUCCESS, payload: res.data });
      dispatch(openAlertMessage(res.data));
    })
    .catch((err) => {
      dispatch({ type: DELETE_CAR_FAILURE, payload: err });
      dispatch(openAlertMessage(err));
    });
};
