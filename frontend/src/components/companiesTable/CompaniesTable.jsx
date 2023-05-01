import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { useGetcompaniesTableQuery } from '../../redux/features/companiesSlice';
import AddCompany from './AddCompany';
import EditComapny from './EditComapny';
import DeleteComapny from './DeleteComapny';

const columns = [
    {
        id: "firstName",
        label: "Company Name",
        minwidth: 60,
        align: "left",
        background: "#603F83FF"
    },
    {
        id: "lastName",
        label: "Name",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },

    {
        id: "email",
        label: "Email",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },
    {
        id: "phoneNumber",
        label: "Phone Number",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },
    {
        id: "gender",
        label: "Gender",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },
    {
        id: "status",
        label: "Status",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },
    {
        id: "location",
        label: "Location",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },
    {
        id: "date",
        label: "Date",
        minwidth: 60,
        align: "left",
        background: "#603F83FF",
    },

    {
        id: "actions",
        label: "Actions",
        minwidth: 60,
        align: "center",
        background: "#603F83FF",
    },
];

const CompaniesTable = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");
    const [status, setStatus] = useState("all");
    const [sort, setSort] = useState("new");
    const [currentPage, setCurrentPage] = useState(1);
    const [tableRowId, setTableRowId] = useState("");

    const [addCompanyOpen, setAddCompanyOpen] = React.useState(false);
    const [editCompanyOpen, setEditCompanyOpen] = React.useState(false);
    const [deleteCompanyOpen, setDeleteCompanyOpen] = useState(false);


    const { data, isFetching, isError, isSuccess, error, refetch } = useGetcompaniesTableQuery({
        search, gender, status, sort, page: currentPage
    });

    // console.log("checkComaniesData", data)

    const handleAddCompanyClickOpen = () => {
        setAddCompanyOpen(true);
    };

    const handleEditCompanyClickOpen = () => {
        setEditCompanyOpen(true);
    };

    const handleEditClick = (e, id) => {
        setTableRowId(id);
        handleEditCompanyClickOpen()
    }

    const handleDeleteCompanyClickOpen = () => {
        setDeleteCompanyOpen(true);
    }
    const handleDeleteClick = (e, id) => {
        setTableRowId(id);
        handleDeleteCompanyClickOpen()
    }

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearch = (searchedVal) => {
        setText(searchedVal)
        setCurrentPage(1);
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setCurrentPage(1);
    };

    const requestSearch = () => {
        setSearch(text)
    }

    const handleViewClick = (e, id) => {
        navigate(`/companiesTable/${id}`)
    }

    useEffect(() => {
        if (text == "") {
            setSearch("")
            setCurrentPage(1);
        }
    }, [text])

    // useEffect(() => {
    //     refetch()
    // }, [])

    return (
        <div>
            <div> <h1>Companies Representatives Table</h1> </div>
            <div
                style={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "auto"
                }}
            >
                <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                    <TextField id="standard-basic" label="Search" variant="standard" type="search"
                        value={text}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={() => requestSearch()} >Search</Button>
                </div>

                <div>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={gender}
                            onChange={handleGenderChange}
                            row
                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleStatusChange}
                            label="Status"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">active</MenuItem>
                            <MenuItem value="inactive">inactive</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={sort}
                            onChange={handleSortChange}
                            label="Sort"
                        >
                            <MenuItem value="new">new</MenuItem>
                            <MenuItem value="old">old</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddCompanyClickOpen()}
                    >
                        Add User
                    </Button>
                </div>

            </div>
            {isFetching ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                </div>
            ) : isError ? (
                <div
                    style={{ width: "100%", display: "flex", justifyContent: "center" }}
                >
                    <h4>{error.status}</h4>
                </div>
            ) : data?.companiesTableData.length == 0 ? (
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
                <div style={{ width: "95%", margin: "auto" }}>

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                width: "100%",
                                overflowX: "auto",
                                display: "inline-grid",
                                marginTop: "10px",
                            }}
                        >
                            <TableContainer component={Paper}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        background: column.background,
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data?.companiesTableData?.map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    style={{
                                                        background: "#C7D3D4FF"
                                                    }}
                                                >
                                                    <TableCell align="left" >
                                                        {row.fname}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.lname}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.email}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.mobile}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.gender}
                                                    </TableCell>

                                                    <TableCell align="left">
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.location}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {moment(row.datecreated).format(
                                                            "DD-MM-YYYY hh:mm a"
                                                        )}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                                                            <Button variant="contained" color="success"
                                                                onClick={(event) =>
                                                                    handleViewClick(event, row._id)
                                                                }
                                                            >
                                                                View
                                                            </Button>
                                                            <Button variant="contained" color="secondary"
                                                                onClick={(event) =>
                                                                    handleEditClick(event, row._id)
                                                                }
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button variant="contained" color="error"
                                                                onClick={(event) =>
                                                                    handleDeleteClick(event, row._id)
                                                                }
                                                            >Delete</Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <Pagination
                                    count={data?.Pagination?.pageCount}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    color="primary"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ) : ""}

            {/* add employee dialog */}
            <AddCompany
                addCompanyOpen={addCompanyOpen}
                setAddCompanyOpen={setAddCompanyOpen}
            />

            {/* edit employee dialog */}

            <EditComapny
                editCompanyopen={editCompanyOpen}
                setEditCompanyOpen={setEditCompanyOpen}
                tableRowId={tableRowId}
            />

            {/* delete employee dialog */}
            <DeleteComapny
                deleteCompanyOpen={deleteCompanyOpen}
                setDeleteCompanyOpen={setDeleteCompanyOpen}
                tableRowId={tableRowId}
            />

        </div>
    )
}

export default CompaniesTable