//mui components
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Card,
  Paper,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
  TextField
} from "@mui/material";
//mui icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBack from '@mui/icons-material/ArrowBack';
//react component
import React, { useEffect, useState } from "react";
import { convertCurrencyVN } from '../utils/formatNumber';

import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { loanApi } from "../apis/loan";
import moment from "moment";
import { LOANMEDIA_TYPE } from "../constants/enum";
import YoutubeEmbed from "../components/YoutubeEmbed";
import ReactPlayer from "react-player"




export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [isChange, setIsChange] = useState('')
  const [loan, setLoan] = useState({})
  const [school, setSchool] = useState({})
  const [major, setMajor] = useState({})
  const [user, setUser] = useState({})
  const [archievements, setArchievements] = useState([])
  const [loanHistories, setLoanHistories] = useState([])
  // const [loanMedia, setLoanMedia] = useState([])
  const [loanMediaV, setLoanMediaV] = useState({})
  const [loanMediaC, setLoanMediaC] = useState({})
  const [loanMediaD, setLoanMediaD] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const res = await loanApi.getOne(id)
      setLoan(res.data.loan)
      setSchool(res.data.loan.Student.SchoolMajor.School)
      setMajor(res.data.loan.Student.SchoolMajor.Major)
      setUser(res.data.loan.Student.User)
      setArchievements(res.data.loan.Student.Archievements)
      setLoanHistories(res.data.loan.LoanHistories)
      // setLoanMedia(res.data.loan.LoanMedia)
      res.data.loan.LoanMedia.forEach(item => {
        if (item.type === LOANMEDIA_TYPE.VIDEO) {
          setLoanMediaV(item)
        } else if (item.type === LOANMEDIA_TYPE.STUDENTCERT) {
          setLoanMediaC(item)
        } else if (item.type === LOANMEDIA_TYPE.DEMANDNOTE) {
          setLoanMediaD(item)
        }
      })
    }
    fetchData()
  }, [id])

  const formatDate = (date) => {
    var data = '';
    data = moment(date).format('DD/MM/YYYY')
    return data;
  }

  const onBack = () => {
    navigate("/dashboard/waitingpost")
  }

  const generateDuration = (date, duration) => {
    return formatDate(moment(date).add(duration, 'months'))
  }

  return (
    <div>
      <Container sx={{ padding: "3rem 3rem" }} maxWidth="xl">
        <Typography variant='h4' onClick={onBack}>
          <ArrowBack />
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 20 }}>
          <Typography
            variant="h4">
            {loan.title}
          </Typography>
        </div>
        <Card
          elevation={6}
          sx={{
            padding: "1.5rem", borderRadius: "10px"
          }}>
          <Typography color='secondary' variant="h4">Các thông tin cơ bản</Typography>
          <Grid container spacing="15" sx={{
            marginTop: '2px'
          }}>
            <Grid item xs="12" md="7">
              <div>
                <ReactPlayer
                controls={true}
                loop
                  url={loanMediaV.imageUrl}
                />
              </div>
            </Grid>
            <Grid item xs="12" md="5">
              <Grid container spacing="5">
                <Grid item xs="12" md="12">
                  <Typography variant="h6">Cần vay</Typography>
                  <Typography color='primary' variant="h4">{convertCurrencyVN(loan.totalMoney)}</Typography>
                </Grid>

                <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Vay trong</Typography>
                  <Typography variant="h5">{loan.duration} tháng</Typography>
                </Grid>

                <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Thời gian ra trường dự kiến</Typography>
                  <Typography variant="h5">{generateDuration(loan.postCreatedAt, loan.expectedGraduationTime)}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ margin: "20px 0px" }} />

        <Card
          elevation={6}
          style={{
            padding: "1.5rem", borderRadius: "10px"
          }}>
          <Typography color='secondary' variant="h4">Thông tin sơ lược của sinh viên</Typography>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              md={3}>
              <Avatar
                sx={{ height: "200px", width: "200px" }}
                alt="Student"
                bgColor="light"
                src={user.profileUrl}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="regular">
                    Họ
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    type="text"
                    placeholder="Họ"
                    value={user.firstName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="regular">
                    Tên
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    type="text"
                    placeholder="Họ"
                    value={user.lastName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="regular">
                    Trường
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    type="text"
                    placeholder="phone number"
                    value={school.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" fontWeight="regular">
                    Chuyên ngành
                  </Typography>
                  <TextField
                    fullWidth
                    disabled
                    type="text"
                    placeholder="phone number"
                    value={major.name}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ margin: "20px 0px" }} />

        <Card
          elevation={6}
          style={{
            padding: "1.5rem", borderRadius: "10px"
          }}>
          <Typography color='secondary' variant="h4">Mô tả</Typography>
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            {loan.description}
          </Typography>
        </Card>

        <Divider sx={{ margin: "20px 0px" }} />

        <Typography sx={{ margin: '1.5rem' }} variant="h4" color='secondary'>Thông tin bổ sung</Typography>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={12}
            md={6}>
            <Card>
              <CardActionArea
                onClick={() => alert('asdawdasd')}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={loanMediaC.imageUrl}
                  alt={loanMediaC.description}
                />
                <CardContent>
                  <Typography variant="h5">
                    {loanMediaC.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}>
            <Card>
              <CardActionArea
                onClick={() => alert('asdawdasd')}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={loanMediaD.imageUrl}
                  alt={loanMediaD.description}
                />
                <CardContent>
                  <Typography variant="h5">
                    {loanMediaD.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ margin: "20px 0px" }} />

        <Typography sx={{ margin: '1.5rem' }} variant="h4" color='secondary'>Thành tựu sinh viên đạt được</Typography>
        <Grid
          container
          spacing={2}>

          {
            archievements.map(item => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}>
                  <Card>
                    <CardActionArea
                      onClick={() => alert('asdawdasd')}
                    >
                      <CardMedia
                        component="img"
                        height="300"
                        image={item.imageUrl}
                        alt={item.description}
                      />
                      <CardContent>
                        <Typography variant="h5">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>

        <Divider sx={{ margin: "20px 0px" }} />
        <Grid
          container
          sx={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          width={'70%'}
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
              color="error"
              variant="contained"
              startIcon={<CloseIcon />}
            // loading={isSubmitting}
            >
              Từ chối
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
              endIcon={<CheckIcon />}
            // loading={isSubmitting}
            >
              Duyệt
            </LoadingButton>
          </Grid>

        </Grid>
      </Container>
    </div>
  );
}
