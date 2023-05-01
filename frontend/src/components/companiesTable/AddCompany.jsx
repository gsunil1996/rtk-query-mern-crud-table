import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import NotificationDialog from '../notifications/NotificationDialog';
import { useAddComapnyDataMutation } from '../../redux/features/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddCompany = (props) => {

    const { addCompanyOpen, setAddCompanyOpen } = props;

    const [inputdata, setInputData] = useState({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        gender: "",
        location: "",
        status: "active"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value })
    }

    const [addTableData, { isLoading, isSuccess, isError, error, reset }] = useAddComapnyDataMutation();

    const [successMessage, setSuccessMessage] = useState("")
    const [failureMessage, setFailureMessage] = useState("")
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const handleNotificationClickOpen = () => {
        setNotificationOpen(true);
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
        setSuccessMessage("")
        setFailureMessage("")
    };

    const handleAddCompanyClose = () => {
        setAddCompanyOpen(false)
        setInputData({
            ...inputdata,
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            gender: "",
            location: "",
            status: "active"
        });
    }

    const submitCompanyData = (e) => {
        e.preventDefault();
        addTableData(inputdata)
    }

    useEffect(() => {

        if (isSuccess) {
            setSuccessMessage("User Added Successfully")
            setFailureMessage("")
            handleAddCompanyClose()
            handleNotificationClickOpen()
            reset()
        } else if (isError) {
            setSuccessMessage("")
            setFailureMessage("Something Went Wrong")
            handleNotificationClickOpen()
            reset()
        }

    }, [isSuccess, isError])


    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={addCompanyOpen}
                onClose={handleAddCompanyClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="customized-dialog-title">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                        <div>
                            Add Employee
                        </div>
                        <div>
                            <CancelIcon
                                onClick={handleAddCompanyClose}
                                style={{ fontSize: "30px", cursor: "pointer", color: "#3F51B5" }} />
                        </div>
                    </div>

                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={submitCompanyData} >
                        <Grid container spacing={2} >
                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <TextField id="outlined-basic" label="Enter FirstName" variant="outlined" fullWidth name='fname' value={inputdata.fname} onChange={handleChange} required />
                            </Grid>

                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <TextField id="outlined-basic" label="Enter LastName" variant="outlined" fullWidth name='lname' value={inputdata.lname} onChange={handleChange} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <TextField id="outlined-basic" label="Enter Email" variant="outlined" fullWidth name='email'
                                    type="email"
                                    value={inputdata.email}
                                    onChange={handleChange}
                                    required />
                            </Grid>

                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <TextField
                                    id="outlined-basic"
                                    label="Enter Mobile"
                                    variant="outlined"
                                    fullWidth
                                    name='mobile'
                                    type='number'
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                    }}
                                    value={inputdata.mobile}
                                    onChange={handleChange}
                                    required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <FormControl variant="outlined" fullWidth required >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Select Gender
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="gender"
                                        value={inputdata.gender}
                                        onChange={handleChange}
                                        label="Select Gender"
                                    >
                                        <MenuItem value="male">male</MenuItem>
                                        <MenuItem value="female">female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <FormControl variant="outlined" fullWidth required>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Select Status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="status"
                                        value={inputdata.status}
                                        onChange={handleChange}
                                        label="Select Status"
                                    >
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item xs={6} style={{ marginBottom: "15px" }} >
                                <TextField
                                    id="outlined-basic"
                                    label="Enter Your Location"
                                    variant="outlined"
                                    fullWidth
                                    name='location'
                                    value={inputdata.location}
                                    onChange={handleChange}
                                    required />
                            </Grid>
                        </Grid>
                        <Button variant="contained" color='primary' type="submit" fullWidth>
                            {isLoading ? (
                                <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <NotificationDialog notificationOpen={notificationOpen} handleNotificationClose={handleNotificationClose} successMessage={successMessage} failureMessage={failureMessage} />

        </div>
    )
}

export default AddCompany