import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const employeesSlice = createApi({
    reducerPath: 'employeesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ['employeesTagTypes'],
    endpoints: (builder) => ({

        getEmployeesTable: builder.query({
            query: ({ search, gender, status, sort, page }) => `/employeesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
            providesTags: ['employeesTagTypes']
        }),
        addEmployeeTableData: builder.mutation({
            query: (body) => ({
                url: '/addEmployee',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['employeesTagTypes']
        }),
        getSingleEmployeeDetails: builder.query({
            query: (id) => `/employeesTable/${id}`,
            // providesTags: ['employeesTagTypes']
        }),

        updateEmployeeDetails: builder.mutation({
            query: ({ _id, ...rest }) => {
                //  console.log("checkUpdateInsideRTK-Query", _id, rest)
                return {
                    url: `/updateEmployeeDetails/${_id}`,
                    method: 'PATCH',
                    body: rest
                };
            },
            invalidatesTags: ['employeesTagTypes']
        }),
        deleteEmployee: builder.mutation({
            query: ({ id }) => ({
                url: `/deleteEmployee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['employeesTagTypes']
        })
    })
})

export const { useGetEmployeesTableQuery, useAddEmployeeTableDataMutation, useGetSingleEmployeeDetailsQuery, useUpdateEmployeeDetailsMutation, useDeleteEmployeeMutation } = employeesSlice;