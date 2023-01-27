import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MyWallet from "../Dashboard/MyWallet";
import store from "../store/store";

const mockStore = configureStore([]);

describe("MyWallet component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      drawer: { drawerState: true },
      wallet: {
        coins: {
          coins: 100,
          bankingOperations: [
            {
              title: "Deposit",
              previousValue: 0,
              newValue: 100,
              date: "2022-01-01",
            },
            {
              title: "Withdraw",
              previousValue: 100,
              newValue: 50,
              date: "2022-01-02",
            },
          ],
        },
      },
    });
  });

  it("renders the correct number of coins in the wallet", () => {
    render(
      <Provider store={store}>
        <MyWallet />
      </Provider>
    );
    expect(
      screen.getByText("Your wallet currently has 100 coins")
    ).toBeInTheDocument();
  });

  it("renders the correct number of rows in the table", () => {
    render(
      <Provider store={store}>
        <MyWallet />
      </Provider>
    );
    const rows = screen.getAllByRole("row");
    expect(rows.length).toEqual(wallet.length);
  });

  it("renders the correct data in each cell of the table", () => {
    render(
      <Provider store={store}>
        <MyWallet />
      </Provider>
    );
    wallet.forEach((operation, index) => {
      const cells = screen.getAllByRole("cell");
      expect(cells[index * 5 + 0]).toHaveTextContent(operation.title);
      expect(cells[index * 5 + 1]).toHaveTextContent(`
${operation.newValue - operation.previousValue}`);
      expect(cells[index * 5 + 2]).toHaveTextContent(operation.previousValue);
      expect(cells[index * 5 + 3]).toHaveTextContent(operation.newValue);
      expect(cells[index * 5 + 4]).toHaveTextContent(
        operation.date.slice(0, 10)
      );
    });
  });

  it("renders the correct balance in the h2 tag", () => {
    render(
      <Provider store={store}>
        <MyWallet />
      </Provider>
    );
    const h2 = screen.getByText("Your wallet currently has");
    expect(h2).toHaveTextContent(
      `Your wallet currently has ${walletBalance} coins`
    );
  });
});
