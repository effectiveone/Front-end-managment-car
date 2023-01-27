import { render, screen } from "@testing-library/react";
import AdminTaskTable from "../Dashboard/AdminTaskTable";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({
  auth: { userDetails: { isAdmin: true } },
  drawer: { drawerState: true },
  wallet: { coins: 200 },
});

describe("AdminTaskTable", () => {
  const tasks = [
    {
      title: "task 1",
      description: "description 1",
      time: "1 hour",
      coinsToEarn: "10",
      status: "completed",
      responsivePerson: "John Doe",
      createdAt: "2022-01-01"
    },
    {
      title: "task 2",
      description: "description 2",
      time: "2 hours",
      coinsToEarn: "20",
      status: "in progress",
      responsivePerson: "Jane Doe",
      createdAt: "2022-01-02"
    },
    {
      title: "task 3",
      description: "description 3",
      time: "3 hours",
      coinsToEarn: "30",
      status: "in progress",
      responsivePerson: "Jane Doe",
      createdAt: "2022-01-03"
    },
  ];

  beforeEach(() => {
    jest.spyOn(useSelector, "useSelector").mockImplementation((selector) => {
      if (selector === state => state.task.allTasks) {
        return tasks;
        }
      if (selector === state => state.auth.user) {
        return { isAdmin: true };
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display the tasks in a table", () => {
    render(
      <Provider store={store}>
      <AdminTaskTable />
    </Provider>
    );

    tasks.forEach((task) => {
      expect(screen.getByText(task.title)).toBeInTheDocument();
      expect(screen.getByText(task.description)).toBeInTheDocument();
      expect(screen.getByText(task.time)).toBeInTheDocument();
      expect(screen.getByText(task.coinsToEarn)).toBeInTheDocument();
      expect(screen.getByText(task.status)).toBeInTheDocument();
      expect(screen.getByText(task.responsivePerson)).toBeInTheDocument();
      expect(screen.getByText(task.createdAt)).toBeInTheDocument();
    });
  });
});
