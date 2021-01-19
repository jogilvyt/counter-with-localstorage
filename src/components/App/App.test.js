import { render, fireEvent, screen } from "@testing-library/react";

import App from "./App";

describe("<App />", () => {
  describe("buttons", () => {
    afterEach(() => {
      // reset the mocked localStorage between tests
      localStorage.clear();
    });

    it("should increase the count by 1", () => {
      // render the App and check the default state is correct
      render(<App />);
      screen.getByText(/Number: 0/);

      // click the button and check the count has increased
      const incrementButton = screen.getByText(/\+1/);
      fireEvent.click(incrementButton);
      screen.getByText(/Number: 1/);

      // click the button again to check it increase by 1 a second time
      fireEvent.click(incrementButton);
      screen.getByText(/Number: 2/);
    });

    it("should decrease the count by 1", () => {
      // render the App and check the default state is correct
      render(<App />);
      screen.getByText(/Number: 0/);

      // click the button and check the count has increased
      const decrementButton = screen.getByText(/-1/);
      fireEvent.click(decrementButton);
      screen.getByText(/Number: -1/);

      // click the button again to check it increase by 1 a second time
      fireEvent.click(decrementButton);
      screen.getByText(/Number: -2/);
    });
  });

  describe("persisted state", () => {
    it("should initialise with the value stored in localStorage", () => {
      // set the localStorage to a value other than 0
      localStorage.setItem("count", 15);

      // render the App and check it initialises to the value in localStorage
      render(<App />);
      screen.getByText(/Number: 15/);

      // click the increment button and check the localStorage is updated
      const incrementButton = screen.getByText(/\+1/);
      fireEvent.click(incrementButton);
      screen.getByText(/Number: 16/);
      expect(localStorage.getItem("count")).toBe("16");
    });
  });
});
