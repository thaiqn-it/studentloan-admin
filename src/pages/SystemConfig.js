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
            setMessage('Một vài thông tin nhập sai yêu cầu!')
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
            setMessage('Thiết lập lại hệ thống thành công')
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
            setMessage('Một vài thông tin nhập sai yêu cầu!')
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
            setMessage('Tạo mới thiết lập thành công')
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
        <RootStyle title="Thiết lập hệ thống">
            <Container>
                <ContentStyle>
                    <Typography variant='h3'>Thiết lập thông tin</Typography>
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
                                }}>Lãi nhận được từ việc đầu tư (%)</Typography>
                                <TextField fullWidth
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={interest <= 0 || interest === ''}
                                    helperText={interest <= 0 || interest === '' ? "Vui lòng nhập số lớn hơn 0 và bé hơn 100" : ''}
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
                                }}>Tiền học sinh cần trả trong giai đoạn còn đi học (VND)</Typography>
                                <TextField
                                    // onInput={(e) => {
                                    //     e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                    // }}
                                    error={fixedMoney <= 0 || fixedMoney === ''}
                                    helperText={fixedMoney <= 0 || fixedMoney === '' ? "Vui lòng nhập số lớn hơn 0" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setFixedMoney(e.target.value)} value={fixedMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Phí nền tảng (%)</Typography>
                                <TextField
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={transactionFee <= 0 || transactionFee === ''}
                                    helperText={transactionFee <= 0 || transactionFee === '' ? "Vui lòng nhập số lớn hơn 0 và bé hơn 100" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setTransactionFee(e.target.value)} value={transactionFee} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Phí phạt (%)</Typography>
                                <TextField
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    error={penaltyFee <= 0 || penaltyFee === ''}
                                    helperText={penaltyFee <= 0 || penaltyFee === '' ? "Vui lòng nhập số lớn hơn 0 và bé hơn 100" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setPenaltyFee(e.target.value)} value={penaltyFee} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Số tiền kêu gọi tối thiểu (VND)</Typography>
                                <TextField
                                    error={minRaiseMoney <= 0 || minRaiseMoney === ''}
                                    helperText={minRaiseMoney <= 0 || minRaiseMoney === ''? "Vui lòng nhập số lớn hơn 0 và nhỏ hơn số tiền kêu gọi tối đa" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMinRaiseMoney(e.target.value)} value={minRaiseMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Số tiền kêu gọi tối đa (VND)</Typography>
                                <TextField
                                    error={maxRaiseMoney <= 0 || maxRaiseMoney === ''}
                                    helperText={maxRaiseMoney <= 0 || maxRaiseMoney === ''? "Vui lòng nhập số lớn hơn 0 và lớn hơn số tiền kêu gọi tối thiểu" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMaxRaiseMoney(e.target.value)} value={maxRaiseMoney} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Kỳ hạn tối thiểu (tháng)</Typography>
                                <TextField
                                    error={minDuration <= 0 || minDuration === ''}
                                    helperText={minDuration <= 0 || minDuration === '' ? "Vui lòng nhập số lớn hơn 0 và bé hơn kỳ hạn tối đa" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMinDuration(e.target.value)} value={minDuration} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Kỳ hạn tối đa (tháng)</Typography>
                                <TextField
                                    error={maxDuration <= 0 || maxDuration === ''}
                                    helperText={maxDuration <= 0 || maxDuration === '' ? "Vui lòng nhập số lớn hơn 0 và lớn hơn kỳ hạn tối thiểu" : ''}
                                    fullWidth required type={"number"} onChange={(e, v) => setMaxDuration(e.target.value)} value={maxDuration} />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}>
                                <Typography style={{
                                    marginTop: 30
                                }}>Thời gian hồ sơ vay hết hạn (tháng)</Typography>
                                <TextField
                                    error={postExpireTime <= 0 || postExpireTime === ''}
                                    helperText={postExpireTime <= 0 || postExpireTime === '' ? "Vui lòng nhập số lớn hơn 0" : ''}
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
                            Tạo mới
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
                            Cập nhật
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
