import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTask,
  fetchBacklogTasks,
} from "../../../store/actions/taskActions";

const useTaskList = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const tasks = useSelector((state) => state.task?.backlogTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchBacklogTasks());
    }
  }, [dispatch, tasks]);

  const handleUpdateTask = (_id, localUser) => {
    dispatch(updateTask(_id, localUser?.mail, "Requested"));
  };

  const handleNext = () => {
    setCurrentCard(currentCard + 1);
  };

  const handlePrevious = () => {
    setCurrentCard(currentCard - 1);
  };

  return { tasks, currentCard, handleNext, handlePrevious, handleUpdateTask };
};

export default useTaskList;
