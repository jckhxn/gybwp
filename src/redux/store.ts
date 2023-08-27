import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "./reducers/episodeSlice";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: { episodeReducer },
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
