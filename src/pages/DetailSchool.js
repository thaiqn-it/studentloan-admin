import { Link as RouterLink } from 'react-router-dom';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// material
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring'
import {
  Grid, TextField, FormControl, OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import * as React from 'react';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
// import { RegisterForm } from '../components/authentication/register';
// import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  maxWidth: "85%",
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      margin: 30,
      height: 1.5
    }}
  />
);


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------
function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}


TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

let subId = '';

const StyledTreeItem = styled((props) => (
  <TreeItem {...props}
    onClick={() => {
      subId = props.nodeId;
      console.log(subId);
    }
      // console.log('delete',props.nodeId)
    }
    TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 20,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const isEdit = (subId) => {
  if (subId !== '') {
    return (
      <LoadingButton
        fullWidth
        size="large"
        style={{
          marginTop: 30,
          width: "20%",
        }}
        type="submit"
        variant="contained"
        endIcon={<Edit />}
      // loading={isSubmitting}
      >
        Edit
      </LoadingButton>
    )
  } else {
    return (
      <LoadingButton
        fullWidth
        size="large"
        style={{
          marginTop: 30,
          width: "20%",
        }}
        type="submit"
        variant="contained"
        endIcon={<Add />}
      // loading={isSubmitting}
      >
        Create
      </LoadingButton>
    )
  }
}

// ----------------------------------------------------------------------

export default function DetailSchool() {

  return (
    <RootStyle title="Chi tiết về trường">
      <AuthLayout />
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Chỉnh sửa thông tin về trường đại học
          </Typography>
          <img alt="editschool" src="/static/illustrations/illutrastion_editschool.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Typography variant='h3'>Thông Tin Trường</Typography>

          <Card
            style={{
              padding: 30,
            }}>
            <Typography>Tên</Typography>
            <TextField fullWidth value={"FPT"} disabled />


            <Typography style={{
              marginTop: 30
            }}>Email</Typography>
            <TextField fullWidth value={"fpt@edu.vn"} disabled />

            <Typography style={{
              marginTop: 30
            }}>Số điện thoại</Typography>
            <TextField fullWidth value={"1900 1089"} disabled />

            <Typography style={{
              marginTop: 30
            }}>Địa chỉ</Typography>
            <TextField fullWidth value={"Trường Đại học FPT TP. HCM, Khu Công Nghệ Cao, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh"} disabled />

            <Grid
              container
              direction="row"
              spacing={2}
              style={{
                marginTop: 30,
              }}
            >
              <Grid
                item
                xs={6}
              >
                <Typography>Thành Phố</Typography>
                <TextField fullWidth value={"Hồ Chí Minh"} disabled />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Zip Code</Typography>
                <TextField fullWidth value={"70000"} disabled />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={2}
              style={{
                marginTop: 30,
              }}
            >
              <Grid
                item
                xs={6}
              >
                <Typography>Phường</Typography>
                <TextField fullWidth value={"Hiệp Thành"} disabled />
              </Grid>
              <Grid
                item
                xs={6}
              >
                <Typography>Quận</Typography>
                <TextField fullWidth value={"12"} disabled />
              </Grid>
            </Grid>

            <LoadingButton
              fullWidth
              size="large"
              style={{
                marginTop: 30,
                width: "20%",
              }}
              type="submit"
              variant="contained"
              endIcon={<Edit />}
            // loading={isSubmitting}
            >
              Edit
            </LoadingButton>

          </Card>
          <ColoredLine color="#00FF9D" />
          <Typography variant='h3'>Danh sách các chuyên ngành</Typography>

          <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
            sx={{ flexGrow: 1, maxWidth: 500, overflowY: 'auto' }}
          >
            <StyledTreeItem onClick nodeId="1" label="Information Technology">
              <StyledTreeItem onClick nodeId="11" label="Artificial Intelligence" />
              <StyledTreeItem onClick nodeId="12" label="Graphic Design" />
              <StyledTreeItem onClick nodeId="13" label="Safety Information" />
            </StyledTreeItem>

            <StyledTreeItem onClick nodeId="2" label="Business Administration">
              <StyledTreeItem onClick nodeId="21" label="Hospitality Management" />
            </StyledTreeItem>
          </TreeView>

          <Typography style={{
            marginTop: 30,
          }} variant='h3'>Thông tin chuyên ngành</Typography>
          <Card
            style={{
              padding: 30,
            }}>
            <Typography>Loại</Typography>
            <TextField fullWidth defaultValue={""} />

            <Typography style={{
              marginTop: 30,
            }}>Tên</Typography>
            <TextField fullWidth defaultValue={""} />

            {isEdit(subId)}

          </Card>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
