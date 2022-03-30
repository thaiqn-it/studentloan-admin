import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import semesterFill from '@iconify/icons-ic/round-school';
import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
import moneyFill from '@iconify/icons-fa-solid/money-bill-wave';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { convertCurrencyVN } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import { mockImgCover } from '../../../utils/mockImages';

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
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
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
  const { totalMoney, id, title, postCreatedAt, Student } = post;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;


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
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
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
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt={Student.User.firstName}
            src={Student.User.profileUrl}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 80,
                height: 80
              })
            }}
          />
          <CoverImgStyle alt={title} src={mockImgCover(index + 1)} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
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
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {title}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                {getPost_Infor(info)}
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
