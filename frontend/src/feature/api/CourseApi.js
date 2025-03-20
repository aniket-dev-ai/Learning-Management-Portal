import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "https://learning-management-portal.onrender.com/api/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: COURSE_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (formdata) => ({
        url: "/createcourse",
        method: "POST",
        body: formdata,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ courseId, ...updatedData }) => ({
        url: `/updatecourse/${courseId}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    getAllAdminCourses: builder.query({
      query: () => ({
        url: "/getalladminCourses",
        method: "GET",
      }),
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `/getcoursedetails/${courseId}`,
        method: "GET",
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/getallCourses",
        method: "GET",
      }),
    }),
    generateCourseWithAI: builder.mutation({
      query: (topic) => ({
        url: "/ai/generate-course",
        method: "POST",
        body: { topic },
      }),
    }),
    generateCourseBuyReasonWithAi: builder.query({
      query: (courseName) => ({
        url: "/ai/generate-courseReasontoBuy",
        method: "POST",
        body: { courseName },
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetAllAdminCoursesQuery,
  useGetCourseDetailsQuery,
  useGetAllCoursesQuery,
  useGenerateCourseWithAIMutation,
  useGenerateCourseBuyReasonWithAiQuery,
} = courseApi;
