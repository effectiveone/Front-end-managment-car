import { render, fireEvent } from "@testing-library/react";
import { getByLabelText } from "@testing-library/dom";
import AddNewAnnouncement from "../Dashboard/AddNewAnnouncement";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore();
const store = mockStore({
  auth: { userDetails: { isAdmin: true } },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});
const wrapper = render(
  <Provider store={store}>
    <MemoryRouter>
      <AddNewAnnouncement />
    </MemoryRouter>
  </Provider>
);
describe("AddNewAnnouncement", () => {
  test("should component when the user is an admin", () => {
    const { queryByText } = wrapper;
    expect(queryByText("Add new announcement")).toBeInTheDocument();
  });
});
