import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTask,
  fetchBacklogTasks,
  fetchMyTasks,
} from "../../../store/actions/taskActions";

const useTaskList = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const tasks = useSelector((state) => state.task?.backlogTasks);
  const dispatch = useDispatch();
  const myTasks = useSelector((state) => state.task?.myTasks.tasks);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const { mail, token } = localUser;
  useEffect(() => {
    if (!tasks.length) {
      dispatch(fetchBacklogTasks());
    }
  }, [dispatch, tasks]);

  useEffect(() => {
    if (!myTasks?.length) {
      const localUser = JSON.parse(localStorage.getItem("user"));
      dispatch(fetchMyTasks(localUser.mail));
    }
  }, [dispatch, myTasks]);

  const handleUpdateTask = (_id, localUser) => {
    dispatch(updateTask(_id, localUser?.mail, "Requested"));
  };

  const handleNext = () => {
    setCurrentCard(currentCard + 1);
  };

  const handlePrevious = () => {
    setCurrentCard(currentCard - 1);
  };

  return {
    tasks,
    currentCard,
    handleNext,
    handlePrevious,
    handleUpdateTask,
    myTasks,
    mail,
    token,
  };
};

export default useTaskList;
