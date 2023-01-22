import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "../shared/components/InputWithLabel";
import { addTask } from "../store/actions/taskActions";
import Layout from "../shared/components/Layout";
import Dashboard from "./Dashboard";
import { validateTaskForm } from "../shared/utils/validators";
import AlertNotification from "../shared/components/AlertNotification";

const AddNewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [coinsToEarn, setCoinsToEarn] = useState("");
  const [isFormValid, setIsFormValid] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [coinsToEarnError, setCoinsToEarnError] = useState(null);
  const user = useSelector((state) => state.auth?.userDetails);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  const dispatch = useDispatch();
  if (!user && !localUser) return;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { title, description, time, coinsToEarn };
    setIsFormValid(validateTaskForm({ title, description, time, coinsToEarn }));

    if (title.length < 3) {
      setTitleError("Title should be at least 3 characters long");
    }
    if (description.length < 10) {
      setDescriptionError("Description should be at least 10 characters long");
    }
    if (time.length < 3) {
      setTimeError("Time should be at least 3 characters long");
    }
    if (coinsToEarn.length < 3) {
      setCoinsToEarnError("Coins to earn should be at least 3 characters long");
    }

    if (isFormValid) {
      dispatch(addTask(newTask, currentUser));
      setTitle("");
      setDescription("");
      setTime("");
      setCoinsToEarn("");
    }
  };

  return (
    <>
      {currentUser?.isAdmin ? (
        <>
          <Layout>
            <form onSubmit={handleSubmit}>
              <AlertNotification typeOfAlert="success" />
              <InputWithLabel
                label="Title"
                value={title}
                setValue={setTitle}
                placeholder="Enter the title of the task"
                error={titleError}
                setError={setTitleError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Description"
                value={description}
                setValue={setDescription}
                placeholder="Enter the description of the task"
                error={descriptionError}
                setError={setDescriptionError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Time"
                value={time}
                setValue={setTime}
                placeholder="Enter the time needed to complete the task"
                error={timeError}
                setError={setTimeError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Coins to earn"
                value={coinsToEarn}
                setValue={setCoinsToEarn}
                placeholder="Enter the number of coins to earn for completing the task"
                error={coinsToEarnError}
                setError={setCoinsToEarnError}
                isFormValid={isFormValid}
              />
              <button type="submit">Add new task</button>
            </form>
          </Layout>
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default AddNewTask;
