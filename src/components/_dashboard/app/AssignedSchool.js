import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 239,1623, 203] }];

export default function AssignedSchool() {
  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'FPT',
        'Hoa Sen',
        'HuTech',
        'Văn Lang',
        'Luật',
        'Y Dược'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Assigned Universites" subheader="" />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} 
        options={chartOptions} 
        height={364} />
      </Box>
    </Card>
  );
}
