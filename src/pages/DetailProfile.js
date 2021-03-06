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
  CardActions,
  Paper
} from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import account from '../_mocks_/account';
import * as React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DesktopDatePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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

export default function DetailProfile() {

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

  return (
    <RootStyle title="Profile page">
      <Container>
        <ContentStyle>

          <Typography variant='h3'>Th??ng tin c?? b???n</Typography>
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
                <Typography>H??? & t??n ?????m</Typography>
                <TextField fullWidth value={"Nguy???n Tr?????ng"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>T??n</Typography>
                <TextField fullWidth value={"Phi"} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>Email</Typography>
            <TextField fullWidth value={"phintse140595@fpt.edu.vn"} />

            <Typography style={{
              marginTop: 30
            }}>S??? ??i???n tho???i</Typography>
            <TextField fullWidth value={"1900 1089"} />

            <Typography style={{
              marginTop: 30
            }}>?????a ch???</Typography>
            <TextField fullWidth value={"Tr?????ng ?????i h???c FPT TP. HCM, Khu C??ng Ngh??? Cao, Long Th???nh M???, Th??nh Ph??? Th??? ?????c, Th??nh ph??? H??? Ch?? Minh"} />

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
                <Typography>Th??nh Ph???</Typography>
                <TextField fullWidth value={"H??? Ch?? Minh"} />
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
                <Typography>Ph?????ng</Typography>
                <TextField fullWidth value={"Hi???p Th??nh"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Qu???n</Typography>
                <TextField fullWidth value={"12"} />
              </Grid>
            </Grid>

            <Typography style={{
              marginTop: 30
            }}>M???t Kh???u</Typography>
            <FormControl fullWidth variant="outlined">
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                disabled
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
          <Typography variant='h3'>Th??ng tin v??? c??n c?????c</Typography>
          <Paper
            elevation={6}
            style={{
              padding: "1.5rem", borderRadius: "10px"
            }}>
            <Typography>S??? CMND/CCCD</Typography>
            <TextField fullWidth value={"1234567890"} />

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
                
            <Typography>N??i l??m th???</Typography>
            <TextField fullWidth value={"HCM"} />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Ng??y l??m th???</Typography>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="dd/MM/yyyy"
              value={date}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
            </LocalizationProvider>
              </Grid>
            </Grid>


            


            <Grid
              container
              sx={{
                marginTop: '10px',
              }}
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
                        M???t tr?????c
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
                        M???t sau
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
          </Paper>


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
                  borderColor: '#ABB5B1',
                  color: '#ABB5B1',

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
