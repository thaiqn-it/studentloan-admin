import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Grid, Autocomplete, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------



const CHART_DATA = [
  {
    name: 'Students',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 11]
  },
  {
    name: 'Backers',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 98]
  },
  // {
  //   name: 'Guests',
  //   type: 'line',
  //   data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 63]
  // }
];

// 10 năm gần nhất
const YEAR_DATA = ["2020", "2021", "2022"];

export default function TransactionDashBoard() {
  const [data, setdata] = useState([
    {
      name: 'Students',
      type: 'column',
      data: [23, 11, 22, 27]
    },
    {
      name: 'Backers',
      type: 'area',
      data: [44, 55, 41, 67]
    },
  ])

  // useEffect(() => {
  //   alert("data change")
  // }, [data])

  const changeYear = (e, v) => {
    if (v === '2020') {
      setdata([
        {
          name: 'Students',
          type: 'column',
          data: [23, 10, 23, 27]
        },
        {
          name: 'Backers',
          type: 'area',
          data: [44, 37, 41, 67]
        },
      ]
      )
    }
    if (v === '2021') {
      setdata([
        {
          name: 'Students',
          type: 'column',
          data: [23, 11, 22, 27]
        },
        {
          name: 'Backers',
          type: 'area',
          data: [44, 55, 41, 67]
        },
      ])
    }
    else {
      setdata([
        {
          name: 'Students',
          type: 'column',
          data: [10, 31, 21, 78]
        },
        {
          name: 'Backers',
          type: 'area',
          data: [19, 55, 60, 51]
        },
      ])
    }
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
            return `${y.toFixed(0)} transacions`;
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
        <CardHeader title="Transactions" sx={{ marginBottom: 1.8 }} subheader="(+43%) than last year" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable={true}
          options={YEAR_DATA}
          defaultValue={new Date().getFullYear()}
          onChange={changeYear}
          renderInput={(params) => <TextField {...params} style={{ width: 100 }} />}
        />
      </Grid>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
