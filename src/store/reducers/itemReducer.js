import {
  FETCH_ITEMS_START,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from "../actions/itemActions";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case FETCH_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_ITEM_SUCCESS:
      const updatedItems = state.items.map((item) => {
        return item.id === action.payload.id ? action.payload : item;
      });
      return {
        ...state,
        items: updatedItems,
      };
    case DELETE_ITEM_SUCCESS:
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
      };
    default:
      return state;
  }
};

export default itemsReducer;
