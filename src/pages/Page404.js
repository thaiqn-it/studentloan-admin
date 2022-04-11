import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const navigate = useNavigate()
  return (
    <RootStyle title="404 Page Not Found">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Có lỗi sảy ra trong quá trình!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
            Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. 
            Xin vui lòng kiểm tra lại.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button 
            onClick={(e)=>{
              e.preventDefault()
              navigate('../dashboard')
            }} size="large" variant="contained">
              Quay về trang chính
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
