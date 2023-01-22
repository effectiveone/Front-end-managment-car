import {
  FETCH_ALL_CARS_START,
  FETCH_ALL_CARS_SUCCESS,
  FETCH_ALL_CARS_FAILURE,
  ADD_CAR_START,
  ADD_CAR_SUCCESS,
  ADD_CAR_FAILURE,
  UPDATE_ITEM_START,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILURE,
  UPDATE_CAR_PROPERTIES_START,
  UPDATE_CAR_PROPERTIES_SUCCESS,
  UPDATE_CAR_PROPERTIES_FAILURE,
  DELETE_CAR_START,
  DELETE_CAR_SUCCESS,
  DELETE_CAR_FAILURE,
  FETCH_CAR_BY_ID_START,
  FETCH_CAR_BY_ID_SUCCESS,
  FETCH_CAR_BY_ID_FAILURE,
  GET_RESERVATIONS_START,
  GET_RESERVATIONS_SUCCESS,
  GET_RESERVATIONS_FAILURE,
} from "../actions/itemActions";

const initialState = {
  cars: [],
  car: {},
  reservations: [],
  loading: false,
  error: null,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CARS_START:
      return { ...state, loading: true };
    case FETCH_ALL_CARS_SUCCESS:
      return { ...state, cars: action.payload, loading: false };
    case FETCH_ALL_CARS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_CAR_BY_ID_START:
      return { ...state, loading: true };
    case FETCH_CAR_BY_ID_SUCCESS:
      return { ...state, car: action.payload, loading: false };
    case FETCH_CAR_BY_ID_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_CAR_START:
      return { ...state, loading: true };
    case ADD_CAR_SUCCESS:
      return {
        ...state,
        cars: [...state.cars, action.payload],
        loading: false,
      };
    case ADD_CAR_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_ITEM_START:
      return { ...state, loading: true };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
        loading: false,
      };
    case UPDATE_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case DELETE_CAR_START:
      return { ...state, loading: true };
    case DELETE_CAR_SUCCESS:
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
        loading: false,
      };
    case DELETE_CAR_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_CAR_PROPERTIES_START:
      return { ...state, loading: true };
    case UPDATE_CAR_PROPERTIES_SUCCESS:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? action.payload : car
        ),
        loading: false,
      };
    case UPDATE_CAR_PROPERTIES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_RESERVATIONS_START:
      return { ...state, loading: true };
    case GET_RESERVATIONS_SUCCESS:
      return { ...state, reservations: action.payload, loading: false };
    case GET_RESERVATIONS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default itemReducer;
