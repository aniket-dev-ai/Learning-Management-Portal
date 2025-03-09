import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const LECTURE_API = "http://localhost:4000/api/lecture";

export const lectureApi = createApi({
  reducerPath: "lectureApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: LECTURE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: (data) => ({
        url: "/createLecture",
        method: "POST",
        body: data,
      }),
    }),
    getLecturesByCourseId: builder.query({
      query: (courseId) => `/${courseId}`,
    }),
    getLectureById: builder.query({
      query: (lectureId) => `/single/${lectureId}`, // ✅ API Call for Single Lecture
    }),
    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/delete/${lectureId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { 
  useCreateLectureMutation, 
  useGetLecturesByCourseIdQuery, 
  useGetLectureByIdQuery ,
  useDeleteLectureMutation
} = lectureApi;
