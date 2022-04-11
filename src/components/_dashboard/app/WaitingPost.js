import { Icon } from '@iconify/react';
import waitingOutLined from '@iconify/icons-ant-design/field-time-outlined';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { LOAN_STATUS } from '../../../constants/enum';
import { useEffect, useState } from 'react';
import { loanApi } from '../../../apis/loan';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function WaitingPost() {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchData = async() => {
      const res = await loanApi.countLoan(LOAN_STATUS.WAITING)
      setTotal(res.data)
    }
    fetchData()
  }, [])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={waitingOutLined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Bài xin vay đang chờ duyệt
      </Typography>
    </RootStyle>
  );
}
