import { render, fireEvent } from "@testing-library/react";
import AddNewTask from "../Dashboard/AddNewTask";

it("should render the form for adding a new task when the user is an admin", () => {
  const { getByText } = render(<AddNewTask />);

  expect(getByText("Add new task")).toBeInTheDocument();
  expect(getByText("Title")).toBeInTheDocument();
  expect(getByText("Description")).toBeInTheDocument();
  expect(getByText("Time")).toBeInTheDocument();
  expect(getByText("Coins to earn")).toBeInTheDocument();
});

it("should dispatch the 'addTask' action with the correct parameters when the form is submitted and valid", () => {
  const mockDispatch = jest.fn();
  jest.spyOn(ReactRedux, "useDispatch").mockImplementation(() => mockDispatch);

  const { getByLabelText, getByText } = render(<AddNewTask />);

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
