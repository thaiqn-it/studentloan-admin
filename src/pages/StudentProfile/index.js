import { Box, Divider, DialogActions, Grid, DialogContentText, Paper, Dialog, DialogTitle, Avatar, DialogContent, Button, TextField, Typography, Modal, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'

import DetailAccountCard from './components/DetailAccountCard'
import PaperCard from './components/PaperCard'
import AchievementCard from './components/AchievementCard'
import TableTutor from './components/TableTutor'

import CheckIcon from '@mui/icons-material/Check'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';
import { studentApi } from '../../apis/student'
import { userApi } from '../../apis/user'
import { USER_STATUS } from '../../constants/enum'

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export default function StudentProfile(props) {
    var userId = props.userId

    const [isChange, setIsChange] = useState("");
    const [reason, setReason] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const [student, setStudent] = useState({});
    const [user, setUser] = useState({});
    // const [userStatus, setUserStatus] = useState([]);
    const [openConfirmUnBan, setOpenConfirmUnBan] = useState(false);
    const handleOpenConfirmUnBan = () => setOpenConfirmUnBan(true);
    const handleCloseConfirmUnBan = () => setOpenConfirmUnBan(false);
    const [openConfirmApprove, setOpenConfirmApprove] = useState(false);
    const handleOpenConfirmApprove = () => setOpenConfirmApprove(true);
    const handleCloseConfirmApprove = () => setOpenConfirmApprove(false);
    const [openBanConfirm, setOpenBanConfirm] = useState(false);
    const handleOpenBanConfirm = () => setOpenBanConfirm(true);
    const handleCloseBanConfirm = () => setOpenBanConfirm(false);



    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(userId)
            // const student = res.data.student
            const user = res.data.student.User
            // const userStatus = res.data.student.User.UserStatuses[0]
            setUser(user)
            // setStudent(student)
            // setUserStatus(userStatus)
        }
        fetchData()
    }, [isChange])

    const appoveUser = (user) => {
        setIsChange("approve user")
        handleCloseConfirmApprove()
        userApi.update({...user, status:USER_STATUS.VERIFIED})
    }

    const confirmDeny = (user) => {
        setIsChange("deny user")
        handleClose()
        setReason("")
        userApi.update({...user, status:USER_STATUS.UNVERIFIED, reason:reason})
    }

    const confirmBan = (user) => {
        setIsChange("ban user")
        handleCloseBanConfirm()
        userApi.update({...user, status:USER_STATUS.BAN, reason:reason})
        setReason("")
    }


    const confirmUnBan = (user) => {
        setIsChange("unban user")
        handleCloseConfirmUnBan()
        userApi.update({...user, status:USER_STATUS.UNVERIFIED})
    }

    const buttonBaseOnStatus = (user) => {
        if (user.status === 'BAN') {
            return (
                <Grid
                    sx={{
                        marginTop: 1,
                        marginLeft:1,
                    }}>
                    <Button
                        size="medium"
                        onClick={handleOpenConfirmUnBan}
                        type="submit"
                        color="primary"
                        variant="contained"
                        endIcon={<LockOpenIcon />}
                    >
                        Bỏ chặn
                    </Button>
                </Grid>
            )
        }else{
            return (
                <Grid
                    sx={{
                        marginTop: 1,
                        marginLeft:1,
                    }}>
                    <Button
                        size="medium"
                        onClick={handleOpenBanConfirm}
                        type="submit"
                        color="error"
                        variant="contained"
                        endIcon={<BlockIcon />}
                    >
                        Chặn
                    </Button>
                    <Modal
                        open={openBanConfirm}
                        onClose={handleCloseBanConfirm}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Lý do chặn
                            </Typography>
                            <TextField multiline onChange={(event) => setReason(event.target.value)} value={reason} fullWidth id="modal-modal-description" sx={{ mt: 2 }} />
                            <Button
                                onClick={() => confirmBan(user)}
                                size="large"
                                sx={{ marginTop: 1 }}
                                type="submit"
                                variant="contained"
                                endIcon={<CheckIcon />}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                onClick={handleCloseBanConfirm}
                                sx={{ marginTop: 1, marginLeft: 1 }}
                                size="large"
                                type="submit"
                                color="error"
                                variant="contained"
                                endIcon={<CloseIcon />}
                            >
                                Từ bỏ
                            </Button>
                        </Box>
                    </Modal>
                </Grid>
            )
        }

    }

    const statusOfUser = (user) => {
        if (user.status === 'PENDING') {
            return (
                <>
                    <Typography
                        variant="h6"
                        sx={{ margin: 1 }}
                        fontWeight="regular"
                        alignItems="center"
                        color="secondary"
                        display="flex"
                    >
                        <RestartAltIcon color="secondary" /> Đang chờ xét duyệt
                    </Typography>
                    <Button
                        onClick={handleOpenConfirmApprove}
                        size="medium"
                        sx={{ margin: 1 }}
                        type="submit"
                        variant="contained"
                        endIcon={<CheckIcon />}
                    >
                        Xét duyệt
                    </Button>
                    <Button
                        onClick={handleOpen}
                        size="medium"
                        sx={{ margin: 1 }}
                        type="submit"
                        color="error"
                        variant="contained"
                        endIcon={<CloseIcon />}
                    >
                        Từ chối
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Lý do từ chối
                            </Typography>
                            <TextField multiline onChange={(event) => setReason(event.target.value)} value={reason} fullWidth id="modal-modal-description" sx={{ mt: 2 }} />
                            <Button
                                onClick={() => confirmDeny(user)}
                                size="large"
                                sx={{ marginTop: 1 }}
                                type="submit"
                                variant="contained"
                                endIcon={<CheckIcon />}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                onClick={handleClose}
                                sx={{ marginTop: 1, marginLeft: 1 }}
                                size="large"
                                type="submit"
                                color="error"
                                variant="contained"
                                endIcon={<CloseIcon />}
                            >
                                Từ bỏ
                            </Button>
                        </Box>
                    </Modal>
                </>
            )
        }
        if (user.status === 'VERIFIED') {
            return (
                <>
                    <Typography
                        variant="h6"
                        sx={{ margin: 1 }}
                        fontWeight="regular"
                        alignItems="center"
                        display="flex"
                        color="primary"
                    >
                        <CheckIcon color="primary" /> Đã xác thực
                    </Typography>
                </>
            )
        }
        if (user.status === 'BAN') {
            return (
                <>
                    <Typography
                        variant="h6"
                        sx={{ margin: 1 }}
                        fontWeight="regular"
                        alignItems="center"
                        display="flex"
                        color="error"
                    >
                        <CloseIcon color="error" /> Bị chặn
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ margin: 1 }}
                        fontWeight="regular"
                        alignItems="center"
                        display="flex"
                    >
                        Lý do: {user.reason}
                    </Typography>
                </>
            )
        } else {
            return (
                <>
                    <Typography
                        variant="h6"
                        sx={{ margin: 1 }}
                        fontWeight="regular"
                        alignItems="center"
                        display="flex"
                        color="error"
                    >
                        <CloseIcon color="error" /> Chưa xác thực
                    </Typography>
                </>
            )
        }
    }

    return (
        <>
            <Typography color="secondary" variant="h4" my={2}>
                Thông tin tài khoản
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ borderRadius: '10px' }}>
                        <Box p={2}>
                            <Box
                                elevation={2}
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Avatar
                                    sx={{ cursor: 'pointer', height: "200px", width: "200px" }}
                                    alt="Student"
                                    bgColor="light"
                                    src={user.profileUrl}
                                />
                                <Typography
                                    variant="h4"
                                    fontWeight="regular"
                                >
                                    {user.firstName} {user.lastName}
                                </Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        margin: 1
                                    }}
                                    fontWeight="regular"
                                >
                                    Trạng thái hiện tại
                                </Typography>
                                {statusOfUser(user)}
                            </Box>
                            <Divider />
                            {buttonBaseOnStatus(user)}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <DetailAccountCard userId={userId} />
                </Grid>
            </Grid>
            <Card
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                }}>
                <TableTutor
                    userId={userId}
                />
            </Card>
            <Typography color="secondary" variant="h4" my={2}>
                Giấy tờ
            </Typography>
            <PaperCard userId={userId} />
            <Typography color="secondary" variant="h4" my={2}>
                Các thành tựu đạt được
            </Typography>
            <AchievementCard userId={userId} />

            {/* confirmUnban Dialog */}
            <Dialog
                open={openConfirmUnBan}
                onClose={handleCloseConfirmUnBan}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc về quyết định này"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thay đổi sẽ được cập nhật vào hệ thống!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleCloseConfirmUnBan}>Từ bỏ</Button>
                    <Button onClick={()=>confirmUnBan(user)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>

            {/* confirmApprove Dialog */}
            <Dialog
                open={openConfirmApprove}
                onClose={handleCloseConfirmApprove}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc về quyết định này"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thay đổi sẽ được cập nhật vào hệ thống!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleCloseConfirmApprove}>Từ bỏ</Button>
                    <Button onClick={()=>appoveUser(user)} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}