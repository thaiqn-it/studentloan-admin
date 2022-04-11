//mui components
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  TextField,
  Dialog,
  Button,
  Snackbar,
  Alert,
  Link,
  IconButton,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel, LoadingButton } from '@mui/lab';
//mui icons
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ArrowBack from "@mui/icons-material/ArrowBack";
//react component
import React, { useEffect, useState } from "react";
import { convertCurrencyVN } from "../utils/formatNumber";

import { useNavigate, useParams } from "react-router-dom";
import { loanApi } from "../apis/loan";
import moment from "moment";
import {
  LOANHISTORYIMAGE_STATUS,
  LOANMEDIA_TYPE,
  LOAN_STATUS,
} from "../constants/enum";
import ReactPlayer from "react-player";
import imgNoVideo from "../assets/img-no-video-waiting-post.jpg";
import DropFileZone from "../components/dropfilezone";
import ImageModal from "../components/imagemodal";
import { loanHistoryApi } from "../apis/loanHistory";
import { loanHistoryImageApi } from "../apis/loanHistoryImage";
import Page from "../components/Page";
import { loadToken } from "../apis";
import { userApi } from "../apis/user";
import ContractPage from '../pages/ContractPage'
import LoanSchedule from '../pages/LoanSchedule'

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState({});
  const [school, setSchool] = useState({});
  const [major, setMajor] = useState({});
  const [user, setUser] = useState({});
  const [archievements, setArchievements] = useState([]);
  const [imgURL, setImgURL] = useState(null);
  const [loanHistories, setLoanHistories] = useState([]);
  const [loanMedia, setLoanMedia] = useState([]);
  const [reason, setReason] = useState("");
  const [adminId, setAdminId] = useState('')
  const [title, setTitle] = useState({
    caption: '',
    titleButton: '',
  })

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setImgURL(null);
  };
  const handleOpenDialog = (type) => {
    setIsOpenDialog(true)
    if (type === 'Approve') {
      setTitle({
        caption: 'Mô tả: ',
        titleButton: 'Duyệt',
      })
    } else if (type === 'Deny') {
      setTitle({
        caption: 'Lý do từ chối: ',
        titleButton: 'Từ chối',
      })
    }
  };

  const [message, setMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [colorSnackBar, setColorSnackBar] = useState("");
  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const [tab, setTab] = useState(1);
  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await loanApi.getOne(id);
        setLoan(res.data.loan);
        setSchool(res.data.loan.Student.SchoolMajor.School);
        setMajor(res.data.loan.Student.SchoolMajor.Major);
        setUser(res.data.loan.Student.User);
        setArchievements(res.data.loan.Student.Archievements);
        setLoanHistories(res.data.loan.LoanHistories);
        setLoanMedia(res.data.loan.LoanMedia);

        loadToken()
        const resData = await userApi.getAdminInfo()
        setAdminId(resData.data.id)
      } catch (e) {
        navigate('/404')
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (date) => {
    var data = "";
    data = moment(date).format("DD/MM/YYYY");
    return data;
  };

  const onBack = () => {
    navigate("/dashboard/posts");
  };

  const generateDuration = (date, duration) => {
    return formatDate(moment(date).add(duration, "months"));
  };

  const getMsg = (msg, type, open) => {
    if (type === "errorDropFile") {
      setColorSnackBar("error");
    }
    setMessage(msg);
    setOpenSnackBar(open);
  };

  const onFileChangeURL = (url, e) => {
    var returnValue = null;
    if (e.target.name === "ADD") {
      returnValue = url;
    } else {
      returnValue = [...imgURL];
      url.forEach((ele) => {
        returnValue.push(ele);
      });
    }
    setImgURL(returnValue);
  };

  const onDeleteURL = (id) => {
    setImgURL(null);
  };

  const actionButton = (history, url, type) => {
    const clone = (({ id, createdAt, updatedAt, adminId, ...o }) => o)(history);
    let newHistory = {};
    if (type === 'Approve') {
      newHistory = {
        ...clone,
        description: reason,
        type: LOAN_STATUS.FUNDING,
        adminId: adminId,
      };
    } else if (type === 'Deny') {
      newHistory = {
        ...clone,
        description: reason,
        type: LOAN_STATUS.REJECTED,
        adminId: adminId,
      };
    }
    loanHistoryApi
      .update(history.id, { ...history, isActive: false })
      .then(loanHistoryApi.create(newHistory));
    if (url !== null) {
      url.map(item => {
        return loanHistoryImageApi.create({
          loanHistoryId: history.id,
          imageUrl: item.url,
          status: LOANHISTORYIMAGE_STATUS.ACTIVE
        })
      })
    }
    handleCloseDialog();
    if (type === 'Approve') {
      getMsg("Duyệt bài thành công! (Sẽ quay về sau 3 giây)", "success", true);
    } else if (type === 'Deny') {
      getMsg("Từ chối bài thành công! (Sẽ quay về sau 3 giây)", "success", true);
    }
    setTimeout(() => {
      onBack()
    }, 3000)
  };

  function getFileName(url) {
    var splittedArr = url.split("/");
    var name = splittedArr[splittedArr.length - 1];
    var fileName = name.substring(name.indexOf("-") + 1, name.length);
    return fileName;
  }

  function arrayRemove(value) {
    var returnArray = imgURL.filter(function (ele) {
      return ele.url != value;
    });
    if (returnArray.length === 0) {
      returnArray = null;
    }
    setImgURL(returnArray);
  }

  return (
    <Page title="Chi tiết bài chờ duyệt">
      <Container sx={{ padding: "3rem 3rem" }} maxWidth="xl">
        <Typography variant="h4" onClick={onBack}>
          <ArrowBack />
        </Typography>
        <TabContext value={tab}>
          {
            loanHistories[0]?.type === LOAN_STATUS.ONGOING ? (
              <TabList value={tab} onChange={handleChangeTabs} centered>
                <Tab label="Thông tin cơ bản" value={1} />
                <Tab label="Hợp đồng" value={2} />
                <Tab label="Lịch trình trả nợ" value={3} />
              </TabList>
            ) : (<></>)
          }

          <TabPanel value={1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 20,
              }}
            >
              <Typography variant="h4">{loan.title}</Typography>
            </div>
            <Card
              elevation={6}
              sx={{
                padding: "1.5rem",
                borderRadius: "10px",
              }}
            >
              <Typography color="secondary" variant="h4">
                Các thông tin cơ bản
              </Typography>
              <Grid
                container
                spacing="15"
                sx={{
                  marginTop: "2px",
                }}
              >
                <Grid item xs="12" md="7">
                  {loanMedia.filter((item) => item.type === LOANMEDIA_TYPE.VIDEO)
                    .length ? (
                    loanMedia
                      .filter((item) => item.type === LOANMEDIA_TYPE.VIDEO)
                      .map((item) => (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <ReactPlayer
                            key={item.id}
                            controls={true}
                            loop
                            url={item.imageUrl}
                          />
                        </div>
                      ))
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ImageModal component="img" image={imgNoVideo} />
                    </div>
                  )}
                </Grid>
                <Grid item xs="12" md="5">
                  <Grid container spacing="5">
                    <Grid item xs="6" md="12">
                      <Typography variant="h6">Cần vay</Typography>
                      <Typography color="primary" variant="h4">
                        {convertCurrencyVN(loan.totalMoney)}
                      </Typography>
                    </Grid>

                    <Grid item xs="6" md="12">
                      <Typography variant="h6">Trạng thái</Typography>
                      {loanHistories[0]?.type === LOAN_STATUS.WAITING ?
                        (<Typography color='secondary' variant="h4">
                          Đang chờ duyệt
                        </Typography>)
                        :
                        (<Typography color='primary' variant="h4">
                          Đang trong tiến độ trả nợ
                        </Typography>)}
                    </Grid>

                    <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                      <Typography variant="h6">Vay trong</Typography>
                      <Typography variant="h5">{loan.duration} tháng</Typography>
                    </Grid>

                    <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                      <Typography variant="h6">
                        Thời gian ra trường dự kiến
                      </Typography>
                      <Typography variant="h5">
                        {generateDuration(
                          loan.postCreatedAt,
                          loan.expectedGraduationTime
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>

            <Divider sx={{ margin: "20px 0px" }} />

            <Card
              elevation={6}
              style={{
                padding: "1.5rem",
                borderRadius: "10px",
              }}
            >
              <Typography color="secondary" variant="h4">
                Thông tin sơ lược của sinh viên
              </Typography>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  md={3}
                >
                  <Avatar
                    onClick={() => navigate(`/dashboard/student/${user.id}`)}
                    sx={{ height: "200px", width: "200px" }}
                    alt="Student"
                    bgColor="light"
                    src={user.profileUrl}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
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
                padding: "1.5rem",
                borderRadius: "10px",
              }}
            >
              <Typography color="secondary" variant="h4">
                Mô tả
              </Typography>
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                {loan.description}
              </Typography>
            </Card>

            <Divider sx={{ margin: "20px 0px" }} />

            <Typography sx={{ margin: "1.5rem" }} variant="h4" color="secondary">
              Thông tin bổ sung
            </Typography>
            <Grid container spacing={2}>
              {loanMedia.map((item) => {
                return item.type === LOANMEDIA_TYPE.DEMANDNOTE ? (
                  <Grid item key={item.id} xs={12} md={6}>
                    <Card>
                      <CardActionArea>
                        <ImageModal
                          component="img"
                          height="300"
                          image={item.imageUrl}
                          alt={item.description}
                        />
                        <CardContent>
                          <Typography variant="h5">{item.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ) : (
                  <></>
                );
              })}
            </Grid>

            <Divider sx={{ margin: "20px 0px" }} />

            <Typography sx={{ margin: "1.5rem" }} variant="h4" color="secondary">
              Chứng nhận sinh viên
            </Typography>
            <Grid container spacing={2}>
              {loanMedia.map((item) => {
                return item.type === LOANMEDIA_TYPE.STUDENTCERT ? (
                  <Grid item xs={12} key={item.id} md={6}>
                    <Card>
                      <CardActionArea>
                        <ImageModal
                          component="img"
                          height="300"
                          image={item.imageUrl}
                          alt={item.description}
                        />
                        <CardContent>
                          <Typography variant="h5">{item.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ) : (
                  <></>
                );
              })}
            </Grid>

            <Divider sx={{ margin: "20px 0px" }} />

            <Typography sx={{ margin: "1.5rem" }} variant="h4" color="secondary">
              Thành tựu sinh viên đạt được
            </Typography>
            <Grid container spacing={2}>
              {archievements.map((item) => {
                return (
                  <Grid item xs={12} key={item.id} md={6}>
                    <Card>
                      <ImageModal
                        component="img"
                        height="300"
                        image={item.imageUrl}
                        alt={item.description}
                      />
                      <CardContent>
                        <Typography variant="h5">{item.description}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {
              loanHistories[0]?.type === LOAN_STATUS.WAITING ? (
                <>
                  <Divider sx={{ margin: "20px 0px" }} />
                  <Grid
                    container
                    sx={{
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    width={"70%"}
                    spacing={2}
                  >
                    <Grid item xs={6}>
                      <LoadingButton
                        onClick={() => handleOpenDialog('Deny')}
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
                    <Grid item xs={6}>
                      <LoadingButton
                        onClick={() => handleOpenDialog('Approve')}
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
                </>
              ) : (<></>)
            }

          </TabPanel>

          <TabPanel
            value={2}>
            <ContractPage loanId={id} />
          </TabPanel>

          <TabPanel
            value={3}>
            <LoanSchedule loanId={id} />
          </TabPanel>
        </TabContext>
        <Dialog
          maxWidth="xl"
          open={isOpenDialog}
          onClose={handleCloseDialog}
          scroll="body"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <Box
            sx={{
              padding: 2,
              width: 800,
            }}
          >

            <Typography
              id="modal-modal-title"
              color="secondary"
              variant="h6"
              component="h2"
            >
              {title?.caption}
            </Typography>
            <TextField
              multiline
              onChange={(event) => setReason(event.target.value)}
              value={reason}
              fullWidth
              id="modal-modal-description"
              sx={{ mt: 2 }}
            />
            <Typography
              sx={{ mt: 2 }}
              id="modal-modal-title"
              color="error"
              variant="h6"
              component="h2"
            >
              *Chọn ít nhất 1 tệp để đính kèm
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  p: 1.2,
                  boxShadow: "0 2px 6px 0 rgb(0 0 0 / 17%)",
                  width: "100%",
                }}
              >
                {imgURL?.map((item) => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Link href={item.url} underline="hover" color="black" target="_blank" rel="noopener noreferrer">
                      {getFileName(item.url)}
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => arrayRemove(item.url)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                <DropFileZone
                  image={imgURL}
                  getMsg={getMsg}
                  onDelete={onDeleteURL}
                  onFileChangeURL={onFileChangeURL}
                />
              </Box>
            </Box>
            <Button
              fullWidth
              onClick={() => title?.titleButton === 'Duyệt' ? actionButton(loanHistories[0], imgURL, 'Approve') : actionButton(loanHistories[0], imgURL, 'Deny')}
              sx={{ mt: 2 }}
              variant="contained"
            >
              {title?.titleButton}
            </Button>
          </Box>
        </Dialog>
        <Snackbar
          open={openSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={colorSnackBar}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
}