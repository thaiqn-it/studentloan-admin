import * as React from 'react';
// material
import { styled } from '@mui/material/styles';
// web.cjs is required for IE11 support
import {
  TextField,
  Card,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
// components
import Page from '../components/Page';
//api
import { schoolApi } from '../apis/school';
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
  maxWidth: "85%",
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function CreateSchool() {
  const [name, setname] = React.useState('')
  const [city, setcity] = React.useState('')
  const [district, setdistrict] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = React.useState('')
  const vertical = 'bottom'
  const horizontal = 'right'


  const status = 'active'

  const onChangeName = (event) => {
    setname(event.target.value)
  }
  const onChangeCity = (event) => {
    setcity(event.target.value)
  }
  const onChangeDistrict = (event) => {
    setdistrict(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createSchool = () => {
    schoolApi.create({
      name,
      city,
      district,
      status,
    }).then(res => {
      setOpen(true);
      setmessage('Tạo mới thành công!')
    }).catch(
      (e) => {
        console.log(e);
        setmessage('Tạo mới thất bại!')
      }
    )
  }

  return (
    <RootStyle title="Tạo trường mới">
      <Container>
        <ContentStyle>
          <Typography variant='h3'>Thông Tin Trường</Typography>
          <Card
            style={{
              padding: 30,
            }}>
            <Typography style={{
              marginTop: 30
            }}>Tên</Typography>
            <TextField fullWidth onChange={onChangeName} />

            <Typography style={{
              marginTop: 30
            }}>Thành Phố</Typography>
            <TextField fullWidth onChange={onChangeCity} />

            <Typography style={{
              marginTop: 30
            }}>Quận/Huyện</Typography>
            <TextField fullWidth onChange={onChangeDistrict} />

            <LoadingButton
              onClick={() => createSchool()}
              size="large"
              style={{
                marginTop: 30,
                width: "15%",
              }}
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Tạo mới
            </LoadingButton>
          </Card>
          <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
