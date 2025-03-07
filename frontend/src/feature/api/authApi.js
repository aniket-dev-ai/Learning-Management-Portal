import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../AuthSlice";
const USER_API = "http://localhost:4000/api/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        message: "Registration successful",
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userLoggedIn(data.user));
          console.log("Login successful:", data);
          localStorage.setItem("user", JSON.stringify(data.token));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    editProfile: builder.mutation({
      query: (userData) => ({
        url: "/edit",
        method: "PUT",
        body: userData,
      }),
    }),
    showProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useEditProfileMutation,
  useShowProfileQuery,
} = authApi;
