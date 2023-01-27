import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditUser from "../Dashboard/EditUser";
import store from "../store/store";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("EditUser component", () => {
  let store;
  let user;
  beforeEach(() => {
    user = {
      username: "testuser",
      password: "testpassword",
    };
    store = mockStore({
      auth: {
        userDetails: user,
      },
      drawer: { drawerState: true },
      wallet: { coins: 200 },
    });
  });

  it("should render the component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    expect(getByTestId("edit-user-form")).toBeInTheDocument();
  });

  it("should display the username in the input field", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    const usernameInput = getByLabelText("Username");
    expect(usernameInput).toHaveValue(userDetails.username);
  });
  it("should display an error message if the username field is left empty", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    fireEvent.submit(getByText("Save changes"));
    const usernameError = getByText("Username is required");
    expect(usernameError).toBeInTheDocument();
  });
  it("should display an error message if the password field is left empty", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    fireEvent.submit(getByText("Save changes"));
    const passwordError = getByText("Password is required");
    expect(passwordError).toBeInTheDocument();
  });
  it("should display an error message if the password confirmation field is left empty", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    fireEvent.submit(getByText("Save changes"));
    const passwordConfirmationError = getByText(
      "Password confirmation is required"
    );
    expect(passwordConfirmationError).toBeInTheDocument();
  });
  it("should display an error message if the password and password confirmation do not match", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByLabelText("Password Confirmation"), {
      target: { value: "not_matching" },
    });
    fireEvent.submit(getByText("Save changes"));
    const passwordError = getByText("Passwords do not match");
    const passwordConfirmationError = getByText("Passwords do not match");
    expect(passwordError).toBeInTheDocument();
    expect(passwordConfirmationError).toBeInTheDocument();
  });
  it("should update the user and clear the form fields when the form is submitted with valid input", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "new_username" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "new_password" },
    });
    fireEvent.change(getByLabelText("Password Confirmation"), {
      target: { value: "new_password" },
    });
    fireEvent.submit(getByText("Save changes"));
    expect(updateUserMock).toHaveBeenCalledWith({
      ...userDetails,
      username: "new_username",
      password: "new_password",
    });
    expect(getByLabelText("Username")).toHaveValue("");
    expect(getByLabelText("Password")).toHaveValue("");
    expect(getByLabelText("Password Confirmation")).toHaveValue("");
  });

  it("should display an error message if the passwords do not match", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const passwordConfirmationInput = getByLabelText("Password Confirmation");

    fireEvent.change(usernameInput, { target: { value: "new_username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "different_password" },
    });

    fireEvent.submit(getByText("Save changes"));

    expect(getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("should update the user and clear the input fields after a successful submission", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <EditUser />
      </Provider>
    );
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const passwordConfirmationInput = getByLabelText("Password Confirmation");
    fireEvent.change(usernameInput, { target: { value: "new_username" } });
    fireEvent.change(passwordInput, { target: { value: "new_password" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "new_password" },
    });

    fireEvent.submit(getByText("Save changes"));
    await waitFor(() => {
      expect(getByLabelText("Username")).toHaveValue("");
      expect(getByLabelText("Password")).toHaveValue("");
      expect(getByLabelText("Password Confirmation")).toHaveValue("");
    });
  });
});
