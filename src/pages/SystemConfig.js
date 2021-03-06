import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    TextField,
    Card,
    Container,
    Typography,
    Snackbar,
    Grid,
    Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
// components
import Page from '../components/Page';
//api
import { systemConfigApi } from '../apis/systemConfig';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const ContentStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function SystemConfig() {
    const [interest, setInterest] = React.useState()
    const [fixedMoney, setFixedMoney] = React.useState()
    const [transactionFee, setTransactionFee] = React.useState()
    const [penaltyFee, setPenaltyFee] = React.useState()
    const [minRaiseMoney, setMinRaiseMoney] = React.useState()
    const [maxRaiseMoney, setMaxRaiseMoney] = React.useState()
    const [minDuration, setMinDuration] = React.useState()
    const [maxDuration, setMaxDuration] = React.useState()
    const [postExpireTime, setPostExpireTime] = React.useState()
    const [systemConfig, setSystemConfig] = React.useState({})
    const [isInit, setIsinit] = React.useState(false)
    // const [isChange, setIsChange] = React.useState(moment().format())

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [message, setMessage] = React.useState('')
    const [colorSB, setColorSB] = React.useState('')
    const vertical = 'bottom'
    const horizontal = 'right'

    const updateSystemConfig = (systemConfig) => {
        // const clone = (({ id, createdAt, updatedAt, ...o }) => o)(systemConfig)
        const newConfig = { 
            interest: interest / 100, 
            fixedMoney: fixedMoney, 
            transactionFee: transactionFee / 100, 
            penaltyFee: penaltyFee / 100, 
            minDuration: minDuration, 
            minRaiseMoney: minRaiseMoney, 
            maxRaiseMoney: maxRaiseMoney, 
            postExpireTime: postExpireTime, 
            maxDuration:maxDuration,
            status: true }
        if (
            interest <= 0 ||
            fixedMoney <= 0 ||
            transactionFee <= 0 ||
            penaltyFee <= 0 ||
            minDuration <= 0 ||
            maxDuration <= 0 ||
            minRaiseMoney <= 0 ||
            maxRaiseMoney <= 0 ||
            postExpireTime <= 0 ||
            minRaiseMoney>=maxRaiseMoney ||
            maxRaiseMoney<=minRaiseMoney ||
            minDuration>=maxDuration ||
            maxDuration<=minDuration
            ) {
            setColorSB('error')
            handleOpen()
            setMessage('M???t v??i th??ng tin nh???p sai y??u c???u!')
        } else {
            systemConfigApi.update(systemConfig.id, { ...systemConfig, status: false }).then(
                systemConfigApi.create(newConfig).then(res => {
                    setSystemConfig({
                        id: res.data.id,
                        createdAt: res.data.createdAt,
                        updatedAt: res.data.updatedAt,
                        ...newConfig
                    })
                })
            )
            setColorSB('success')
            handleOpen()
            setMessage('Thi???t l???p l???i h??? th???ng th??nh c??ng')
        }
    }

    const createSystemConfig = () => {
        const newConfig = { 
        interest: interest / 100, 
        fixedMoney: fixedMoney, 
        transactionFee: transactionFee / 100, 
        penaltyFee: penaltyFee / 100, 
        minDuration: minDuration, 
        maxDuration:maxDuration,
        minRaiseMoney: minRaiseMoney, 
        maxRaiseMoney: maxRaiseMoney, 
        postExpireTime: postExpireTime, 
        status: true }
        if (
            interest <= 0 ||
            fixedMoney <= 0 ||
            transactionFee <= 0 ||
            penaltyFee <= 0 ||
            minDuration <= 0 ||
            maxDuration <= 0 ||
            minRaiseMoney <= 0 ||
            maxRaiseMoney <= 0 ||
            postExpireTime <= 0 ||
            minRaiseMoney>=maxRaiseMoney ||
            maxRaiseMoney<=minRaiseMoney ||
            minDuration>=maxDuration ||
            maxDuration<=minDuration
            ) {
            setColorSB('error')
            handleOpen()
            setMessage('M???t v??i th??ng tin nh???p sai y??u c???u!')
        } else {
            systemConfigApi.create(newConfig).then(res => {
                setSystemConfig({
                    id: res.data.id,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt,
                    ...newConfig
                })
            })
            setColorSB('success')
            handleOpen()
            setIsinit(false)
            setMessage('T???o m???i thi???t l???p th??nh c??ng')
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await systemConfigApi.getOne()
            setSystemConfig(res.data)
            if (res.data) {
                setInterest(Math.round(res.data.interest * 100 * 100) / 100)
                setFixedMoney(res.data.fixedMoney)
                setTransactionFee(Math.round(res.data.transactionFee * 100 * 100) / 100)
                setPenaltyFee(Math.round(res.data.penaltyFee * 100 * 100) / 100)
                setMinRaiseMoney(res.data.minRaiseMoney)
                setMaxRaiseMoney(res.data.maxRaiseMoney)
                setMinDuration(res.data.minDuration)
                setMaxDuration(res.data.maxDuration)
                setPostExpireTime(res.data.postExpireTime)
            } else {
                setIsinit(true)
                setInterest(0)
                setFixedMoney(0)
                setTransactionFee(0)
                setPenaltyFee(0)
                setMinRaiseMoney(0)
                setMaxRaiseMoney(0)
                setMinDuration(0)
                setMaxDuration(0)
                setPostExpireTime(0)
            }
        }
        fetchData()
    }, [])

    return (
        <RootStyle title="Thi???t l???p h??? th???ng">
            <Container>
                <ContentStyle>
                    <Typography variant='h3'>Thi???t l???p th??ng tin</Typography>
                    <Card
                        sx={{
                            padding: 2,
                        }}>
                        <Grid
                            container
                            fullWidth
                            spacing={2}>
                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>L??i nh???n ???????c t??? vi???c ?????u t?? (%)</Typography>
                                <TextField fullWidth
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={interest <= 0 || interest === ''}
                                    helperText={interest <= 0 || interest === '' ? "Vui l??ng nh???p s??? l???n h??n 0 v?? b?? h??n 100" : ''}
                                    required
                                    type={"number"}
                                    onChange={(e, v) => setInterest(e.target.value)}
                                    value={interest} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Ti???n h???c sinh c???n tr??? trong giai ??o???n c??n ??i h???c (VND)</Typography>
                                <TextField
                                    // onInput={(e) => {
                                    //     e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                    // }}
                                    error={fixedMoney <= 0 || fixedMoney === ''}
                                    helperText={fixedMoney <= 0 || fixedMoney === '' ? "Vui l??ng nh???p s??? l???n h??n 0" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setFixedMoney(e.target.value)} value={fixedMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Ph?? n???n t???ng (%)</Typography>
                                <TextField
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={transactionFee <= 0 || transactionFee === ''}
                                    helperText={transactionFee <= 0 || transactionFee === '' ? "Vui l??ng nh???p s??? l???n h??n 0 v?? b?? h??n 100" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setTransactionFee(e.target.value)} value={transactionFee} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Ph?? ph???t (%)</Typography>
                                <TextField
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={penaltyFee <= 0 || penaltyFee === ''}
                                    helperText={penaltyFee <= 0 || penaltyFee === '' ? "Vui l??ng nh???p s??? l???n h??n 0 v?? b?? h??n 100" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setPenaltyFee(e.target.value)} value={penaltyFee} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>S??? ti???n k??u g???i t???i thi???u (VND)</Typography>
                                <TextField
                                    error={minRaiseMoney <= 0 || minRaiseMoney === ''}
                                    helperText={minRaiseMoney <= 0 || minRaiseMoney === ''? "Vui l??ng nh???p s??? l???n h??n 0 v?? nh??? h??n s??? ti???n k??u g???i t???i ??a" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMinRaiseMoney(e.target.value)} value={minRaiseMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>S??? ti???n k??u g???i t???i ??a (VND)</Typography>
                                <TextField
                                    error={maxRaiseMoney <= 0 || maxRaiseMoney === ''}
                                    helperText={maxRaiseMoney <= 0 || maxRaiseMoney === ''? "Vui l??ng nh???p s??? l???n h??n 0 v?? l???n h??n s??? ti???n k??u g???i t???i thi???u" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMaxRaiseMoney(e.target.value)} value={maxRaiseMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>K??? h???n t???i thi???u (th??ng)</Typography>
                                <TextField
                                    error={minDuration <= 0 || minDuration === ''}
                                    helperText={minDuration <= 0 || minDuration === '' ? "Vui l??ng nh???p s??? l???n h??n 0 v?? b?? h??n k??? h???n t???i ??a" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMinDuration(e.target.value)} value={minDuration} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>K??? h???n t???i ??a (th??ng)</Typography>
                                <TextField
                                    error={maxDuration <= 0 || maxDuration === ''}
                                    helperText={maxDuration <= 0 || maxDuration === '' ? "Vui l??ng nh???p s??? l???n h??n 0 v?? l???n h??n k??? h???n t???i thi???u" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMaxDuration(e.target.value)} value={maxDuration} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Th???i gian h??? s?? vay h???t h???n (th??ng)</Typography>
                                <TextField
                                    error={postExpireTime <= 0 || postExpireTime === ''}
                                    helperText={postExpireTime <= 0 || postExpireTime === '' ? "Vui l??ng nh???p s??? l???n h??n 0" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setPostExpireTime(e.target.value)} value={postExpireTime} />
                            </Grid>
                        </Grid>

                        {isInit ? <LoadingButton
                            onClick={() => createSystemConfig()}
                            size="large"
                            style={{
                                marginTop: 30,
                            }}
                            type="submit"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            T???o m???i
                        </LoadingButton> : <LoadingButton
                            onClick={() => updateSystemConfig(systemConfig)}
                            size="large"
                            style={{
                                marginTop: 30,
                            }}
                            type="submit"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            C???p nh???t
                        </LoadingButton>}

                    </Card>
                    <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={colorSB} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
}
