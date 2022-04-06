import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import {
  Tree,
  getDescendants
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import { AddDialog } from "./AddDialog";
import { DeleteDialog } from "./DeleteDialog";
import { UpdateDialog } from "./UpdateDialog";
import styles from "./MajorHandle.module.css";
import { theme } from "../major/theme"
import { Alert, Card, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from "@mui/material";
import { majorApi } from "../../apis/major";
import { ListHead, ListToolbar } from "../_dashboard/user";
import Scrollbar from "../Scrollbar";
import SearchNotFound from "../SearchNotFound";
import Label from "../Label";
import { sentenceCase } from 'change-case';
import { LoadingButton } from "@mui/lab";
import { Edit, Clear } from "@mui/icons-material";
import { filter } from "lodash";

function MajorHandle(props) {
  const schoolId = props.schoolId

  //snackbar
  const vertical = 'bottom'
  const horizontal = 'right'
  const [colorMessage, setcolorMessage] = useState('')
  const [message, setmessage] = React.useState('')
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSb(false);
  };

  const TABLE_HEAD = [
    { id: 'name', label: 'Tên ngành', alignRight: false },
    { id: 'isVerified', label: 'Trạng thái', alignRight: false },
    { id: '' }
  ];

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [disable, setDisable] = useState(false);
  const [openSb, setOpenSb] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [dataMajor, setDataMajor] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [majorDelete,setMajorDelete] = useState(null)
  const [majorUpdate,setMajorUpdate] = useState({})

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    majorApi.getAllBySchool(schoolId).then(res => {
      setDataMajor(res.data)
    })
  }, [open,disable,update])

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataMajor.length) : 0;

  const filteredMajor = applySortFilter(dataMajor, getComparator(order, orderBy), filterName);
  const isMajorNotFound = filteredMajor.length === 0;

  const handleDelete = (id, value) => {
    const newTree = treeData.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          status: "INACTIVE"
        };
      }
      if (node.parent !== null && node.parent === id) {
        return {
          ...node,
          status: "INACTIVE"
        };
      }
      return node;
    });
    
    setTreeData(newTree);
  };

  const deleteBtnHandler = (id) => {
    setMajorDelete(id)
    setDisable(!disable) 
  }

  const updateBtnHandler = (id,name) => {
    setMajorUpdate({
      id,
      name
    })
    setUpdate(!update) 
  }


  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDisable(false);
  };

  const handleCloseUpdateDialog = () => {
    setUpdate(false);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };


  return (
    <Card
      sx={{
        padding: 2
      }}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseLine />
          <Button
            size="large"
            sx={{
              margin: 1
            }}
            variant="contained" onClick={handleOpenDialog} startIcon={<AddIcon />}>
            Tạo ngành
          </Button>
          {open && (
            <AddDialog
              schoolId={schoolId}
              onClose={handleCloseDialog}
            />
          )}

          {
            disable && (
              <DeleteDialog 
                onClose={handleCloseDeleteDialog}
                majorId={majorDelete}
              />
            )
          }

          {
            update && (
              <UpdateDialog 
                onClose={handleCloseUpdateDialog}
                major={majorUpdate}
              />
            )
          }

            <Card>
              <ListToolbar
                target={"Các ngành"}
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
                      rowCount={dataMajor.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredMajor
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                          const { id,name, status} = row;
                          return (                  
                            <TableRow
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
                                  color={(status === 'INACTIVE' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell>
                              <TableCell align="right">
                                <LoadingButton
                                  fullWidth
                                  size="small"
                                  type="submit"
                                  onClick={() => updateBtnHandler(id,name)}
                                  variant="contained"
                                  endIcon={<Edit />}
                                >
                                  Chỉnh sửa
                                </LoadingButton>
                              </TableCell>

                              <TableCell align="center">
                                <LoadingButton
                                  size="small"
                                  type="submit"
                                  color="error"
                                  variant="contained"
                                  onClick={() => deleteBtnHandler(id)}
                                  endIcon={<Clear />}
                                >
                                  Xóa
                                </LoadingButton>
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
                count={dataMajor.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
        </ThemeProvider>
        <Snackbar open={openSb} anchorOrigin={{ vertical, horizontal }} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={colorMessage} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </StylesProvider>
    </Card>
  );
}

export default MajorHandle;
