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
    const [systemConfig, setSystemConfig] = React.useState({})

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [message, setMessage] = React.useState('')
    const [colorSB,setColorSB] = React.useState('')
    const vertical = 'bottom'
    const horizontal = 'right'

    const createNewSystemConfig = () => {
        const clone = (({ id, createdAt, updatedAt, ...o }) => o)(systemConfig)
        const newConfig = { ...clone, interest:interest, fixedMoney:fixedMoney, transactionFee:transactionFee }
        if(interest<=0 || fixedMoney<=0 || transactionFee <=0){
            setColorSB('error')
            handleOpen()
            setMessage('Một vài thông tin nhập sai yêu cầu!')
        }else{
            systemConfigApi.update(systemConfig.id,{...systemConfig,status:false}).then(
                systemConfigApi.create(newConfig)
            )
            setColorSB('success')
            handleOpen()
            setMessage('Cập nhật hệ thống thành công')
        }

    }

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await systemConfigApi.getOne()
            setSystemConfig(res.data[0])
            setInterest(res.data[0].interest)
            setFixedMoney(res.data[0].fixedMoney)
            setTransactionFee(res.data[0].transactionFee)
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
                                error={interest<=0 || interest===''} 
                                helperText = {interest<=0 || interest===''?"Vui lòng nhập số lớn hơn 0":''}
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
                                error={fixedMoney<=0 || fixedMoney===''} 
                                helperText = {fixedMoney<=0 || fixedMoney===''?"Vui lòng nhập số lớn hơn 0":''}
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
                                error={transactionFee<=0 || transactionFee===''} 
                                helperText = {transactionFee<=0 || transactionFee===''?"Vui lòng nhập số lớn hơn 0":''}
                                fullWidth required type={"number"} onChange={(e, v) => setTransactionFee(e.target.value)} value={transactionFee} />
                            </Grid>
                        </Grid>

                        <LoadingButton
                            onClick={createNewSystemConfig}
                            size="large"
                            style={{
                                marginTop: 30,
                            }}
                            type="submit"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            Cập nhật
                        </LoadingButton>
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
