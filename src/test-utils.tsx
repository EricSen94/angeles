import { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./features/appSlice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {}

export function render(ui: ReactElement, options?: ExtendedRenderOptions) {
  const store = configureStore({
    reducer: { app: appReducer },
  });

  return rtlRender(<Provider store={store}>{ui}</Provider>, options);
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
