import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Container, Typography, Avatar, Grid, TextField, FormControl, OutlinedInput,
  InputAdornment,
  Button,
  IconButton,
} from '@mui/material';
// components
import Page from '../components/Page';
import * as React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useAuthState } from '../context/AuthContext';
import { userApi } from '../apis/user';
import { loadToken } from '../apis';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: "85%",
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Profile() {
  const navigate = useNavigate()
  const [admin, setAdmin] = React.useState({})

  const user = useAuthState()
  console.log(user)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        loadToken()
        const resData = await userApi.getAdminInfo()
        setAdmin(resData.data)
      }
      catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const onBack = () => {
    navigate('/dashboard')
  }

  return (
    <RootStyle title="Profile page">
      <Container>
        <ContentStyle>
          <Typography variant='h4' onClick={onBack}>
            <ArrowBack />
          </Typography>
          <Typography variant='h3'>Thông tin tài khoản</Typography>
          <Avatar
            src={admin.profileUrl}
            alt="photoURL"
            sx={{
              width: 250, height: 250,
              margin: "auto auto",
              marginBottom: 5,
              marginTop: 2,
            }}
          />

          <Card
            style={{
              padding: 30,
            }}>
            <Grid
              container
              direction="row"
              spacing={2}
            >
              <Grid
                item
                xs={6}
              >
                <Typography>Họ & tên đệm</Typography>
                <TextField disabled fullWidth value={admin.firstName} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Tên</Typography>
                <TextField disabled fullWidth value={admin.lastName} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>Email</Typography>
            <TextField disabled fullWidth value={admin.email} />

            <Typography style={{
              marginTop: 30
            }}>Số điện thoại</Typography>
            <TextField disabled fullWidth value={admin.phoneNumber} />
          </Card>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
