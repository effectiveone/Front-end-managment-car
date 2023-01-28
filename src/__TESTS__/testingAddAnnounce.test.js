import { render, fireEvent } from "@testing-library/react";
import { getByLabelText } from "@testing-library/dom";
import AddNewAnnouncement from "../Dashboard/AddNewAnnouncement";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import rootReducer from "../store";
import { addAnnouncement } from "../store/actions/announcementActions";
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

  jest.mock("../store/actions/announcementActions", () => ({
    addAnnouncement: jest.fn(),
  }));

  describe("AddNewAnnouncement", () => {
    let store;

    beforeEach(() => {
      store = createStore(rootReducer);
    });

    it("renders the form", () => {
      const { getByLabelText, getByText } = wrapper;

      const titleInput = getByLabelText("Title");
      const descriptionInput = getByLabelText("Description");
      const submitButton = getByText("Add new announcement");

      expect(titleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it("dispatches addAnnouncement action on form submit", () => {
      const { getByLabelText, getByText } = wrapper;

      const titleInput = getByLabelText("Title");
      const descriptionInput = getByLabelText("Description");
      const submitButton = getByText("Add new announcement");

      fireEvent.change(titleInput, { target: { value: "Test Title" } });
      fireEvent.change(descriptionInput, {
        target: { value: "Test Description" },
      });
      fireEvent.click(submitButton);

      expect(addAnnouncement).toHaveBeenCalledWith(
        { title: "Test Title", description: "Test Description" },
        {}
      );
    });
  });
});
