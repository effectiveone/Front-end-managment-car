import {
  ADD_ANNOUNCEMENT,
  GET_ANNOUNCEMENT,
} from "../actions/announcementActions";

const initialState = {
  announcements: [],
};

export default function annoucmentReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [...state.announcements, action.payload],
      };
    case GET_ANNOUNCEMENT:
      return {
        ...state,
        announcements: action.payload,
      };
    default:
      return state;
  }
}
