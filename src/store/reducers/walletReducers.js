import {
  INITIALIZE_WALLET,
  ADD_COINS,
  SUBTRACT_COINS,
} from "../actions/walletActions";

const initialState = {
  coins: 0,
};

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_WALLET:
      return {
        ...state,
        coins: action.payload,
      };
    case ADD_COINS:
      return {
        ...state,
        coins: state.coins + action.amount,
      };
    case SUBTRACT_COINS:
      return {
        ...state,
        coins: state.coins - action.amount,
      };
    default:
      return state;
  }
}
