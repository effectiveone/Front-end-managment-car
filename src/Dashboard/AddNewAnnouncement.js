import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "../shared/components/InputWithLabel";
import { addAnnouncement } from "../store/actions/announcementActions";
import Layout from "../shared/components/Layout";
import Dashboard from "./Dashboard";
import { validateAnnouncementForm } from "../shared/utils/validators";
import AlertNotification from "../shared/components/AlertNotification";

const AddNewAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFormValid, setIsFormValid] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const user = useSelector((state) => state.auth?.userDetails);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;
  const dispatch = useDispatch();
  if (!user && !localUser) return;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnnouncement = { title, description };

    setIsFormValid(validateAnnouncementForm({ title, description }));

    if (title.length < 3) {
      setTitleError("Title should be at least 3 characters long");
    }
    if (description.length < 10) {
      setDescriptionError("Description should be at least 10 characters long");
    }

    if (isFormValid) {
      dispatch(addAnnouncement(newAnnouncement, currentUser));
      setTitle("");
      setDescription("");
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
                placeholder="Enter the title of the announcement"
                error={titleError}
                setError={setTitleError}
                isFormValid={isFormValid}
              />
              <InputWithLabel
                label="Description"
                value={description}
                setValue={setDescription}
                placeholder="Enter the description of the announcement"
                error={descriptionError}
                setError={setDescriptionError}
                isFormValid={isFormValid}
              />
              <button type="submit">Add new announcement</button>
            </form>
          </Layout>
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
};

export default AddNewAnnouncement;
