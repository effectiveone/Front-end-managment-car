import {
  ADD_TASK,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK,
  FETCH_ALL_TASKS,
  FETCH_MY_TASKS,
  FETCH_BACKLOG_TASKS,
} from "../actions/taskActions";

const initialState = {
  tasks: [],
  myTasks: [],
  backlogTasks: [],
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_TASKS:
      return {
        ...state,
        allTasks: action.payload,
      };
    case FETCH_MY_TASKS:
      return {
        ...state,
        myTasks: action.payload,
      };
    case FETCH_BACKLOG_TASKS:
      return {
        ...state,
        backlogTasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload._id) {
            return {
              ...task,
              status: action.payload.status,
              responsivePerson: action.payload.responsivePerson,
            };
          }
          return task;
        }),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
}
