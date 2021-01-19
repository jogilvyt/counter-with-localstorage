import { renderHook, act } from "@testing-library/react-hooks";

import useStateWithLocalStorage from "./useStateWithLocalStorage";

const TEST_KEY = "key";
const TEST_VALUE = { test: "test" };

describe("useStateWithLocalStorage", () => {
  it("should set localStorage with default value", () => {
    renderHook(() => useStateWithLocalStorage(TEST_VALUE, TEST_KEY));
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(TEST_VALUE);
  });

  it("should set the default value from localStorage if it exists", () => {
    // set the localStorage to the test value
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));

    // initialise with an empty object
    renderHook(() => useStateWithLocalStorage({}, TEST_KEY));

    // expect value to be taken from localStorage (rather than empty object)
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(TEST_VALUE);
  });

  it("should update localStorage when state changes", () => {
    // initialise with test object
    const { result } = renderHook(() =>
      useStateWithLocalStorage(TEST_VALUE, TEST_KEY)
    );

    const [, setValue] = result.current;

    // set the state to something new
    const newValue = { anotherValue: "Some value" };
    act(() => {
      setValue(newValue);
    });

    // localStorage should have updated to new value
    expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(newValue);
  });
});
