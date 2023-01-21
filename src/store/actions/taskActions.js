import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const FETCH_ALL_TASKS = "FETCH_ALL_TASKS";
export const FETCH_MY_TASKS = "FETCH_MY_TASKS";
export const FETCH_BACKLOG_TASKS = "FETCH_BACKLOG_TASKS";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

export const fetchAllTasks = () => async (dispatch) => {
  const res = await axios.get("http://localhost:5002/api/auth/tasks");
  dispatch({
    type: FETCH_ALL_TASKS,
    payload: res.data,
  });
};

export const fetchMyTasks = (mail) => async (dispatch) => {
  const res = await axios.get(
    `http://localhost:5002/api/auth/getMyTasks?email=${mail}`
  );
  dispatch({
    type: FETCH_MY_TASKS,
    payload: res.data,
  });
};

export const fetchBacklogTasks = () => async (dispatch) => {
  const res = await axios.get("http://localhost:5002/api/auth/getBacklogTasks");
  dispatch({
    type: FETCH_BACKLOG_TASKS,
    payload: res.data,
  });
};

export const addTask = (taskData, user) => async (dispatch) => {
  const { isAdmin, token } = user;
  if (!isAdmin) return;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.post(
      "http://localhost:5002/api/auth/tasks",
      taskData,
      token
    );
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    dispatch(openAlertMessage("Task added successfully!"));
  } catch (err) {
    dispatch(openAlertMessage("Error adding task: " + err));
  }
};

export const updateTask = (id, responsivePerson, status) => (dispatch) => {
  axios
    .put(`http://localhost:5002/api/auth/tasks/${id}`, {
      responsivePerson,
      status,
    })
    .then((res) => {
      dispatch({ type: UPDATE_TASK_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_TASK_FAILURE, payload: err });
    });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5002/api/auth/tasks/${id}`);
  dispatch({
    type: DELETE_TASK,
    payload: id,
  });
};
