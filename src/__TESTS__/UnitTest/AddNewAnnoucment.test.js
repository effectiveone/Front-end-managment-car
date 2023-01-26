// Unit Test Code
import React from "react";
import { shallow } from "enzyme";
import AddNewAnnouncement from "../../Dashboard/AddNewAnnouncement";
import { useDispatch, useSelector } from "react-redux";
import { addAnnouncement } from "../../store/actions/announcementActions";
import { validateAnnouncementForm } from "../../shared/utils/validators";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("../../store/actions/announcementActions", () => ({
  addAnnouncement: jest.fn(),
}));
jest.mock("../../shared/utils/validators", () => ({
  validateAnnouncementForm: jest.fn(),
}));

describe("AddNewAnnouncement component", () => {
  let wrapper;

  beforeEach(() => {
    useDispatch.mockImplementation(() => jest.fn()); // mock dispatch function to be used in component

    wrapper = shallow(<AddNewAnnouncement />); // render component in shallow mode
  });

  it("should render the component", () => {
    // check if the component is rendered properly or not

    expect(wrapper).toMatchSnapshot(); // check if the snapshot of the component is same as expected or not
  });
});
