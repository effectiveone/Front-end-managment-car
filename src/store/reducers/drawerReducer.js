import { TOGGLE_DRAWER } from "../actions/drawerActions";

const initialState = {
  drawerState: false,
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return Object.assign({}, state, {
        drawerState: !state.drawerState,
      });
    default:
      return state;
  }
};

export default drawerReducer;
