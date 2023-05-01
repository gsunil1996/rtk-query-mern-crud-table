import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import NotificationDialog from '../notifications/NotificationDialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useDeleteEmployeeMutation, useGetEmployeesTableQuery } from '../../redux/features/employeesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteEmployee = (props) => {

    const { deleteEmployeeOpen, setDeleteEmployeeOpen, tableRowId, page, setCurrentPage } = props;

    const [deleteEmployee, { isLoading, isError, error, isSuccess, reset }] = useDeleteEmployeeMutation();

    const { refetch } = useGetEmployeesTableQuery({
        search: "", gender: "all", status: "all", sort: "new", page
    });

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

    const handleDeleteEmployeeClose = () => {
        setDeleteEmployeeOpen(false)
    }

    const handleUserDelete = () => {
        deleteEmployee({ id: tableRowId });
    }

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("User Deleted Successfully")
            setFailureMessage("")
            handleDeleteEmployeeClose()
            handleNotificationClickOpen()
            reset();
            sessionStorage.setItem("employeePage", page)
            setCurrentPage(page)
            refetch()
        } else if (isError) {
            setSuccessMessage("")
            setFailureMessage("Something Went Wrong")
            handleNotificationClickOpen()
            reset();
        }
    }, [isError, isSuccess])

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='sm'
                open={deleteEmployeeOpen}
                onClose={handleDeleteEmployeeClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div style={{ textAlign: "center" }} >
                        <h3 style={{ marginTop: "0px" }} >Are you sure to delete this user</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }} >
                        <Button variant="contained" color="primary" onClick={handleDeleteEmployeeClose} >
                            No
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleUserDelete} >
                            {isLoading ? (
                                <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                                "Yes"
                            )}
                        </Button>
                    </div>

                </DialogContent>

            </Dialog>

            <NotificationDialog notificationOpen={notificationOpen} handleNotificationClose={handleNotificationClose} successMessage={successMessage} failureMessage={failureMessage} />
        </div>
    )
}

export default DeleteEmployee