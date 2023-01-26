import { render, fireEvent } from "@testing-library/react";
import AddNewVehicleForm from "../Dashboard/AddNewVehicleForm";

it("should set the 'makeError' state when the make input value is less than 3 characters", () => {
  const { getByLabelText, getByText } = render(<AddNewVehicleForm />);

  const makeInput = getByLabelText("Make");
  fireEvent.change(makeInput, { target: { value: "ab" } });
  fireEvent.submit(getByText("Add new vehicle"));

  expect(
    getByText("Make should be at least 3 characters long")
  ).toBeInTheDocument();
});

it("should set the 'modelError' state when the model input value is less than 3 characters", () => {
  const { getByLabelText, getByText } = render(<AddNewVehicleForm />);

  const modelInput = getByLabelText("Model");
  fireEvent.change(modelInput, { target: { value: "ab" } });
  fireEvent.submit(getByText("Add new vehicle"));

  expect(
    getByText("Model should be at least 3 characters long")
  ).toBeInTheDocument();
});
