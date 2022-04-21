import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
    TablePagination,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Snackbar,
    Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
//api
import { majorApi } from '../apis/major';
import { MAJOR_STATUS, SCHOOL_STATUS, STUDENT_STATUS } from '../constants/enum';
import moment from 'moment';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên', alignRight: false },
    { id: 'status', label: 'Trạng thái', alignRight: false },
    { id: '' },
    { id: '' }
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
        return filter(array, (_school) => _school.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}


export default function ManageMajor() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dataMajor, setDataMajor] = useState([])
    const [isChange, setIsChange] = useState(moment().format());
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedMajor, setSelectedMajor] = useState('')
    const [nameMajor, setNameMajor] = useState("");
    const [isDuplicated, setIsDuplicated] = useState(false);
    const [openSb, setOpenSb] = useState(false);
    const [colorMessage, setColorMessage] = useState('')
    const [message, setMessage] = useState('')
    useEffect(() => {
        majorApi.getAll().then(res => {
            setDataMajor(res.data)
        })
    }, [isChange])


    const displaySB = (msg, color) => {
        setOpenSb(true)
        setMessage(msg)
        setColorMessage(color)
    }

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

    const checkDuplicate = (list, name) => {
        list.filter(item => {
            if (name === item.name)
                setIsDuplicated(true)
        })
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataMajor.length) : 0;

    const filteredschools = applySortFilter(dataMajor, getComparator(order, orderBy), filterName);

    const isschoolNotFound = filteredschools.length === 0;

    return (
        <Page title="Quản lý ngành học">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Danh Sách Các Ngành
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setOpenAddDialog(true)}
                        startIcon={<AddIcon />}
                    >
                        Thêm ngành mới
                    </Button>
                </Stack>

                <Card>
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
                                    rowCount={dataMajor.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredschools
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, name, createdAt, updatedAt, status } = row;

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
                                                            color={(status === MAJOR_STATUS.INACTIVE && 'error') || 'success'}
                                                        >
                                                            {status === MAJOR_STATUS.INACTIVE ? 'Không kích hoạt' : 'Đang kích hoạt'}
                                                        </Label>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                        <LoadingButton
                                                            fullWidth
                                                            size="small"
                                                            type="submit"
                                                            onClick={() => {
                                                                setSelectedMajor({ id: id, createdAt: createdAt, updatedAt: updatedAt, status: status })
                                                                setOpenUpdateDialog(true)
                                                            }}
                                                            variant="contained"
                                                            endIcon={<EditIcon />}
                                                        >
                                                            Sửa tên
                                                        </LoadingButton>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <LoadingButton
                                                            fullWidth
                                                            size="small"
                                                            type="submit"
                                                            onClick={() => {
                                                                setSelectedMajor({ id: id, name: name, createdAt: createdAt, updatedAt: updatedAt })
                                                                setOpenDeleteDialog(true)
                                                            }}
                                                            color='error'
                                                            variant="contained"
                                                            endIcon={<DeleteIcon />}
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
                                {isschoolNotFound && (
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
            </Container>
            <Dialog open={openAddDialog} onClose={() => {
                setOpenAddDialog(false)
                setNameMajor("")
            }}>
                <DialogTitle>Thêm ngành mới</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField fullWidth sx={{ margin: 1 }} label="Tên" type={"text"} onChange={(e) => setNameMajor(e.target.value)} value={nameMajor} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="error" endIcon={<CloseIcon />} onClick={() => {
                        setOpenAddDialog(false)
                        setNameMajor("")
                    }}>Hủy</Button>
                    <Button
                        endIcon={<CheckIcon />}
                        disabled={nameMajor === ""}
                        onClick={() => {
                            majorApi.checkDuplicate(nameMajor).then(res => {
                                if (res.data !== null) {
                                    displaySB('Trùng tên', 'error')
                                } else {
                                    majorApi.create({
                                        name: nameMajor,
                                        status: MAJOR_STATUS.ACTIVE,
                                    }).then(res => {
                                        displaySB('Tạo mới thành công!', 'success')
                                        setOpenAddDialog(false)
                                        setNameMajor("")
                                        setIsChange(moment().format())
                                    })
                                }
                            })
                        }}
                    >
                        Tạo
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdateDialog} onClose={() => {
                setOpenUpdateDialog(false)
                setNameMajor("")
            }}>
                <DialogTitle>Chỉnh sửa ngành</DialogTitle>
                <DialogContent>
                    <div>
                        <TextField fullWidth sx={{ margin: 1 }} label="Tên mới" type={"text"} onChange={(e) => setNameMajor(e.target.value)} value={nameMajor} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="error" endIcon={<CloseIcon />} onClick={() => {
                        setOpenUpdateDialog(false)
                        setNameMajor("")
                    }}>Hủy</Button>
                    <Button
                        endIcon={<CheckIcon />}
                        disabled={nameMajor === ""}
                        onClick={() => {
                            majorApi.checkDuplicate(nameMajor).then(res => {
                                if (res.data !== null) {
                                    displaySB('Trùng tên', 'error')
                                } else {
                                    majorApi.update(selectedMajor.id, {
                                        ...selectedMajor,
                                        name: nameMajor,
                                    }).then(res => {
                                        setOpenUpdateDialog(false)
                                        setNameMajor("")
                                        displaySB('Chỉnh sửa thành công!', 'success')
                                        setIsChange(moment().format())
                                    }
                                    );
                                }
                            })
                        }
                        }
                    >
                        Chỉnh sửa
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={() => {
                setOpenDeleteDialog(false)
            }}>
                <DialogTitle>Bạn có chắc chắn về hành động này?</DialogTitle>
                <DialogActions>
                    <Button color="error" endIcon={<CloseIcon />} onClick={() => {
                        setOpenDeleteDialog(false)
                    }}>Hủy</Button>
                    <Button
                        endIcon={<CheckIcon />}
                        onClick={() => {
                            majorApi.update(selectedMajor.id, {
                                ...selectedMajor,
                                status: MAJOR_STATUS.INACTIVE,
                            }).then(res => {
                                setOpenDeleteDialog(false)
                                setIsChange(moment().format())
                                displaySB('Xóa thành công!', 'success')
                            }
                            );
                        }
                        }
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSb} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={3000} onClose={() => setOpenSb(false)}>
                <Alert onClose={() => setOpenSb(false)} severity={colorMessage} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Page>
    );
}
