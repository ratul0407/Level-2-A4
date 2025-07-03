import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useUpdateBookMutation } = baseApi;
