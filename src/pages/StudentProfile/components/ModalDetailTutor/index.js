import { Box, CardMedia, Grid, Dialog, TextField, Typography, Button, Modal, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react'
import moment from "moment";
import { tutorApi } from '../../../../apis/tutor';
import BlockIcon from '@mui/icons-material/Block';
import { TUTOR_STATUS } from '../../../../constants/enum';


export default function ModalDetailTutor(props) {
    const { onClose, isOpen, tutorId, setIsChange } = props
    const handleClose = () => { onClose() };
    const [tutor, setTutor] = useState({})
    const [openBanConfirm, setOpenBanConfirm] = useState(false);
    const handleOpenBanConfirm = () => setOpenBanConfirm(true);
    const handleCloseBanConfirm = () => setOpenBanConfirm(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await tutorApi.getTutorByPK(tutorId)
            const tutor = res.data
            setTutor(tutor)
        }
        fetchData()
    }, [tutorId])

    const formatDate = (date) => {
        var data = '';
        data = moment(date).format('DD/MM/YYYY')
        return data;
    }

    const actionButton = () => {
        tutorApi.update(tutorId, { ...tutor, status: TUTOR_STATUS.UNVERIFIED })
        handleClose()
        setIsChange(moment().format())
    };

    return (
        <Dialog
            maxWidth="lg"
            open={isOpen}
            onClose={handleClose}
            scroll='body'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <Box
                sx={{
                    padding: 2,
                }}>
                <Typography id="modal-modal-title" color="secondary" variant="h6" component="h2">
                    Thông tin chi tiết người giám hộ
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Tên
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={tutor.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Số điện thoại
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={tutor.phone}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Email
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="email"
                            value={tutor.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Ngày sinh
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={formatDate(tutor.birthday)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Địa chỉ
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={tutor.address}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Quan hệ
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={tutor.relation}
                        />
                    </Grid>
                    <Grid
                        sx={{
                            paddingTop: 2,
                            paddingLeft: 2,
                            paddingRight: 2
                        }}
                        container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                fontWeight="regular"
                            >
                                Số CMND/CCCD
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                value={tutor.citizenId}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                fontWeight="regular"
                            >
                                Ngày cấp CMND/CCCD
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                value={formatDate(tutor.citizenCardCreatedDate)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography
                                variant="h6"
                                fontWeight="regular"
                            >
                                Nơi cấp CMND/CCCD
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                // placeholder="Email"
                                value={tutor.citizenCardCreatedPlace}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
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
                            image={tutor.frontCitizenCardImageUrl} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
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
                            image={tutor.backCitizenCardImageUrl} />
                    </Grid>
                </Grid>
                {
                    tutor?.status === TUTOR_STATUS.VERIFIED ?
                        (
                            <Button
                                onClick={handleOpenBanConfirm}
                                size="large"
                                sx={{
                                    marginTop: 2,
                                }}
                                type="submit"
                                color="error"
                                variant="contained"
                                startIcon={<BlockIcon />}
                            >
                                Từ chối
                            </Button>
                        ) : (<></>)
                }
                <Dialog
                    open={openBanConfirm}
                    onClose={handleCloseBanConfirm}
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
                        <Button color='error' onClick={handleCloseBanConfirm}>Từ bỏ</Button>
                        <Button onClick={actionButton} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Dialog>
    )
}
