// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { userApi } from '../apis/user';
// components
import Page from '../components/Page';
import {
  StudentSession,
  AppCurrentVisits,
  BackerSession,
  AssignedSchool,
  WaitingPost,
  AppCurrentSubject,
  TransactionDashBoard,
  Reports,
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {

  return (
    <Page title="Bảng phân tích">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Chào mừng trở lại</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StudentSession />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <BackerSession />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <WaitingPost />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Reports />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <TransactionDashBoard />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <AssignedSchool />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <AppCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
