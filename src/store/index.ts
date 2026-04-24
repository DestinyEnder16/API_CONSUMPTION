import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    // api.reducerPath evaluates to 'api' by default
    [api.reducerPath]: api.reducer,
  },

  /*
  Since, we are using RTK Query, we need to add its middleware to the store

  Middleware runs between an action being dispatched and the reducer receiving it

  api.middleware() performs the HTTP requests and handles caching/invalidation.
  */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// enables optional auto-refetch behaviors
setupListeners(store.dispatch);
