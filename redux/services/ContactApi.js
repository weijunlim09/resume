import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  tagTypes: ["Contacts"], // auto refetching
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3004/",
  }),
  endpoints: (builder) => ({
    contacts: builder.query({
      query: () => "/contact",
      providesTags: ["Contacts"], // auto refetching
    }),
    contactType: builder.query({
      query: (type = "SchoolEmail") => {
        return `/contact/?type=${type}`;
      },
      providesTags: ["Contacts"],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ type, ...rest }) => ({
        url: `/contact?type=${type}`,
        method: "POST",
        body: rest,
      }),
    }),
    deleteContact: builder.mutation({
      query: (type) => ({
        url: `/contact?type=${type}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useContactsQuery,
  useContactTypeQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;

// use createAsyncThunk for async await functions - if using axios/fetch
// delete, update will not work since to return is array not object
