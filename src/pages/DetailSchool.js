import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import {
  TextField,
  Card,
  Container,
  Typography,
  Button,
  Autocomplete,
  Snackbar,
  Alert,
  Grid,
  MenuItem,
  Select,
  Tab,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
// components
import Page from '../components/Page';
// components
import * as React from 'react';
import Edit from '@mui/icons-material/Edit';
import { TabContext, TabList, TabPanel } from '@mui/lab';
//Api
import { schoolApi } from '../apis/school';
import MajorHandle from '../components/major/MajorHandle';
import {PROVINCEVN} from '../apis/static/provinceVN'

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
}));


export default function DetailSchool() {
  const navigate = useNavigate()
  //school info
  const { id } = useParams();
  const [name, setname] = useState('')
  const [city, setcity] = useState('')
  const [district, setdistrict] = useState('')
  const [status, setstatus] = useState('')
  const [open, setOpen] = React.useState(false);
  //message out for user
  const [message, setmessage] = React.useState('')
  //option autocomplete
  const option = ['ACTIVE', 'INACTIVE']
  //tabs
  const [colorMessage, setcolorMessage] = useState('')
  const vertical = 'bottom'
  const horizontal = 'right'
  const [tab, settab] = React.useState(1);
  //action ischange
  const [listCity, setListCity] = useState([])
  const [listDistrict, setListDistrict] = useState([])

  const handleChangeTabs = (event, newValue) => {
    settab(newValue);
  };

  const getAllDistrictInit = (id) =>{
    var district = PROVINCEVN.district.filter(item=>item.idProvince===id)
    setListDistrict(district)
  }

  useEffect(() => {
    const fetchData = async () => {
      const schoolRes = await schoolApi.getOne(id)
      const school = schoolRes.data
      setname(school.name)
      setcity(school.city)
      setdistrict(school.district)
      setstatus(school.status)

      const listCities = PROVINCEVN.province
      setListCity(listCities)

      PROVINCEVN.province.map(item => item.name === school.city ? getAllDistrictInit(item.idProvince) : "")
    }
    fetchData()
  }, [])

  const onBack = () => {
    navigate("/dashboard/manageschool")
  }

  const onChangeName = (event) => {
    setname(event.target.value)
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

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function updateSchool(id) {
    schoolApi.update(id, {
      name,
      city,
      district,
      status,
    }
    ).then(res => {
      setOpen(true);
      setcolorMessage('success')
      setmessage('Chỉnh sửa thành công!')
    }).catch(
      (e) => {
        setcolorMessage('error')
        setmessage('Chỉnh sửa thất bại!')
      }
    )
  }

  return (
    <RootStyle title="Chi tiết về trường">
      <Container>
        <ContentStyle>
          <Typography variant='h4' onClick={onBack}>
            <ArrowBack />
          </Typography>
          <TabContext value={tab}>
            <TabList value={tab} onChange={handleChangeTabs} centered>
              <Tab label="Thông tin cơ bản" value={1} />
              <Tab label="Chỉnh sửa ngành/chuyên ngành" value={2} />
            </TabList>
            <TabPanel value={1}>
              <Typography sx={{
                margin: '10px'
              }} variant='h3'>Thông Tin Trường</Typography>
              <Card
                style={{
                  padding: 30,
                }}>
                <Typography>ID</Typography>
                <TextField fullWidth defaultValue={id} disabled />

                <Typography style={{
                  marginTop: 30
                }}>Tên</Typography>
                <TextField fullWidth onChange={onChangeName} value={name} />

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
                <Typography style={{
                  marginTop: 30
                }}>Trạng Thái</Typography>
                <Autocomplete
                  value={status}
                  onChange={(event, newValue) => {
                    setstatus(newValue);
                  }}
                  inputValue={status}
                  id="controllable-states-demo"
                  disableClearable={true}
                  options={option}
                  sx={{ width: "50%" }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <Button
                  fullWidth
                  onClick={() => updateSchool(id)}
                  size="large"
                  style={{
                    marginTop: 30,
                    width: "29%",
                  }}
                  type="submit"
                  variant="contained"
                  endIcon={<Edit />}
                >
                  Chỉnh sửa
                </Button>
              </Card>
            </TabPanel>

            <TabPanel
              value={2}>
              <MajorHandle schoolId={id} />
            </TabPanel>
          </TabContext>
          <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={colorMessage} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
