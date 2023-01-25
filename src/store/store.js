import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import itemsReducer from "./reducers/itemReducer";
import annoucmentReducer from "./reducers/announcementReducer";
import taskReducer from "./reducers/taskReducer";
import walletReducer from "./reducers/walletReducers";
import drawerReducer from "./reducers/drawerReducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  alert: alertReducer,
  annoucment: annoucmentReducer,
  auth: authReducer,
  item: itemsReducer,
  task: taskReducer,
  wallet: walletReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
