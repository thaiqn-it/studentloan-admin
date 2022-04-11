import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Grid, Autocomplete, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { useEffect, useState } from 'react';
import moment from "moment";
import { transactionApi } from '../../../apis/transactionApi';

// ----------------------------------------------------------------------

//Type of chart line/area/column

export default function TransactionDashBoard() {
  const [listYear, setListYear] = useState([])
  const [listChartData, setListChartData] = useState([])
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    var arrYear = []
    for (let index = 0; index < 10; index++) {
      arrYear.push((currentYear - index).toString())
    }
    setListYear(arrYear)
    
    getListChartData((currentYear + 1).toString())
  }, [])

  const getListChartData = async (year) => {
    var data = []
    for (let index = 1; index <= 4; index++) {
      let res = await transactionApi.count(
        {
          startDate: moment(year).subtract(1, 'ms').quarter(index - 1).format().toString(),
          endDate: moment(year).subtract(1, 'ms').quarter(index).format().toString()
        }
      )
      data.push(res.data)
    }
    setListChartData([{
      name: 'Tổng có',
      type: 'column',
      data: data
    }])
  }

  const changeYear = (e, v) => {
    var convertYear = Number.parseInt(v)
    getListChartData((convertYear+1).toString())
  }

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      'Quý 1',
      'Quý 2',
      'Quý 3',
      'Quý 4',
    ],
    xaxis: { type: 'string' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} giao dịch`;
          }
          return y;
        }
      }
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
        <CardHeader title="Số liệu về các giao dịch" sx={{ marginBottom: 1.8 }} subheader="của năm" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable={true}
          options={listYear}
          defaultValue={new Date().getFullYear()}
          onChange={changeYear}
          renderInput={(params) => <TextField {...params} style={{ width: 100 }} />}
        />
      </Grid>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={listChartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
