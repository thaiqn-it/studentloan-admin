import { Box, CardMedia, Grid, Dialog, TextField, Typography, Button, Modal, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react'
import moment from "moment";
import { tutorApi } from '../../../../apis/tutor';
import BlockIcon from '@mui/icons-material/Block';
import { TUTOR_STATUS } from '../../../../constants/enum';
import ImageModal from '../../../../components/imagemodal';


export default function ModalDetailTutor(props) {
    const { onClose, isOpen, tutorId, setIsChange } = props
    const handleClose = () => { onClose() };
    const [tutor, setTutor] = useState({})
    const [address, setAddress] = useState('');
    const [openBanConfirm, setOpenBanConfirm] = useState(false);
    const handleOpenBanConfirm = () => setOpenBanConfirm(true);
    const handleCloseBanConfirm = () => setOpenBanConfirm(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await tutorApi.getTutorByPK(tutorId)
            const tutor = res.data
            const gettedAddress = res.data.address
            const convertAddress = gettedAddress.replace(/-/g, ", ");
            setAddress(convertAddress)
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
                    Th??ng tin chi ti???t ng?????i gi??m h???
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            T??n
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
                            S??? ??i???n tho???i
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
                            Ng??y sinh
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
                            ?????a ch???
                        </Typography>
                        <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={address}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" fontWeight="regular">
                            Quan h???
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
                                S??? CMND/CCCD
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
                                Ng??y c???p CMND/CCCD
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
                                N??i c???p CMND/CCCD
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
                            M???t tr?????c CMND/CCCD
                        </Typography>
                        <ImageModal
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
                            M???t sau CMND/CCCD
                        </Typography>
                        <ImageModal
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
                                T??? ch???i
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
                        {"B???n c?? ch???c v??? quy???t ?????nh n??y"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thay ?????i s??? ???????c c???p nh???t v??o h??? th???ng!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='error' onClick={handleCloseBanConfirm}>T??? b???</Button>
                        <Button onClick={actionButton} autoFocus>
                            ?????ng ??
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Dialog>
    )
}
