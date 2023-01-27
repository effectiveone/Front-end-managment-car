import { render, fireEvent } from "@testing-library/react";
import AddNewVehicleForm from "../Dashboard/AddNewVehicleForm";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  auth: { userDetails: { isAdmin: true } },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});

it("should set the 'makeError' state when the make input value is less than 3 characters", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <AddNewVehicleForm />
    </Provider>
  );

  const makeInput = getByLabelText("Make");
  fireEvent.change(makeInput, { target: { value: "ab" } });
  fireEvent.submit(getByText("Add new vehicle"));

  expect(
    getByText("Make should be at least 3 characters long")
  ).toBeInTheDocument();
});

it("should set the 'modelError' state when the model input value is less than 3 characters", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <AddNewVehicleForm />
    </Provider>
  );

  const modelInput = getByLabelText("Model");
  fireEvent.change(modelInput, { target: { value: "ab" } });
  fireEvent.submit(getByText("Add new vehicle"));

  expect(
    getByText("Model should be at least 3 characters long")
  ).toBeInTheDocument();
});
