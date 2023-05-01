import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const companiesSlice = createApi({
    reducerPath: 'companiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000"
    }),
    tagTypes: ['companiesTagTypes'],
    endpoints: (builder) => ({
        getcompaniesTable: builder.query({
            query: ({ search, gender, status, sort, page }) => `/companiesTable?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
            providesTags: ['companiesTagTypes']
        }),
        addComapnyData: builder.mutation({
            query: (body) => ({
                url: '/addCompany',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['companiesTagTypes']
        }),
        getSingleCompanyDetails: builder.query({
            query: (id) => `/companiesTable/${id}`,
            providesTags: ['companiesTagTypes']
        }),
        updateCompanyDetails: builder.mutation({
            query: ({ _id, ...rest }) => {
                // console.log("checkUpdateInsideRTK-Query", _id, rest)
                return {
                    url: `/updateCompanyDetails/${_id}`,
                    method: 'PATCH',
                    body: rest
                };
            },
            invalidatesTags: ['companiesTagTypes']
        }),
        deleteCompany: builder.mutation({
            query: ({ id }) => ({
                url: `/deleteCompany/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['companiesTagTypes']
        })
    })
})
export const { useGetcompaniesTableQuery, useAddComapnyDataMutation, useGetSingleCompanyDetailsQuery, useUpdateCompanyDetailsMutation, useDeleteCompanyMutation } = companiesSlice;