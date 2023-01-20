import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const FETCH_ITEMS_START = "FETCH_ITEMS_START";
export const FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS";
export const FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE";

export const ADD_ITEM_START = "ADD_ITEM_START";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export const UPDATE_ITEM_START = "UPDATE_ITEM_START";
export const UPDATE_ITEM_SUCCESS = "UPDATE_ITEM_SUCCESS";
export const UPDATE_ITEM_FAILURE = "UPDATE_ITEM_FAILURE";

export const DELETE_ITEM_START = "DELETE_ITEM_START";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const fetchItems = () => async (dispatch) => {
  dispatch({ type: FETCH_ITEMS_START });
  try {
    const res = await axios.get("http://localhost:5002/api/auth");
    dispatch({ type: FETCH_ITEMS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_ITEMS_FAILURE, payload: err });
  }
};

export const addItem = (item, user) => (dispatch) => {
  const { isAdmin, token } = user;
  if (!isAdmin) return;
  console.log("working");
  dispatch({ type: ADD_ITEM_START });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios
    .post("http://localhost:5002/api/auth/add", item, token)
    .then((res) => {
      dispatch({ type: ADD_ITEM_SUCCESS, payload: res.data });
      dispatch(openAlertMessage(res.data));
    })
    .catch((err) => {
      dispatch({ type: ADD_ITEM_FAILURE, payload: err });
      dispatch(openAlertMessage(err));
    });
};

export const updateItem = (id, updates, isAdmin) => (dispatch) => {
  if (!isAdmin) return;
  dispatch({ type: UPDATE_ITEM_START });
  axios
    .put(`http://localhost:5002/api/auth/${id}`, updates)
    .then((res) => {
      dispatch({ type: UPDATE_ITEM_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_ITEM_FAILURE, payload: err });
    });
};

export const deleteItem = (id, isAdmin) => (dispatch) => {
  if (!isAdmin) return;
  dispatch({ type: DELETE_ITEM_START });
  axios
    .delete(`http://localhost:5002/api/auth/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_ITEM_SUCCESS, payload: id });
    })
    .catch((err) => {
      dispatch({ type: DELETE_ITEM_FAILURE, payload: err });
    });
};
