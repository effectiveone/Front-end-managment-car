// actions/announcementActions.js

import axios from "axios";

export const ADD_ANNOUNCEMENT = "ADD_ANNOUNCEMENT";
export const GET_ANNOUNCEMENT = "GET_ANNOUNCEMENT";

export const addAnnouncement = (announcement, user) => {
  if (!user) return;
  const { isAdmin, token } = user;
  if (!isAdmin) return;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .post("http://localhost:5002/api/auth/add-announcement", {
        announcement,
        token,
      })
      .then((response) => {
        dispatch({
          type: ADD_ANNOUNCEMENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getAnnouncements = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:5002/api/auth/get-announcements")
      .then((response) => {
        dispatch({
          type: GET_ANNOUNCEMENT,
          payload: response.data.announcements,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
