//mui components
import {
  Container,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Divider,
  Card,
  Paper,
  TextField,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
//mui icons
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
//react component
import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";

export default function ViewPost() {

  const [Student, setStudent] = useState({
    id: 'SE140595',
    name: "Nguyễn Trường Phi",
    university: "FPT",
    semester: 5,
  })

  const [section1, setsection1] = useState({
    money: 25000000,
    date: 12,
  })

  var formatMoney = section1.money;
  formatMoney = formatMoney.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

  return (
    <div>
      <Box component="div" sx={{ padding: "1rem 0rem" }}>
        <Typography variant="h3" align="center">
        {Student.name}
        </Typography>
        {/* <Grid container direction="row" justifyContent={'center'} alignItems="center">
          <AccountCircleRoundedIcon style={{
            margin: 5,
          }} /> {Student.name}
        </Grid>
        <Grid container direction="row" justifyContent={'center'} alignItems="center">
          <SchoolIcon style={{
            margin: 5,
          }} /> {Student.university}
        </Grid>
        <Grid container direction="row" justifyContent={'center'} alignItems="center">
          <HistoryEduIcon style={{
            margin: 5,
          }} /> {Student.semester}
        </Grid> */}
      </Box>
      <Container sx={{ padding: "3rem 3rem" }} maxWidth="xl">
        <Paper
          elevation={6}
          sx={{
            padding: "1.5rem", borderRadius: "10px"
          }}>
          <Typography variant="h5">Các thông tin cơ bản</Typography>

          <Grid container spacing="15" sx={{
            marginTop: '10px'
          }}>
            <Grid item xs="12" md="8">
              <video style={{
                borderRadius: '1rem',
              }} width="100%" height="" controls>
                <source
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>
            </Grid>
            <Grid item xs="12" md="4">
              <Grid container spacing="5">
                {/* <Grid item xs="12" md="12">
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{ height: "12px", borderRadius: 2 }}
                  />
                </Grid> */}
                <Grid item xs="12" md="12">
                  <Typography variant="h6">Cần vay</Typography>
                  <Typography variant="h5">{formatMoney}</Typography>
                </Grid>

                <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Thời hạn</Typography>
                  <Typography variant="h5">{section1.date} tháng</Typography>
                </Grid>

                <Grid item xs="6" md="12" sx={{ marginTop: "1rem" }}>
                  <Typography variant="h6">Ngày tốt nghiệp dự tính</Typography>
                  <Typography variant="h5">25/12/2025</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ margin: "20px 0px" }} />

        <Paper
          elevation={6}
          style={{
            padding: "1.5rem", borderRadius: "10px"
          }}>
          <Typography variant="h5">Mô tả</Typography>
          <Typography variant="h6" sx={{ marginTop: "10px" }}>
            A paragraph is a series of related sentences developing a central
            idea, called the topic. Try to think about paragraphs in terms of
            thematic unity: a paragraph is a sentence or a group of sentences
            that supports one central, unified idea. Paragraphs add one idea
            at a time to your broader argument.Topic sentences are similar to
            mini thesis statements. Like a thesis statement, a topic sentence
            has a specific main point. Whereas the thesis is the main point of
            the essay, the topic sentence is the main point of the paragraph.
          </Typography>
        </Paper>
        <Divider sx={{ margin: "20px 0px" }} />

        <Typography variant="h5">Thông tin bổ sung</Typography>
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
                  height="300"
                  image="/static/illustrations/illustration_register.png"
                  alt="front-cccd"
                />
                <CardContent>
                  <Typography variant="h5">
                    Mặt trước
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}>
            <Card justifyContent={'center'} alignItems="center">
              <CardActionArea
                onClick={() => alert('asdawdasd')}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image="/static/illustrations/illustration_register.png"
                  alt="front-cccd"
                />
                <CardContent>
                  <Typography variant="h5">
                    Mặt sau
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ margin: "20px 0px" }} />

        <Typography variant="h5">Thành tựu đạt được</Typography>
        <Grid
          container
          sx={{
            margintop:'10px'
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
                  height="300"
                  image="/static/illustrations/illustration_register.png"
                  alt="front-cccd"
                />
                <CardContent>
                  <Typography variant="h5">
                    Mặt trước
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid
            item
            xs={6}>
            <Card justifyContent={'center'} alignItems="center">
              <CardActionArea
                onClick={() => alert('asdawdasd')}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image="/static/illustrations/illustration_register.png"
                  alt="front-cccd"
                />
                <CardContent>
                  <Typography variant="h5">
                    Mặt sau
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "20px 0px" }} />
        <Grid
            container
            sx={{
              marginLeft:"auto",
              marginRight:"auto",
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
