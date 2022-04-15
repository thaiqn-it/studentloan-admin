import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Avatar,
  TablePagination
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
//
import { userApi } from '../apis/user';
import { USER_STATUS, USER_TYPE } from '../constants/enum';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên người dùng', alignRight: false },
  { id: 'phoneNum', label: 'Số điện thoại người dùng', alignRight: false },
  { id: 'email', label: 'Thư điện tử', alignRight: false },
  { id: 'type', label: 'Loại', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const color = (status) => {
  if (status === USER_STATUS.BAN) {
    return 'error'
  }
  if (status === USER_STATUS.UNVERIFIED) {
    return 'default'
  }
  if (status === USER_STATUS.VERIFIED) {
    return 'success'
  }
  if (status === USER_STATUS.PENDING) {
    return 'warning'
  }
}

const vietSubStatus = (status) => {
  if (status === USER_STATUS.BAN) {
    return 'Bị cấm'
  }
  if (status === USER_STATUS.UNVERIFIED) {
    return 'Chưa xác thực'
  }
  if (status === USER_STATUS.VERIFIED) {
    return 'Đã xác thực'
  }
  if (status === USER_STATUS.PENDING) {
    return 'Chờ xác thực'
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => {
      var name = _user.firstName + " " + _user.lastName
      return name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    }
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('type');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userApi.getAll().then(res => {
      setUserList(res.data)
    })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isStudent = (type, id) => {
    if (type === 'STUDENT') {
      return (
        <LoadingButton
          fullWidth
          size="small"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate(`../student/${id}`);
          }}
          variant="contained"
          endIcon={<VisibilityIcon />}
        >
          Xem chi tiết
        </LoadingButton>
      )
    } else {
      return (
        <LoadingButton
          fullWidth
          size="small"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            navigate(`../investor/${id}`);
          }}
          variant="contained"
          endIcon={<VisibilityIcon />}
        >
          Xem chi tiết
        </LoadingButton>
      )
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Danh sách người dùng">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách người dùng
          </Typography>
        </Stack>

        <Card>
          <ListToolbar
            target={"Số điện thoại"}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        phoneNumber,
                        type,
                        email,
                        profileUrl,
                        status } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell
                            component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <Avatar alt={lastName} src={profileUrl} style={{
                                marginLeft: 10,
                              }}/>
                              <Typography variant="subtitle2" noWrap>
                              {firstName} {lastName}
                              </Typography>
                            </Stack>
                            {/* <Stack direction="row" alignItems="center">
                              <Typography style={{
                                marginLeft: 15,
                              }} variant="subtitle2" noWrap>
                                
                              </Typography>
                            </Stack> */}
                          </TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{type === USER_TYPE.STUDENT ? 'Sinh viên' : 'Nhà đầu tư'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={color(status)}
                            >
                              {vietSubStatus(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            {isStudent(type, id)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
