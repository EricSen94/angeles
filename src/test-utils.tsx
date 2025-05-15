// src/test-utils.tsx
import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store"; // ajusta la ruta si tu store está en otro lugar

// Creamos un render que envuelve automáticamente en <Provider>
export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) {
  return rtlRender(<Provider store={store}>{ui}</Provider>, options);
}

// Re-exportamos todo lo demás de Testing Library
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
