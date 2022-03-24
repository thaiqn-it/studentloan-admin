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

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      margin: 30,
      height: 1.5
    }}
  />
);

// ----------------------------------------------------------------------

export default function Profile(props) {
  const navigate = useNavigate()
  // const admin = props.admin

  const [admin, setAdmin] = React.useState({
    id: "c07f1b26-7f46-4f23-b4f8-4f99524e0b55",
    userId: "c07f1b26-7f46-4f23-b4f8-4f99524e0b55",
    status: "ACTIVE",
    firstName: "Nguyễn Trường",
    profileUrl: "https://haycafe.vn/wp-content/uploads/2022/01/Anh-meo-FF-cute-ngau.jpg",
    lastName: "Phi",
    User: {
      email: "phint.1002@gmail.com",
      phoneNumber: "0981253505",
      password: "123456",
      userType: "ADMIN",
    }
  });

  const [date, setDate] = React.useState(new Date());

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const [values, setValues] = React.useState({
    password: '123456',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onBack = () => {
    navigate('/')
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
                <TextField fullWidth value={admin.firstName} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Tên</Typography>
                <TextField fullWidth value={admin.lastName} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>Email</Typography>
            <TextField fullWidth value={admin.User.email} />

            <Typography style={{
              marginTop: 30
            }}>Số điện thoại</Typography>
            <TextField fullWidth value={admin.User.phoneNumber} />

            <Typography style={{
              marginTop: 30
            }}>Mật Khẩu</Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={1}>
              <Grid
                item
                xs={9}>
                <FormControl fullWidth variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    disabled
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={3}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Thay mật khẩu
                </Button>
              </Grid>
            </Grid>


          </Card>

          <Button
            sx={{
              margin:2,
            }}
            size="large"
            type="submit"
            variant="contained"
            endIcon={<Edit />}
          >
            Chỉnh sửa
          </Button>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
