import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-swart-eta.vercel.app/api",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
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
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),

      invalidatesTags: ["books", "borrow"],
    }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["books", "borrow"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBorrowSummaryQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBookMutation,
  useBorrowBookMutation,
} = baseApi;
