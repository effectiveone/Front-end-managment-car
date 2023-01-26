import { render, fireEvent } from "@testing-library/react";
import AddNewAnnouncement from "../Dashboard/AddNewAnnouncement";

it("should set the 'isFormValid' state to true when the form input values are valid", () => {
  const { getByLabelText, getByText } = render(<AddNewAnnouncement />);

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");

  fireEvent.change(titleInput, { target: { value: "Valid Title" } });
  fireEvent.change(descriptionInput, {
    target: { value: "Valid Description" },
  });

  fireEvent.submit(getByText("Add new announcement"));

  expect(getByText("AddNewAnnouncement").state("isFormValid")).toEqual(true);
});

it("should redirect to the Dashboard component when the user is not an admin", () => {
  const { queryByText } = render(<AddNewAnnouncement />);

  expect(queryByText("Add new announcement")).not.toBeInTheDocument();
  expect(queryByText("Dashboard")).toBeInTheDocument();
});

it("should render an 'AlertNotification' component with the 'success' type when the form is submitted and the form is valid", () => {
  const { getByLabelText, getByText } = render(<AddNewAnnouncement />);

  const titleInput = getByLabelText("Title");
  const descriptionInput = getByLabelText("Description");

  fireEvent.change(titleInput, { target: { value: "Valid Title" } });
  fireEvent.change(descriptionInput, {
    target: { value: "Valid Description" },
  });

  fireEvent.submit(getByText("Add new announcement"));

  const alertNotification = getByText("AlertNotification");
  expect(alertNotification).toBeInTheDocument();
  expect(alertNotification.props.typeOfAlert).toEqual("success");
});
