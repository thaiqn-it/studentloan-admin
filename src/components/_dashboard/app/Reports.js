import { Icon } from '@iconify/react';
import reportOutLined from '@iconify/icons-ant-design/file-text-outlined';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import { useEffect, useState } from 'react';
import { userApi } from '../../../apis/user';
import { USER_STATUS, USER_TYPE } from '../../../constants/enum';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
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
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

export default function Reports() {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchData = async() => {
      const res = await userApi.count({type:USER_TYPE.STUDENT || USER_TYPE.STUDENT, status:USER_STATUS.PENDING})
      setTotal(res.data)
    }
    fetchData()
  }, [])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={reportOutLined} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(total)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Yêu cầu xác thực từ người dùng
      </Typography>
    </RootStyle>
  );
}
