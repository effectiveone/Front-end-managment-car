import React, { useState } from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const RegisterPageInputs = (props) => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  const [error, setError] = useState();

  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail address"
        type="text"
        placeholder="Enter e-mail address"
        error={error}
        setError={setError}
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter a username"
        error={error}
        setError={setError}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
        error={error}
        setError={setError}
      />
    </>
  );
};

export default RegisterPageInputs;
