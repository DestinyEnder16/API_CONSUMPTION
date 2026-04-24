import { UserIdentification } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // the default reducerPath is 'api'
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserIdentification[], void>({
      query: () => "/users",
    }),
    // builder.query<ResultType, ArgType>
    getUserById: builder.query<UserIdentification, number>({
      query: (id) => `/users/?id=${id}`,
    }),
  }),
});

// RTK Query auto-generates hooks based on the endpoints defined above
export const { useGetUsersQuery, useGetUserByIdQuery } = api;
