import React from "react";
import { shallow } from "enzyme";
import AddNewAnnouncement from "../Dashboard/AddNewAnnouncement";
import InputWithLabel from "../shared/components/InputWithLabel";
import Layout from "../shared/components/Layout";

describe("AddNewAnnouncement component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddNewAnnouncement />);
  });

  it("should render a form", () => {
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("should render two InputWithLabel components", () => {
    expect(wrapper.find(InputWithLabel).length).toBe(2);
  });

  it("should render a Layout component", () => {
    expect(wrapper.find(Layout).exists()).toBe(true);
  });

  it("should render a submit button", () => {
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });

  it("should update the title state when the title input is changed", () => {
    const titleInput = wrapper.find(InputWithLabel).first();
    titleInput.simulate("change", { target: { value: "Test title" } });
    expect(wrapper.state("title")).toBe("Test title");
  });

  it("should update the description state when the description input is changed", () => {
    const descriptionInput = wrapper.find(InputWithLabel).at(1);
    descriptionInput.simulate("change", {
      target: { value: "Test description" },
    });
    expect(wrapper.state("description")).toBe("Test description");
  });
});
