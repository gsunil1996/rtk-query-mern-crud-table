import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import moment from "moment";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useGetSingleEmployeeDetailsQuery } from '../../redux/features/employeesSlice';
import { skipToken } from "@reduxjs/toolkit/dist/query";

const EmployeesProfile = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const { data, isFetching, isError, error, isSuccess } = useGetSingleEmployeeDetailsQuery(id ? id : skipToken)

    // console.log(data, "checkSingleEmployeeData")

    return isFetching ? (
        <div style={{ width: "100%", marginTop: "20px" }}>
            <CircularProgress />
        </div>
    ) : isError ? (
        <div style={{ width: "100%", marginTop: "20px", textAlign: "center" }}>
            <h1>{error}</h1>
        </div>
    ) : isSuccess ? (
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ maxWidth: "max-content", margin: "auto" }}>
                    <Card variant="outlined" style={{ marginTop: "20px" }}>
                        <CardContent>
                            <div>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back
                                </Button>
                            </div>
                            <div className="text-center">
                                <h3>{data?.fname + " " + data?.lname}</h3>
                                <h4>Email: {data?.email}</h4>
                                <h5>Phone Number: {data?.mobile}</h5>
                                <h4>Gender: {data?.gender}</h4>
                                <h4>Location: {data?.location}</h4>
                                <h4>Status: {data?.status}</h4>
                                <h5>
                                    Date Created:-
                                    {moment(data?.datecreated).format("DD-MM-YYYY")}
                                </h5>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    ) : ""
}

export default EmployeesProfile