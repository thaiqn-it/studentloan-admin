import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import faker from "faker";
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
  TextField,
  Card,
  Container,
  Typography,
  Button,
  Autocomplete,
  Snackbar,
  Alert,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBack from '@mui/icons-material/ArrowBack';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import * as React from 'react';
import Edit from '@mui/icons-material/Edit';
import Add from '@mui/icons-material/Add';
import { schoolApi } from '../apis/school';

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
  const navigate = useNavigate()
  const { id } = useParams();
  const [name, setname] = useState('')
  const [city, setcity] = useState('')
  const [district, setdistrict] = useState('')
  const [status, setstatus] = useState('')
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = React.useState('')
  const [majorSchool, setmajorSchool] = useState([])
  const [selectedMajorSchool, setselectedMajorSchool] = useState([])
  const [inputValue, setInputValue] = useState('')
  const option = ['active', 'banned']
  const [colorMessage, setcolorMessage] = useState('')
  const vertical = 'bottom'
  const horizontal = 'right'
  const [tab, settab] = React.useState(0);

  const handleChangeTabs = (event, newValue) => {
    settab(newValue);
  };

  useEffect(() => {
    schoolApi.getOne(id).then(res => {
      setname(res.data.name)
      setcity(res.data.city)
      setdistrict(res.data.district)
      setstatus(res.data.status)
    })

    setmajorSchool([
      {
        id: faker.datatype.uuid(),
        name: "English",
        children: [
          {
            id: faker.datatype.uuid(),
            name: "Spring",
            children: []
          }
        ]
      },
      {
        id: faker.datatype.uuid(),
        name: "Italian",
        children: [
          {
            id: faker.datatype.uuid(),
            name: "Level A",
            children: []
          }
        ]
      },
      {
        id: faker.datatype.uuid(),
        name: "Japanese",
      }
    ])
  }, [])

  const onChangeName = (event) => {
    setname(event.target.value)
  }
  const onChangeCity = (event) => {
    setcity(event.target.value)
  }
  const onChangeDistrict = (event) => {
    setdistrict(event.target.value)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function updateSchool(id) {
    schoolApi.update(id, {
      name,
      city,
      district,
      status,
    }
    ).then(res => {
      setOpen(true);
      setcolorMessage('success')
      setmessage('Tạo mới thành công!')
    }).catch(
      (e) => {
        console.log(e);
        setcolorMessage('error')
        setmessage('Tạo mới thất bại!')
      }
    )
  }

  const getTreeList = (majors) => {
    return majors.map(majorData => {
      let dataChildren = undefined;
      if (majorData.children && majorData.children.length > 0) {
        dataChildren = getTreeList(majorData.children);
      }
      return (
        <StyledTreeItem
          onClick={() => {
            setselectedMajorSchool(majorData)
            console.log(selectedMajorSchool)
          }}
          key={majorData.id}
          nodeId={majorData.id} label={majorData.name} children={dataChildren} />
      )
    })
  }

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
          <LoadingButton
            onClick={() => navigate(-1)}
            size="large"
            type="submit"
            sx={{
              borderColor: '#ABB5B1',
              color: '#ABB5B1',
              width: '15%'
            }}
            variant="outlined"
            startIcon={<ArrowBack />}
          >
            Back
          </LoadingButton>
          <Tabs value={tab} onChange={handleChangeTabs} centered>
            <Tab label="Thông tin cơ bản" />
            <Tab label="Chỉnh sửa ngành/chuyên ngành" />
            <Tab label="tạo ngành/chuyên ngành" />
          </Tabs>

          <Typography sx={{
            margin: '10px'
          }} variant='h3'>Thông Tin Trường</Typography>
          <Card
            style={{
              padding: 30,
            }}>
            <Typography>ID</Typography>
            <TextField fullWidth defaultValue={id} disabled />

            <Typography style={{
              marginTop: 30
            }}>Tên</Typography>
            <TextField fullWidth onChange={onChangeName} value={name} />

            <Typography style={{
              marginTop: 30
            }}>Thành Phố</Typography>
            <TextField fullWidth onChange={onChangeCity} value={city} />

            <Typography style={{
              marginTop: 30
            }}>Quận/Huyện</Typography>
            <TextField fullWidth onChange={onChangeDistrict} value={district} />

            <Typography style={{
              marginTop: 30
            }}>Trạng Thái</Typography>
            <Autocomplete
              value={status}
              onChange={(event, newValue) => {
                setstatus(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              disableClearable={true}
              options={option}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} />}
            />

            <Button
              fullWidth
              onClick={() => updateSchool(id)}
              size="large"
              style={{
                marginTop: 30,
                width: "20%",
              }}
              type="submit"
              variant="contained"
              endIcon={<Edit />}
            >
              Edit
            </Button>

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
            {getTreeList(majorSchool)}
          </TreeView>

          <Typography style={{
            marginTop: 30,
          }} variant='h3'>Thông tin chuyên ngành</Typography>
          <Card
            style={{
              padding: 30,
            }}>
            <Typography>ID</Typography>
            <TextField fullWidth value={selectedMajorSchool.id} disabled />

            <Typography style={{
              marginTop: 30
            }}>Ngành</Typography>
            <TextField fullWidth value={selectedMajorSchool.parent} />

            <Typography style={{
              marginTop: 30,
            }}>Tên Chuyên Ngành</Typography>
            <TextField fullWidth value={selectedMajorSchool.name} />

            {isEdit(subId)}

          </Card>
          <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={colorMessage} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
