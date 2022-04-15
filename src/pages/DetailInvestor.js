import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Page from "../components/Page";
import { Avatar, Card, Modal, Button, Container, Box, Grid, Typography, Badge, TextField, Divider, CardMedia, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { investorApi } from "../apis/investor";
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';

import moment from "moment";

//Icon
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import EventIcon from '@mui/icons-material/Event';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { userApi } from "../apis/user";
import { USER_STATUS } from "../constants/enum";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

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

export default function DetailStudent() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [isChange, setIsChange] = useState(moment().format());
    const [reason, setReason] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [investor, setInvestor] = useState({});
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [openBanConfirm, setOpenBanConfirm] = useState(false);
    const handleOpenBanConfirm = () => setOpenBanConfirm(true);
    const handleCloseBanConfirm = () => setOpenBanConfirm(false);
    const [openConfirmUnBan, setOpenConfirmUnBan] = useState(false);
    const handleOpenConfirmUnBan = () => setOpenConfirmUnBan(true);
    const handleCloseConfirmUnBan = () => setOpenConfirmUnBan(false);
    const [openConfirmApprove, setOpenConfirmApprove] = useState(false);
    const handleOpenConfirmApprove = () => setOpenConfirmApprove(true);
    const handleCloseConfirmApprove = () => setOpenConfirmApprove(false);

    const onBack = () => {
        navigate("/dashboard/user")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await investorApi.getInvestorByUserId(id)
                const investor = res.data
                const user = res.data.User
                setInvestor(investor)
                setUser(user)
            } catch (e) {
                navigate('/404')
            }
        }
        fetchData()
    }, [isChange])

    const appoveUser = (user) => {
        setIsChange(moment().format())
        handleCloseConfirmApprove()
        userApi.update({ ...user, status: USER_STATUS.VERIFIED })
    }

    const confirmDeny = (user) => {
        setIsChange(moment().format())
        handleClose()
        setReason("")
        userApi.update({ ...user, status: USER_STATUS.UNVERIFIED, reason: reason })
    }

    const confirmBan = (user) => {
        setIsChange(moment().format())
        handleCloseBanConfirm()
        userApi.update({ ...user, status: USER_STATUS.BAN, reason: reason })
        setReason("")
    }


    const confirmUnBan = (user) => {
        setIsChange(moment().format())
        handleCloseConfirmUnBan()
        userApi.update({ ...user, status: USER_STATUS.UNVERIFIED })
    }

    const buttonBaseOnStatus = (user) => {
        if (user.status === 'BAN') {
            return (
                <Grid
                    sx={{
                        marginTop: 1,
                        marginLeft: 1,
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
        } else {
            return (
                <Grid
                    sx={{
                        marginTop: 1,
                        marginLeft: 1,
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
        <Page title="Thông tin học sinh">
            <Container>
                <Typography variant='h4' onClick={onBack}>
                    <ArrowBack />
                </Typography>
                <Grid
                    container
                    spacing={2}>

                    <Grid
                        item
                        xs={4}
                    >
                        <Typography sx={{ marginBottom: 1 }} color="secondary.main" variant="h4">Trạng thái hiện tại</Typography>
                        <Card
                            sx={{
                                padding: 1,
                            }}>
                            <Box
                                display="flex"
                                justifyContent="center">
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar sx={{
                                        height: '200px',
                                        width: '200px',
                                    }}
                                        alt="Avatar Student"
                                        src={user.profileUrl}
                                    />
                                </StyledBadge>
                            </Box>
                            {statusOfUser(user)}
                            <Divider sx={{
                                margin: 1,
                            }} color="primary.main" />
                            {buttonBaseOnStatus(user)}
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={8}
                    >
                        <Typography sx={{ marginBottom: 1 }} color="secondary.main" variant="h4">Thông tin người đầu tư</Typography>

                        <Card>
                            <Typography sx={{ margin: 2 }}
                                variant="h6" display="flex" alignItems="center">
                                <PersonIcon sx={{ marginRight: 0.5, color: "#009999" }} /> {user.firstName} {user.lastName}
                            </Typography>

                            <Typography sx={{ margin: 2 }}
                                variant="h6" display="flex" alignItems="center">
                                <EmailIcon sx={{ marginRight: 0.5, color: "#FF2E2E" }} /> {user.email}
                            </Typography>

                            <Typography sx={{ margin: 2 }}
                                variant="h6" display="flex" alignItems="center">
                                <LocalPhoneIcon sx={{ marginRight: 0.5, color: "#00e68a" }} /> {user.phoneNumber}
                            </Typography>

                            <Typography sx={{ margin: 2 }}
                                variant="h6" display="flex" alignItems="center">
                                <LocationOnIcon sx={{ marginRight: 0.5, color: "#FF0000" }} /> {user.address}
                            </Typography>

                            <Typography sx={{ margin: 2 }}
                                variant="h6" display="flex" alignItems="center">
                                <EventIcon sx={{ marginRight: 0.5, color: "#0021FF" }} /> {moment(user.birthDate).format("DD/MM/YYYY")}
                            </Typography>




                        </Card>
                    </Grid>
                </Grid>
                <Card
                    sx={{
                        marginTop: 2,
                        padding: 2,
                    }}>
                    <Typography variant="h4" color="secondary.main" marginBottom={2}>Thông tin chứng minh thư</Typography>
                    <Grid
                        container
                        direction={"row"}
                    >
                        <Grid
                            item
                            xs={3}>
                            <Typography
                                variant="h6" display="flex" alignItems="center">
                                <CreditScoreIcon sx={{ marginRight: 0.5, color: "#F0DB5D" }} /> {investor.citizenId}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={3}>
                            <Typography
                                variant="h6" display="flex" alignItems="center">
                                <LocationOnIcon sx={{ marginRight: 0.5, color: "#FF0000" }} /> {investor.citizenCardCreatedPlace}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={3}>
                            <Typography
                                variant="h6" display="flex" alignItems="center">
                                <EventIcon sx={{ marginRight: 0.5, color: "#0021FF" }} /> {moment(investor.citizenCardCreatedDate).format("DD/MM/YYYY")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider sx={{
                        margin: 1,
                    }} color="primary.main" />
                    <Grid
                        container
                        spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h5" display="flex" alignItems="center"
                                mb={1}
                            >
                                Mặt trước CMND/CCCD
                            </Typography>
                            <CardMedia
                                sx={{
                                    borderRadius: 2
                                }}
                                component='img'
                                height="300px"
                                width="300px"
                                image={investor.frontCitizenCardImageUrl} />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h5" display="flex" alignItems="center"
                                mb={1}
                            >
                                Mặt sau CMND/CCCD
                            </Typography>
                            <CardMedia
                                sx={{
                                    borderRadius: 2
                                }}
                                component='img'
                                height="300px"
                                width="300px"
                                image={investor.backCitizenCardImageUrl} />
                        </Grid>
                    </Grid>
                </Card>

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
                        <Button onClick={() => confirmUnBan(user)} autoFocus>
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
                        <Button onClick={() => appoveUser(user)} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Page >
    )
}


