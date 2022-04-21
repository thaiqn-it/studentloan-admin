import React, { useEffect, useState } from "react";
import {
  Select,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Button from '@mui/material/Button';
import styles from "./AddDialog.module.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { majorApi } from "../../apis/major";
import AddIcon from '@mui/icons-material/Add';

import { MAJOR_STATUS, SCHOOLMAJOR_STATUS } from '../../constants/enum/index'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";
import { ListHead, ListToolbar } from "../_dashboard/user";
import Scrollbar from "../Scrollbar";
import Label from "../Label";
import SearchNotFound from "../SearchNotFound";
import { schoolMajorApi } from "../../apis/schoolmajorApi";

const TABLE_HEAD = [
  { id: 'name', label: 'Tên', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
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
    return filter(array, (_major) => _major.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export const UpdateDialog = (props) => {
  const { schoolId, majorUpdate } = props
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [majorList, setMajorList] = useState([])
  const [openConfirmChoosing, setOpenConfirmChoosing] = useState(false)
  const [major, setMajor] = useState('')

  useEffect(() => {
    majorApi.getAll().then(res => {
      setMajorList(res.data)
    })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const handleCloseUpdateDiaglog = () => {
    props.onClose
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - majorList.length) : 0;

  const filteredmajors = applySortFilter(majorList, getComparator(order, orderBy), filterName);

  const isMajorNotFound = filteredmajors.length === 0;
  return (
    <Dialog fullWidth maxWidth='sm' open={true} onClose={props.onClose}>
      <DialogTitle>Chỉnh sửa ngành hiện tại thành</DialogTitle>
      <DialogContent>
        <ListToolbar
          target={"Tên ngành"}
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
                rowCount={majorList.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredmajors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, createdAt, updatedAt, status } = row;
                    return (
                      <TableRow
                        onClick={() => {
                          setMajor(row)
                          setOpenConfirmChoosing(true)
                        }}
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell
                          component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center">
                            <Typography style={{
                              marginLeft: 15,
                            }} variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === MAJOR_STATUS.INACTIVE && 'error') || 'success'}
                          >
                            {status === MAJOR_STATUS.INACTIVE ? 'Không kích hoạt' : 'Đang kích hoạt'}
                          </Label>
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
              {isMajorNotFound && (
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
          count={majorList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </DialogContent>
      <Dialog open={openConfirmChoosing} onClose={() => {
        setOpenConfirmChoosing(false)
      }}>
        <DialogTitle>Bạn có muốn chỉnh sửa ngành hiện tại thành ngành {major.name}?</DialogTitle>
        <DialogActions>
          <Button color="error" endIcon={<CloseIcon />} onClick={() => {
            setOpenConfirmChoosing(false)
          }}>Không</Button>
          <Button
            endIcon={<CheckIcon />}
            onClick={() => {
              schoolMajorApi.findOne(major.id, schoolId).then(res => {
                if (res.data !== null) {
                  alert('Trường đã có ngành này rồi!')
                } else {
                  schoolMajorApi.update(majorUpdate.id, {
                    majorId: major.id,
                  }).finally(props.onClose)
                }
              })

            }
            }
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
