import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import NotificationDialog from '../notifications/NotificationDialog';
import CircularProgress from '@mui/material/CircularProgress';
import { useDeleteCompanyMutation } from '../../redux/features/companiesSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteComapny = (props) => {

    const { deleteCompanyOpen, setDeleteCompanyOpen, tableRowId } = props;

    const [deleteCompany, { isLoading, isError, error, isSuccess, reset }] = useDeleteCompanyMutation();

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

    const handleDeleteCompanyClose = () => {
        setDeleteCompanyOpen(false)
    }

    const handleCompanyDelete = () => {
        deleteCompany({ id: tableRowId });
    }

    useEffect(() => {
        if (isSuccess) {
            setSuccessMessage("User Deleted Successfully")
            setFailureMessage("")
            handleDeleteCompanyClose()
            handleNotificationClickOpen()
            reset();
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
                open={deleteCompanyOpen}
                onClose={handleDeleteCompanyClose}
                TransitionComponent={Transition}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div style={{ textAlign: "center" }} >
                        <h3 style={{ marginTop: "0px" }} >Are you sure to delete this user</h3>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" }} >
                        <Button variant="contained" color="primary" onClick={handleDeleteCompanyClose} >
                            No
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleCompanyDelete} >
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

export default DeleteComapny