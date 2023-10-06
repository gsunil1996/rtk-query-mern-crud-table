import { usersApiSlice } from "../api/userApiSlice";

export const usersSlice = usersApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersList: builder.query({
      query: () => "/users",
      providesTags: ["userTagTypes"],
    }),
  }),
});

export const { useGetUsersListQuery } = usersSlice;
