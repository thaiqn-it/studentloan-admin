import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, Grid, Autocomplete, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

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

const YEAR_DATA =["2019","2020","2021"];

export default function TransactionDashBoard() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/02/2003',
      '02/02/2003',
      '03/02/2003',
      '04/02/2003',
      '05/02/2003',
      '06/02/2003',
      '07/02/2003',
      '08/02/2003',
      '09/02/2003',
      '10/02/2003',
      '11/02/2003',
      '12/02/2003'
    ],
    xaxis: { type: 'datetime' },
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
<CardHeader title="Transactions" sx={{marginBottom:1.8}} subheader="(+43%) than last year" />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      disableClearable={true}
      options={YEAR_DATA}
      defaultValue={new Date().getFullYear()}
      renderInput={(params) => <TextField {...params} style={{width:100}}/>}
    />
    </Grid>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
