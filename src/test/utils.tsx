import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { rootReducer, type RootState } from "../store";

export function renderwithProvider(
  ui: React.ReactElement,
  {
    preloadedState,
    route = "/",
  }: { preloadedState?: Partial<RootState>; route?: string } = {},
) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
}
