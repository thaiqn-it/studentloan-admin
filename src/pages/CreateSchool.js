import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// web.cjs is required for IE11 support
import {
  TextField,
  Card,
  Container,
  Typography,
  Snackbar,
  Grid,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
// components
import Page from '../components/Page';
//api
import { schoolApi } from '../apis/school';
import { PROVINCEVN } from '../apis/static/provinceVN';

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
  const navigate = useNavigate()
  const [name, setname] = React.useState('')
  const [city, setcity] = React.useState('')
  const [district, setdistrict] = React.useState('')
  const [emailPaypal, setEmailPaypal] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = React.useState('')
  const [colorMsg, setColorMsg] = React.useState('')
  const [listCity, setListCity] = React.useState([])
  const [listDistrict, setListDistrict] = React.useState([])
  const vertical = 'bottom'
  const horizontal = 'right'

  const onBack = () => {
    navigate("/dashboard/manageschool")
  }

  const getListCity = (list) => {
    return list.map(item =>
      <MenuItem onClick={() => {
        getAllDistrictInit(item.idProvince)
        setcity(item.name)
      }
      } key={item.name} value={item.name}>{item.name}</MenuItem>
    )
  }

  const getListDistrict = (list) => {
    return list.map(item =>
      <MenuItem onClick={() => {
        setdistrict(item.name)
      }
      } key={item.name} value={item.name}>{item.name}</MenuItem>
    )
  }

  const getAllDistrictInit = (id) => {
    var district = PROVINCEVN.district.filter(item => item.idProvince === id)
    setListDistrict(district)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const listCities = PROVINCEVN.province
      setListCity(listCities)
    }
    fetchData()
  }, [])


  const status = 'ACTIVE'

  const onChangeName = (event) => {
    setname(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const createSchool = () => {
    schoolApi.checkDuplicate(name).then(res => {
      if (res.data === null) {
        if (name.length > 500 || name.length < 1 || city.length < 1 || district.length < 1 || emailPaypal.length < 1) {
          setColorMsg('error')
          setOpen(true);
          setmessage('Tạo mới thất bại!')
        } else {
          schoolApi.create({
            emailPaypal,
            name,
            city,
            district,
            status,
          }).then(res => {
            setOpen(true);
            setColorMsg('success')
            setmessage('Tạo mới thành công!')
          }).catch(
            (e) => {
              setOpen(true);
              setColorMsg('error')
              setmessage('Tạo mới thất bại!')
            }
          )
        }
      } else {
        setOpen(true);
        setColorMsg('error')
        setmessage('Trùng tên!')
      }
    })
  }

  return (
    <RootStyle title="Tạo trường mới">
      <Container>
        <ContentStyle>
          <Typography variant='h4' onClick={onBack}>
            <ArrowBack />
          </Typography>
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
            }}>Email thanh toán</Typography>
            <TextField type='email' fullWidth onChange={(e)=>setEmailPaypal(e.target.value)} />

            <Grid
              container
              fullWidth
              spacing={2}>
              <Grid
                item
                xs={6}>
                <Typography style={{
                  marginTop: 30
                }}>Thành Phố/Tỉnh</Typography>
                <Select
                  id="slcity"
                  fullWidth
                  value={city}
                >
                  {getListCity(listCity)}
                </Select>
              </Grid>

              <Grid
                item
                xs={6}>
                <Typography style={{
                  marginTop: 30
                }}>Quận/Huyện</Typography>
                <Select
                  id="sldistrict"
                  fullWidth
                  value={district}
                >
                  {getListDistrict(listDistrict)}
                </Select>
              </Grid>
            </Grid>

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
            <Alert onClose={handleClose} severity={colorMsg} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
