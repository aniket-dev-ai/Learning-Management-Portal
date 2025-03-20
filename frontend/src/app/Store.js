import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../feature/api/authApi";
import { userLoggedIn } from "../feature/AuthSlice"; // ✅ Import Redux action
import { courseApi } from "../feature/api/CourseApi";
import { lectureApi } from "../feature/api/LectureApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware , courseApi.middleware , lectureApi.middleware),
});

const initializeApp = async () => {
  try {
    const response = await appStore.dispatch(
      authApi.endpoints.showProfile.initiate({}, { forceRefetch: true })
    );

    if (response?.data) {
      appStore.dispatch(
        userLoggedIn({
          user: response.data.user, // ✅ Redux me user set karo
        })
      );
    }
  } catch (error) {
    console.error("Failed to initialize app:", error);
  }
};

export default initializeApp;
