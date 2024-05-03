
    import { useGetUsersQuery,useDeleteUserByIdMutation,  useUpdateUserByIdMutation  } from "../../../Features/users/usersApiSlice.js";
    import ReactWhatsapp from 'react-whatsapp';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
    import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
    import { faUserPen } from '@fortawesome/free-solid-svg-icons';
    import { useState } from 'react';
    import {
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
    } from '@mui/material';
    import { Button as MuiButton, Dialog as MuiDialog } from '@mui/material';
    import TextField from '@mui/material/TextField';
    import ReactPaginate from 'react-paginate';


        const UsersTable = () => {
            const {
                data: users,
                isLoading,
                isSuccess,
                isError,
                error,
            } = useGetUsersQuery();
            const [deleteUserId, setDeleteUserId] = useState(null);
            const [updateUserId, setUpdateUserId] = useState(null);
            const [deleteUserById] = useDeleteUserByIdMutation();
            const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
            const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
            const [updatedUserData, setUpdatedUserData] = useState({
                firstName: '',
                lastName: '',
                email: '',
                // Add other fields as needed
            });
        
            const [updateUserById] = useUpdateUserByIdMutation();
        
            const handleDeleteUser = async () => {
                try {
                    await deleteUserById(deleteUserId);
                    console.log("User deleted: " + deleteUserId);
                    setDeleteUserId(null);
                    setOpenConfirmationDialog(false);
                    window.location.reload();
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            };
        
            const handleUpdateUser = async () => {
                try {
                    await updateUserById({ id: updateUserId, updatedUserData });
                    console.log("User updated: " + updateUserId);
                    setUpdateUserId(null);
                    setOpenUpdateDialog(false);
                    window.location.reload();
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            };
        
            const handleClickOpenConfirmationDialog = (userId) => {
                setDeleteUserId(userId);
                setOpenConfirmationDialog(true);
            };
        
            const handleClickOpenUpdateDialog = (userId) => {
                setUpdateUserId(userId);
                const userToUpdate = users.find(user => user._id === userId);
                setUpdatedUserData(userToUpdate);
                setOpenUpdateDialog(true);
            };
        
            const handleCloseConfirmationDialog = () => {
                setDeleteUserId(null);
                setOpenConfirmationDialog(false);
            };
        
            const handleCloseUpdateDialog = () => {
                setUpdateUserId(null);
                setOpenUpdateDialog(false);
                setUpdatedUserData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    // Reset other fields as needed
                });
            };
         // Pagination
   
// Pagination
const [pageNumber, setPageNumber] = useState(0);
const usersPerPage = 5;

// Calculate the index of the first and last user to display on the current page
const startIndex = pageNumber * usersPerPage;
const endIndex = Math.min(startIndex + usersPerPage, users ? users.length : 0);

// Calculate pageCount only if users data is available
const pageCount = users ? Math.ceil(users.length / usersPerPage) : 0;

const changePage = ({ selected }) => {
    setPageNumber(selected);
}
            return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Users Accounts
        </h4>

        <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                Full Name
                </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                Birthday
                </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
                </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                Phone Number
                </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                Registration Date
                </h5>
            </div>
            </div>

            {isSuccess &&
                // Display users within the range of startIndex to endIndex
                users.slice(startIndex, endIndex).map((user, key) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                                key === users.length - 1
                                    ? ''
                                    : 'border-b border-stroke dark:border-strokedark'
                            }`}
                            key={key}
                        >
                            {/* User Data */}
                            <div className="flex items-center gap-7 p-2.5 xl:p-5">
                                <p className="hidden text-black dark:text-white sm:block">
                                    {user.firstName} {user.lastName}
                                </p>
                                <button onClick={() => handleClickOpenConfirmationDialog(user._id)}>
                                    <FontAwesomeIcon icon={faUserMinus} />
                                </button>
                                <button onClick={() => handleClickOpenUpdateDialog(user._id)}>
                                    <FontAwesomeIcon icon={faUserPen} />
                                </button>
                            </div>
                            <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                                {new Date(user.birthday).toLocaleDateString()}
                            </div>

                            <div className="flex items-center justify-center p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{user.email}</p>
                            </div>

                            <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                                <ReactWhatsapp element="button" number={user.phoneNumber}>
                                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#63E6BE", }} />
                                    <button className="text-meta-5">{user.phoneNumber}</button>
                                </ReactWhatsapp>
                            </div>
                            <div className="flex items-center justify-center p-2.5 sm:flex xl:p-5">
                                <p className="text-meta-5">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Delete Confirmation Dialog */}
            <MuiDialog
                open={openConfirmationDialog}
                onClose={handleCloseConfirmationDialog}
                PaperProps={{ style: { backgroundColor: '#262a42' } }}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ color: 'white' }}>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <MuiButton onClick={handleCloseConfirmationDialog}>Cancel</MuiButton>
                    <MuiButton onClick={handleDeleteUser} autoFocus>
                        Delete
                    </MuiButton>
                </DialogActions>
            </MuiDialog>

            {/* Update User Dialog */}
            <MuiDialog
                open={openUpdateDialog}
                onClose={handleCloseUpdateDialog}
                PaperProps={{ style: { backgroundColor: '#262a42' } }}
            >
                <DialogTitle style={{ color: 'white' }}>Update User</DialogTitle>
                <DialogContent>
                    {/* Form for updating user details */}
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleUpdateUser();
                        }}
                    >
                        <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedUserData.firstName}
                        onChange={(e) => setUpdatedUserData({ ...updatedUserData, firstName: e.target.value })}
                        InputProps={{ style: { color: 'white' } }}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={updatedUserData.lastName}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, lastName: e.target.value })}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={updatedUserData.email}
                            onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                            InputProps={{ style: { color: 'white' } }}
                        />


                        {/* Dialog Actions */}
                        <DialogActions >
                            <MuiButton onClick={handleCloseUpdateDialog}>Cancel</MuiButton>
                            <MuiButton type="submit">Update</MuiButton>
                        </DialogActions>
                    </form>
                </DialogContent>
            </MuiDialog>
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            containerClassName={"pagination flex flex-row justify-center space-x-4"} // Added flex classes here
            disabledClassName={"pagination__link--disabled"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakLabel={"..."}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            forcePage={pageNumber}
            onPageChange={changePage}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            activeClassName={"active"}
            pageStyle={{
                margin: "0 0.5rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
                color: "#333",
                transition: "background-color 0.3s ease",
            }}
            activeLinkStyle={{
                backgroundColor: "#007bff",
                color: "#fff",
            }}
            />




        </div>
    );
};

    export default UsersTable;
