import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/user/users",
            keepUnusedDataFor: 5,
        }),
        deleteUserById: builder.mutation({
            query: (userId) => ({
                url: `/user/users/${userId}`,
                method: "DELETE",
            }),
        }),
        updateUserById: builder.mutation({
            query: ({ id, updatedUserData }) => ({
                url: `/user/users/${id}`,
                method: "PUT",
                body: updatedUserData,
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useDeleteUserByIdMutation,
    useUpdateUserByIdMutation,
} = usersApiSlice;
