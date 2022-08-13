import { configureStore } from "@reduxjs/toolkit";
import { contactsApi } from "./services/ContactApi";

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(contactsApi.middleware);
  },
});

export default store;
