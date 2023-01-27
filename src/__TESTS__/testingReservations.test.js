import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MyReservations from "../Dashboard/MyReservations";
import store from "../store/store";

const mockStore = configureStore([]);

describe("MyReservations component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      drawer: { drawerState: true },
      wallet: {
        coins: {
          MyReservations: [
            {
              _id: "1",
              title: "Title1",
              selectedDate: "2022-01-01",
              coins: 10,
              dateOfMakingReservation: "2022-01-01",
            },
            {
              _id: "2",
              title: "Title2",
              selectedDate: "2022-02-01",
              coins: 20,
              dateOfMakingReservation: "2022-01-01",
            },
          ],
        },
      },
    });
    store.dispatch = jest.fn();
    localStorage.setItem("user", JSON.stringify({ mail: "test@example.com" }));
  });

  it("should render the table and the table rows correctly", () => {
    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <MyReservations />
      </Provider>
    );

    // Check if the table is rendered
    const table = getAllByRole("table");
    expect(table).toBeDefined();

    // Check if the table rows are rendered
    const rows = getAllByRole("row");
    expect(rows).toHaveLength(3);

    // Check if the cells in the first row contain the correct data
    const firstRowCells = rows[1].children;
    expect(firstRowCells[0]).toHaveTextContent("Title1");
    expect(firstRowCells[1]).toHaveTextContent("01-01-2022");
    expect(firstRowCells[2]).toHaveTextContent("01-02-2022");
    expect(firstRowCells[3]).toHaveTextContent("100");
  });
});

it("should display a message when there are no reservations", () => {
  const { queryByText } = render(
    <Provider store={store}>
      <MyReservations />
    </Provider>
  );
  expect(queryByText("No reservations")).toBeInTheDocument();
});

it("should show an error message when there is an error fetching the reservations", () => {
  const { queryByText } = render(
    <Provider store={storeError}>
      <MyReservations />
    </Provider>
  );
  expect(queryByText("Error fetching reservations")).toBeInTheDocument();
});
