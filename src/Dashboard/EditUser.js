import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputWithLabel from "../shared/components/InputWithLabel";
import { updateUser } from "../store/actions/authActions";
import Layout from "../shared/components/Layout";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const user = useSelector((state) => state.auth?.userDetails);
  const localUser = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  if (!user && !localUser) return;

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError(null);
    setPasswordError(null);
    if (!username) {
      setUsernameError("Username is required");
    }
    if (!password) {
      setPasswordError("Password is required");
    }
    if (username && password) {
      const updatedUser = {
        ...user,
        username,
        password,
      };
      dispatch(updateUser(updatedUser));
    }
  };

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label="Username"
            value={username || user?.username || localUser?.username}
            setValue={setUsername}
            error={usernameError}
            setError={setUsernameError}
            placeholder="Enter your new username"
          />
          <InputWithLabel
            label="Password"
            value={password}
            setValue={setPassword}
            error={passwordError}
            setError={setPasswordError}
            placeholder="Enter your new password"
            type="password"
          />
          <button type="submit">Save changes</button>
        </form>
      </Layout>
    </>
  );
};

export default EditUser;
