import { render, cleanup, fireEvent } from "@testing-library/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MyTasks from "../Dashboard/MyTasks";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { fetchMyTasks } from "../store/actions/taskActions";

const mockStore = configureMockStore();

jest.mock("../store/actions/taskActions", () => ({
  updateTask: jest.fn(),
  fetchMyTasks: jest.fn(),
}));

const store = mockStore({
  task: {
    myTasks: {
      tasks: [
        {
          _id: "1",
          title: "Task 1",
          status: "Requested",
          coinsToEarn: 10,
        },
        {
          _id: "2",
          title: "Task 2",
          status: "To do",
          coinsToEarn: 20,
        },
      ],
    },
  },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});

describe("MyTasks component", () => {
  afterEach(cleanup);

  it("Should display the tasks in the correct columns", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyTasks />
      </Provider>
    );
    const requestedColumn = getByTestId("Requested");
    const todoColumn = getByTestId("To do");
    const inProgressColumn = getByTestId("In Progress");
    const doneColumn = getByTestId("Done");

    expect(requestedColumn.children.length).toBe(2);
    expect(todoColumn.children.length).toBe(1);
    expect(inProgressColumn.children.length).toBe(1);
    expect(doneColumn.children.length).toBe(0);
  });

  it("Should update the task status in the store when a task is moved to a different column", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyTasks />
      </Provider>
    );
    const requestedColumn = getByTestId("Requested");
    const todoColumn = getByTestId("To do");
    const taskId = requestedColumn.children[0].getAttribute("data-task-id");

    fireEvent.dragStart(requestedColumn.children[0]);
    fireEvent.dragEnter(todoColumn);
    fireEvent.drop(todoColumn);

    expect(updateTask).toHaveBeenCalledWith(taskId, localUser.mail, "To do");
  });

  it("Should add coins to the user's wallet when a task is moved to the Done column", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MyTasks />
      </Provider>
    );
    const requestedColumn = getByTestId("Requested");
    const doneColumn = getByTestId("Done");
    const taskId = requestedColumn.children[0].getAttribute("data-task-id");
    const task = tasks.tasks.find((t) => t._id === taskId);

    fireEvent.dragStart(requestedColumn.children[0]);
    fireEvent.dragEnter(doneColumn);
    fireEvent.drop(doneColumn);

    expect(addCoins).toHaveBeenCalledWith(
      task.coinsToEarn,
      localUser.mail,
      localUser.token,
      task.title
    );
  });
});
