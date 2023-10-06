import React from 'react'
import { useGetUsersListQuery } from '../../redux/features/usersSlice'

const UsersList = () => {
  const { data, isFetching, isError, error, isSuccess, } = useGetUsersListQuery()
  return (
    <div>
      {isFetching ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Loading...
        </div>
      ) : isError ? (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <h4>{error.status}</h4>
        </div>
      ) : data?.data?.length == 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>No Data Found</h1>
        </div>
      ) : isSuccess ? (
        <>
          {
            data?.data?.map(item => <div>
              <ul>
                <li>{item.first_name}</li>
              </ul>
            </div>)
          }
        </>
      ) : ""}
    </div>
  )
}

export default UsersList