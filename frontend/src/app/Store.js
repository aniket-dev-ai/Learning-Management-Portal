import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import { authApi } from "../feature/api/authApi";
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),

});
