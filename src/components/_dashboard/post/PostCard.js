import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import semesterFill from '@iconify/icons-ic/round-school';
import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
import moneyFill from '@iconify/icons-fa-solid/money-bill-wave';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Stack } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertCurrencyVN } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default function BlogPostCard({ post, index }) {
  const { totalMoney, id, title, postCreatedAt, Student, LoanHistories } = post;

  const getIcon = (type) => {
    if (type === 'WAITING') {
      return 'https://media.istockphoto.com/vectors/flip-hourglass-icon-to-keep-track-of-the-elapsed-time-vector-id1322169400?b=1&k=20&m=1322169400&s=170667a&w=0&h=qkub6UGQNWBWvC2GdIXKHVMfgif5ahag3_3iZ0Mj56I='
    } else if (type === 'ONGOING') {
      return 'https://www.pngkit.com/png/detail/302-3023079_progress-icon.png'
    }
  }

  const POST_INFO = [
    { name: totalMoney, icon: moneyFill },
    { name: Student, icon: semesterFill },
  ];

  const getPost_Infor = (info) => {
    if (typeof info.name === 'object') {
      var nameGet = info.name.SchoolMajor.Major.name
      return (
        <>
          <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
          <Typography variant="caption">{nameGet}</Typography>
        </>
      )
    } else {
      return (
        <>
          <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
          <Typography variant="caption">{convertCurrencyVN(info.name)}</Typography>
        </>
      )
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
            }}
          />

          <CoverImgStyle alt={title}
            src={Student.User.profileUrl}
          />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
          }}
        >
          <Grid
            container
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              {Student.User.firstName} {Student.User.lastName}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              {Student.SchoolMajor.School.name}
            </Typography>
          </Grid>

          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(postCreatedAt)}
          </Typography>

          <TitleStyle
            to={`../viewPost/${id}`}
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {title}
          </TitleStyle>

          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <div
              >
              <AvatarStyle
                alt={Student.User.firstName}
                src={getIcon(LoanHistories[0]?.type)}
              />
            </div>

            <div>
              <InfoStyle>
                {POST_INFO.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                    }}
                  >
                    {getPost_Infor(info)}
                  </Box>
                ))}
              </InfoStyle>
            </div>

          </Stack>


        </CardContent>
      </Card>
    </Grid>
  );
}
