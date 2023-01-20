import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const FETCH_TASKS = "FETCH_TASKS";
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const fetchTasks = () => async (dispatch) => {
  const res = await axios.get("http://localhost:5002/api/auth/tasks");
  dispatch({
    type: FETCH_TASKS,
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

export const updateTask = (taskData) => async (dispatch) => {
  const res = await axios.patch(
    "http://localhost:5002/api/auth/tasks",
    taskData
  );
  dispatch({
    type: UPDATE_TASK,
    payload: res.data,
  });
};

export const deleteTask = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5002/api/auth/tasks/${id}`);
  dispatch({
    type: DELETE_TASK,
    payload: id,
  });
};
