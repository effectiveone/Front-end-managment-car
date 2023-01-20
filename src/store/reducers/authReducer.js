import { authActions } from "../actions/authActions";

const initState = {
  userDetails: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case authActions.UPDATE_USER:
      return {
        ...state,
        userDetails: action.user,
      };
    default:
      return state;
  }
}
