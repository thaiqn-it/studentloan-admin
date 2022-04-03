//mui components
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Avatar,
  TextField,
  Dialog,
  Button,
  Snackbar,
  Alert
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
import { LOANHISTORYIMAGE_STATUS, LOANMEDIA_TYPE, LOAN_STATUS } from "../constants/enum";
import ReactPlayer from "react-player"
// import { mockImgCover } from "../utils/mockImages";
import imgNoVideo from '../assets/img-no-video-waiting-post.jpg'
import DropFileZone from "../components/dropfilezone";
import ImageModal from "../components/imagemodal";
import { loanHistoryApi } from "../apis/loanHistory";
import { loanHistoryImageApi } from "../apis/loanHistoryImage";
import Page from "../components/Page";

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loan, setLoan] = useState({})
  const [school, setSchool] = useState({})
  const [major, setMajor] = useState({})
  const [user, setUser] = useState({})
  const [archievements, setArchievements] = useState([])
  const [imgURL, setImgURL] = useState([])
  const [loanHistories, setLoanHistories] = useState([])
  const [loanMedia, setLoanMedia] = useState([])
  const [reason, setReason] = useState('')
  // const [loanMediaV, setLoanMediaV] = useState({})
  // const [loanMediaC, setLoanMediaC] = useState([])
  // const [loanMediaD, setLoanMediaD] = useState([])

  const [isOpenApproveDialog, setIsOpenAprroveDialog] = useState(false)
  const handleCloseApproveDialog = () => {
    setIsOpenAprroveDialog(false)
    setImgURL('')
  }
  const handleOpenApproveDialog = () => setIsOpenAprroveDialog(true)

  const [isOpenDeniedDialog, setIsOpenDeniedDialog] = useState(false)
  const handleCloseDeniedDialog = () => setIsOpenDeniedDialog(false)
  const handleOpenDeniedDialog = () => setIsOpenDeniedDialog(true)

  const [message, setMessage] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [colorSnackBar, setColorSnackBar] = useState('')
  const handleCloseSnackBar = () => setOpenSnackBar(false)
  // const handleCloseOpenSnackBar = () => setOpenSnackBar(false)
  useEffect(() => {
    const fetchData = async () => {
      const res = await loanApi.getOne(id)
      setLoan(res.data.loan)
      setSchool(res.data.loan.Student.SchoolMajor.School)
      setMajor(res.data.loan.Student.SchoolMajor.Major)
      setUser(res.data.loan.Student.User)
      setArchievements(res.data.loan.Student.Archievements)
      setLoanHistories(res.data.loan.LoanHistories)
      setLoanMedia(res.data.loan.LoanMedia)
    }
    fetchData()
  }, [id])

  const formatDate = (date) => {
    var data = '';
    data = moment(date).format('DD/MM/YYYY')
    return data;
  }

  const openImage = (url) => {
    return (
      <ImageModal
        component="img"
        image={url}
        sx={{
          borderRadius: 0,
          margin: 0,
          cursor: 'pointer',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    )
  }

  const onBack = () => {
    navigate("/dashboard/waitingpost")
  }

  const generateDuration = (date, duration) => {
    return formatDate(moment(date).add(duration, 'months'))
  }

  const getMsg = (msg, type, open) => {
    if (type === 'errorDropFile') {
      setColorSnackBar('error')
    }
    setMessage(msg)
    setOpenSnackBar(open)
  }

  const onFileChangeURL = (url, e) => {
    setImgURL(url)
  }

  const onDeleteURL = (url) => {
    setImgURL('')
  }

  const appropvePost = (history, url) => {
    const clone = (({ id, createdAt, updatedAt, adminId, ...o }) => o)(history)
    const newHistory = { ...clone, type: LOAN_STATUS.FUNDING, adminId: "cfe24265-6fe4-4b42-9115-acc2fc61d5fd" }
    loanHistoryApi.update(history.id, { ...history, isActive: false }).then(
      loanHistoryApi.create(newHistory)
    )
    // url.map(item => {
    //   return loanHistoryImageApi.create({
    //     loanHistoryId: history.id,
    //     imageUrl: item.url,
    //     status: LOANHISTORYIMAGE_STATUS.ACTIVE
    //   })
    // })
    loanHistoryImageApi.create({
      loanHistoryId: history.id,
      imageUrl: url,
      status: LOANHISTORYIMAGE_STATUS.ACTIVE
    })
    handleCloseApproveDialog()
    getMsg('Duyệt bài thành công!', 'success', true)
  }

  const denyPost = (history) => {
    const clone = (({ id, createdAt, updatedAt, adminId, ...o }) => o)(history)
    const newHistory = { ...clone,description:reason, type: LOAN_STATUS.DRAFT, adminId: "cfe24265-6fe4-4b42-9115-acc2fc61d5fd" }
    loanHistoryApi.update(history.id, { ...history, isActive: false }).then(
      loanHistoryApi.create(newHistory)
    )
    handleCloseDeniedDialog()
    setOpenSnackBar(false)
    getMsg('Từ chối bài thành công!', 'success', true)
  }

  return (
    <Page title="Chi tiết bài chờ duyệt">
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
              {
                loanMedia.filter(item => item.type === LOANMEDIA_TYPE.VIDEO).length ? loanMedia.filter(item => item.type === LOANMEDIA_TYPE.VIDEO).map(item =>
                (
                  <div>
                    <ReactPlayer
                      key={item.id}
                      controls={true}
                      loop
                      url={item.imageUrl}
                    />
                  </div>
                )
                ) : (
                  <div>
                    <CardMedia
                      component='img'
                      image={imgNoVideo} />
                  </div>
                )
              }
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
                onClick={() => navigate(`/dashboard/student/${user.id}`)}
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
          {
            loanMedia.map(item => {
              return item.type === LOANMEDIA_TYPE.DEMANDNOTE ?
                (
                  <Grid
                    item
                    key={item.id}
                    xs={12}
                    md={6}>
                    <Card>
                      <CardActionArea
                        onClick={() => openImage(item.imageUrl)}
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
                ) :
                (
                  <></>
                )
            })
          }
        </Grid>

        <Divider sx={{ margin: "20px 0px" }} />

        <Typography sx={{ margin: '1.5rem' }} variant="h4" color='secondary'>Chứng nhận sinh viên</Typography>
        <Grid
          container
          spacing={2}>
          {
            loanMedia.map(item => {
              return item.type === LOANMEDIA_TYPE.STUDENTCERT ?
                (
                  <Grid
                    item
                    xs={12}
                    key={item.id}
                    md={6}>
                    <Card>
                      <CardActionArea
                        onClick={() => openImage(item.imageUrl)}
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
                ) :
                (
                  <></>
                )
            })
          }
        </Grid>

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
                  key={item.id}
                  md={6}>
                  <Card>
                    <CardActionArea
                      onClick={() => openImage(item.imageUrl)}
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
            onClick={handleOpenDeniedDialog}
              fullWidth
              size="large"
              type="submit"
              color="error"
              variant="contained"
              startIcon={<CloseIcon />}
            >
              Từ chối
            </LoadingButton>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <LoadingButton
              onClick={handleOpenApproveDialog}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              endIcon={<CheckIcon />}
            >
              Duyệt
            </LoadingButton>
          </Grid>
        </Grid>
        <Dialog
          maxWidth='xl'
          open={isOpenApproveDialog}
          onClose={handleCloseApproveDialog}
          scroll='body'
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <Box
            sx={{
              padding: 2,
              width: 800,
            }}>
            <Typography sx={{ mt: 2 }} id="modal-modal-title" color="secondary" variant="h6" component="h2">
              Có thể thêm hình/file.pdf
            </Typography>
            <Box sx={{ mt: 2 }}>
              <DropFileZone image={imgURL} getMsg={getMsg} onDelete={onDeleteURL} onFileChangeURL={onFileChangeURL} ></DropFileZone>
            </Box>
            <Button
              fullWidth
              onClick={() => appropvePost(loanHistories[0], imgURL)}
              sx={{ mt: 2 }}
              variant="contained">
              Duyệt bài
            </Button>
          </Box>
        </Dialog>

        <Dialog
          maxWidth='xl'
          open={isOpenDeniedDialog}
          onClose={handleCloseDeniedDialog}
          scroll='body'
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <Box
            sx={{
              padding: 2,
              width: 800,
            }}>
            <Typography id="modal-modal-title" color="secondary" variant="h6" component="h2">
              Lý do:
            </Typography>
            <TextField multiline onChange={(event) => setReason(event.target.value)} value={reason} fullWidth id="modal-modal-description" sx={{ mt: 2 }} />
            <Button
              fullWidth
              onClick={() => denyPost(loanHistories[0])}
              sx={{ mt: 2 }}
              variant="contained">
              Từ chối
            </Button>
          </Box>
        </Dialog>
        <Snackbar open={openSnackBar} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={3000} onClose={handleCloseSnackBar}>
          <Alert onClose={handleCloseSnackBar} severity={colorSnackBar} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
}
