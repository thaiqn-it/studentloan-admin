import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';
import React, { useEffect, useState } from 'react';
import { loanApi } from '../../../apis/loan';
import { LOAN_STATUS } from '../../../constants/enum';
import moment from "moment";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function LoanSession() {

  const [status, setStatus] = useState(['hoàn thành', 'trong tiến độ', 'chờ duyệt', 'thất bại', 'đang kêu gọi'])
  const [listYear, setListYear] = useState([])
  const [listChartData, setListChartData] = useState([])
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    var arrYear = []
    for (let index = 0; index < 10; index++) {
      arrYear.push((currentYear - index).toString())
    }
    setListYear(arrYear)
    getListChartData(currentYear.toString())
  }, [])

  const getListChartData = async (year) => {
    let data = []
    for (var index = 0; index < status.length; index++) {
      var item = status[index]
      switch (item) {
        case 'hoàn thành':
          {
          const res = await loanApi.countLoanBaseTime(
            {
              startDate: moment(year).startOf('year').format(),
              endDate: moment(year).endOf('year').format(),
              type: LOAN_STATUS.FINISH
            }
          )
          data.push(res.data)
          break;
        }
        case 'trong tiến độ': {
          const res = await loanApi.countLoanBaseTime(
            {
              startDate: moment(year).startOf('year').format(),
              endDate: moment(year).endOf('year').format(),
              type: LOAN_STATUS.ONGOING
            }
          )
          data.push(res.data)
          break;
        }
        case 'chờ duyệt': {
          const res = await loanApi.countLoanBaseTime(
            {
              startDate: moment(year).startOf('year').format(),
              endDate: moment(year).endOf('year').format(),
              type: LOAN_STATUS.WAITING
            }
          )
          data.push(res.data)
          break;
        }
        case 'thất bại': {
          const res = await loanApi.countLoanBaseTime(
            {
              startDate: moment(year).startOf('year').format(),
              endDate: moment(year).endOf('year').format(),
              type: LOAN_STATUS.FAIL
            }
          )
          data.push(res.data)
          break;
        }
        case 'đang kêu gọi': {
          const res = await loanApi.countLoanBaseTime(
            {
              startDate: moment(year).startOf('year').format(),
              endDate: moment(year).endOf('year').format(),
              type: LOAN_STATUS.FUNDING
            }
          )
          data.push(res.data)
          break;
        }
        default: break;
      }
    }
    setListChartData(data)
  }

  const changeYear = (e, v) => {
    getListChartData(v)
  }

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['hoàn thành', 'trong tiến độ', 'chờ duyệt', 'thất bại', 'đang kêu gọi'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <CardHeader title="Số liệu của các bài xin vay" sx={{ marginBottom: 1.8 }} subheader="của năm" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable={true}
          options={listYear}
          onChange={changeYear}
          defaultValue={new Date().getFullYear()}
          renderInput={(params) => <TextField {...params} style={{ width: 100 }} />}
        />
      </Grid>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={listChartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
