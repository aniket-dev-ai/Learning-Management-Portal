import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../feature/AuthSlice";
import { authApi } from "../feature/api/authApi";
import { courseApi } from "../feature/api/CourseApi";
import { lectureApi } from "../feature/api/LectureApi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [lectureApi.reducerPath]: lectureApi.reducer,
  auth: authReducer,
});
export default rootReducer;
