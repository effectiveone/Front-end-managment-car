import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MapWithEVStations from "../Dashboard/MapWithEVStations";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  auth: { userDetails: { isAdmin: true } },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});
it("renders the map", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MapWithEVStations />
    </Provider>
  );
  expect(getByTestId("map")).toBeInTheDocument();
});

it("renders markers on the map", async () => {
  const { findAllByTestId } = render(
    <Provider store={store}>
      <MapWithEVStations />
    </Provider>
  );
  const markers = await findAllByTestId("marker");
  expect(markers).toHaveLength(10); // assuming the mock api call returns 10 stations
});

it("renders the EVStationCard component", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MapWithEVStations />
    </Provider>
  );
  expect(getByTestId("ev-station-card")).toBeInTheDocument();
});

it("clicking the Next button changes the current card to the next one", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MapWithEVStations />
    </Provider>
  );
  const nextButton = getByTestId("next-button");
  fireEvent.click(nextButton);
  expect(getByTestId("current-card")).toHaveTextContent("2");
});

it("clicking the Previous button changes the current card to the previous one", () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <MapWithEVStations />
    </Provider>
  );
  const previousButton = getByTestId("previous-button");
  fireEvent.click(previousButton);
  expect(getByTestId("current-card")).toHaveTextContent("0");
});
