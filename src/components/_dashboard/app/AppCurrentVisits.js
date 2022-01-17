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
import React, { useState }  from 'react';

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


const YEAR_DATA =["2020","2021","2022"];
// const CHART_DATA = [8372, 5435, 1443, 3201];

export default function AppCurrentVisits() {
  const [data, setdata] = useState([8372, 5435, 1443, 3201])

  const changeYear = (e,v)=>{
    if(v==='2020'){
      setdata([8323, 6435, 1243, 3209])
    }
    if(v==='2021'){
      setdata([1833, 8435, 2243, 7309])
    }
    else{
      setdata([8372, 5435, 1443, 3201])
    }
  }

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: ['Successed', 'Processing', 'Waiting', 'Failed'],
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
      <CardHeader title="Loan Post at" sx={{marginBottom:1.8}} subheader="(+43%) than last year" />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      disableClearable={true}
      options={YEAR_DATA}
      onChange={changeYear}
      defaultValue={new Date().getFullYear()}
      renderInput={(params) => <TextField {...params} style={{width:100}}/>}
    />
    </Grid>
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={data} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
