import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import itemsReducer from "./reducers/itemReducer";
import annoucmentReducer from "./reducers/announcementReducer";

const rootReducer = combineReducers({
  annoucment: annoucmentReducer,
  item: itemsReducer,
  auth: authReducer,
  alert: alertReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
