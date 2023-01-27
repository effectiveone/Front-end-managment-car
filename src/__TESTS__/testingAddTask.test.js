import { render, fireEvent } from "@testing-library/react";
import AddNewTask from "../Dashboard/AddNewTask";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  auth: { userDetails: { isAdmin: true } },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});

it("should render the form for adding a new task when the user is an admin", () => {
  const { getByText } = render(
    <Provider store={store}>
      <AddNewTask />
    </Provider>
  );

  expect(getByText("Add new task")).toBeInTheDocument();
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Time")).toBeInTheDocument();
  expect(getByText("Coins to earn")).toBeInTheDocument();
});

it("should dispatch the 'addTask' action with the correct parameters when the form is submitted and valid", () => {
  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <AddNewTask />
    </Provider>
  );

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const timeInput = getByLabelText("Time");
  const coinsToEarnInput = getByLabelText("Coins to earn");

  fireEvent.change(titleInput, { target: { value: "Valid Title" } });
  fireEvent.change(descriptionInput, {
    target: { value: "Valid Description" },
  });
  fireEvent.change(timeInput, { target: { value: "Valid Time" } });
  fireEvent.change(coinsToEarnInput, {
    target: { value: "Valid Coins to earn" },
  });

  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user ?? localUser;

  fireEvent.submit(getByText("Add new task"));
  expect(mockDispatch).toHaveBeenCalledWith(
    addTask(
      {
        title: "Valid Title",
        description: "Valid Description",
        time: "Valid Time",
        coinsToEarn: "Valid Coins to earn",
      },
      currentUser
    )
  );
});

it("should show error messages when the form is submitted with invalid inputs", () => {
  const { getByLabelText, getByText } = render(<AddNewTask />);

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");
  const timeInput = getByLabelText("Time");
  const coinsToEarnInput = getByLabelText("Coins to earn");

  fireEvent.change(titleInput, { target: { value: "" } });
  fireEvent.change(descriptionInput, { target: { value: "" } });
  fireEvent.change(timeInput, { target: { value: "" } });
  fireEvent.change(coinsToEarnInput, { target: { value: "" } });

  fireEvent.submit(getByText("Add new task"));

  expect(getByText("Title is required")).toBeInTheDocument();
  expect(getByText("Description is required")).toBeInTheDocument();
  expect(getByText("Time is required")).toBeInTheDocument();
  expect(getByText("Coins to earn is required")).toBeInTheDocument();
});
