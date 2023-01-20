import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Alert, AlertTitle } from "@mui/material";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#b9bbbe",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "16px",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "1px solid black",
  borderRadius: "5px",
  color: "#dcddde",
  background: "#35393f",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder, isFormValid } = props;
  const { error, setError } = props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
    setError(null);
  };

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setError(false);
    }, 5000);

    return () => {
      clearTimeout(timer1);
    };
  }, [error]);

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
      {error && (
        <Alert severity="warning" variant="outlined">
          <AlertTitle>Warning</AlertTitle>
          <strong>{error}</strong>
        </Alert>
      )}
    </Wrapper>
  );
};

export default InputWithLabel;
