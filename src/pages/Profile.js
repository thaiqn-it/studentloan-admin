// import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Card, Container, Typography, Avatar, Grid, TextField, FormControl, OutlinedInput,
  InputAdornment,
  IconButton,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import account from '../_mocks_/account';
import * as React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Edit from '@mui/icons-material/Edit';
import ArrowBack from '@mui/icons-material/ArrowBack';
// import { RegisterForm } from '../components/authentication/register';
// import AuthSocial from '../components/authentication/AuthSocial';

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

export default function Profile() {

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

  return (
    <RootStyle title="Profile page">
      <AuthLayout>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Chỉnh sửa thông tin cá nhân của bạn tại đây
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>

          <Typography variant='h3'>Thông tin cơ bản</Typography>
          <Avatar
            src={account.photoURL}
            alt="photoURL"
            sx={{
              width: 100, height: 100,
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
                <TextField fullWidth value={"Nguyễn Trường"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Tên</Typography>
                <TextField fullWidth value={"Phi"} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>Email</Typography>
            <TextField fullWidth value={"phintse140595@fpt.edu.vn"} />

            <Typography style={{
              marginTop: 30
            }}>Số điện thoại</Typography>
            <TextField fullWidth value={"1900 1089"} />

            <Typography style={{
              marginTop: 30
            }}>Địa chỉ</Typography>
            <TextField fullWidth value={"Trường Đại học FPT TP. HCM, Khu Công Nghệ Cao, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh"} />

            <Grid
              container
              direction="row"
              spacing={2}
              style={{
                marginTop: 30,
              }}
            >
              <Grid
                item
                xs={6}
              >
                <Typography>Thành Phố</Typography>
                <TextField fullWidth value={"Hồ Chí Minh"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Zip Code</Typography>
                <TextField fullWidth value={"70000"} />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={2}
              style={{
                marginTop: 30,
              }}
            >
              <Grid
                item
                xs={6}
              >
                <Typography>Phường</Typography>
                <TextField fullWidth value={"Hiệp Thành"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Quận</Typography>
                <TextField fullWidth value={"12"} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>Mật Khẩu</Typography>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
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


          </Card>
          <ColoredLine color="#00FF9D" />
          <Typography variant='h3'>Thông tin về căn cước</Typography>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              xs={6}>
              <Card>
                <CardActionArea
                  onClick={() => alert('asdawdasd')}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image="/static/illustrations/illustration_register.png"
                    alt="front-cccd"
                  />
                  <CardContent>
                    <Typography variant="h5">
                      Mặt trước
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <LoadingButton
                    style={{
                      marginLeft: 10,
                      marginBottom: 10,
                      padding: 8,
                    }}
                    size="small"
                    type="submit"
                    variant="contained"
                    endIcon={<Edit />}
                  // loading={isSubmitting}
                  >
                    Edit
                  </LoadingButton>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              xs={6}>
              <Card>
                <CardActionArea
                  onClick={() => alert('asdawdasd')}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image="/static/illustrations/illustration_register.png"
                    alt="front-cccd"
                  />
                  <CardContent>
                    <Typography variant="h5">
                      Mặt sau
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <LoadingButton
                    style={{
                      marginLeft: 10,
                      marginBottom: 10,
                      padding: 8,
                    }}
                    size="small"
                    type="submit"
                    variant="contained"
                    endIcon={<Edit />}
                  // loading={isSubmitting}
                  >
                    Edit
                  </LoadingButton>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <ColoredLine color="#00FF9D" />
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                sx={{
                  borderColor:'#ABB5B1',
                  color:'#ABB5B1',
                  
                }}
                variant="outlined"
                startIcon={<ArrowBack />}
              // loading={isSubmitting}
              >
                Back
              </LoadingButton>
            </Grid>
            <Grid
              item
              xs={6}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                endIcon={<Edit />}
              // loading={isSubmitting}
              >
                Edit
              </LoadingButton>
            </Grid>

          </Grid>

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
