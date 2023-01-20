import React, { useState } from "react";
import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  const [error, setError] = useState();
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
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

export default LoginPageInputs;
