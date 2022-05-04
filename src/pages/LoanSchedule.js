import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Card, TableContainer, Table, TableBody, TableCell, Snackbar, Alert, TableRow, TablePagination, Typography, Grid, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material'

import { loanScheduleApi } from '../apis/loanScheduleApi';
import { fDate } from '../utils/formatTime';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';
import { convertCurrencyVN } from '../utils/formatNumber';
import { LOAN_SCHEDULE_STATUS, LOAN_SCHEDULE_TYPE, LOAN_STATUS, NOTIFICATION_TYPE, USER_STATUS, USER_TYPE } from '../constants/enum/index'
import { filter } from 'lodash';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { loanHistoryApi } from '../apis/loanHistory';
import { useAuthState } from '../context/AuthContext';
import { investmentApi } from '../apis/investmentApi';
import { Box } from '@mui/system';
import { userApi } from '../apis/user';
import { notificationApi } from '../apis/notificationApi';

const TABLE_HEAD = [
    { id: 'type', label: 'Tiến độ', alignRight: false },
    { id: 'money', label: 'Số tiền cần trả', alignRight: false },
    { id: 'penaltyMoney', label: 'Tiền phạt cần trả', alignRight: false },
    { id: 'startAt', label: 'Ngày bắt đầu', alignRight: false },
    { id: 'endAt', label: 'Ngày đến hạn', alignRight: false },
    { id: 'status', label: 'Trạng thái', alignRight: false }
];

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
        return filter(array, (_schedule) => _schedule.type.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

function getColorBaseStatus(status) {
    if (status === LOAN_SCHEDULE_STATUS.ONGOING) {
        return 'warning'
    } else if (status === LOAN_SCHEDULE_STATUS.COMPLETED) {
        return 'success'
    } else {
        return 'error'
    }
}

function vietsubStatus(status) {
    if (status === LOAN_SCHEDULE_STATUS.ONGOING) {
        return 'đang trả'
    } else if (status === LOAN_SCHEDULE_STATUS.COMPLETED) {
        return 'đã trả'
    } else {
        return 'đã trễ'
    }
}

export default function App(props) {
    const { loanId, loanHistory, user } = props
    const navigate = useNavigate()
    const [listSchedule, setSchedule] = useState([])
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('startAt');
    const [filterType, setFilterType] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isLate, setIsLate] = useState(false)
    const [title, setTitle] = useState(null)
    const context = useAuthState()
    const admin = context.admin
    const [reason, setReason] = useState(null)
    const [action, setAction] = useState(null)

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const handleCloseSnackBar = () => setOpenSnackBar(false);

    const [open, setOpen] = useState(false)
    const handleOpen = (action) => {
        setOpen(true)
        setAction(action)
    }
    const handleClose = () => {
        setOpen(false)
        setReason(null)
        setAction(null)
    }

    const [loading, setLoading] = useState(false)
    const handleCloseLoading = () => {
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            var numberScheduleLate = 0
            const res = await loanScheduleApi.getAllByLoanId(loanId)
            setSchedule(res.data)
            res.data.map(item => {
                if (item.status === LOAN_SCHEDULE_STATUS.INCOMPLETE) {
                    numberScheduleLate++
                } else {
                    numberScheduleLate--
                }
            })
            if (numberScheduleLate >= 5) setIsLate(true)
        }
        fetchData()
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

    const handleFilterByType = (event) => {
        setFilterType(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listSchedule.length) : 0;

    const filteredschedules = applySortFilter(listSchedule, getComparator(order, orderBy), filterType);

    const isFilterNotFound = filteredschedules.length === 0;

    const actionButton = () => {
        setLoading(true)
        var clone = (({ id, createdAt, updatedAt, adminId, ...o }) => o)(loanHistory);
        var newHistory = {}
        if (action === 'close') {
            try {
                if (reason === null || reason.length < 1) {
                    alert('Không được để trống lí do')
                    setLoading(false)
                    return
                }
                newHistory = {
                    ...clone,
                    description: reason,
                    type: LOAN_STATUS.INCOMPLETE,
                    adminId: admin.id,
                };
                handleClose()
                setOpenSnackBar(true)
                setTimeout(() => {
                    navigate("/dashboard/posts");
                }, 3000)
                loanHistoryApi.update(loanHistory.id, { ...loanHistory, isActive: false }).then(
                    loanHistoryApi.create(newHistory)
                )
                    .then(
                        userApi.update({ ...user, status: USER_STATUS.BAN, reason: reason })
                    )
                    .then(
                        notificationApi.pushNotifToUser({
                            type: USER_TYPE.STUDENT,
                            notiType: NOTIFICATION_TYPE.LOAN,
                            userId: user.id,
                            msg: "Hồ sơ vay của bạn đã kết thúc",
                            redirectUrl: `/trang-chu/ho-so/xem/${loanId}`,
                        }).then(
                            notificationApi.pushNotifToUser({
                                type: USER_TYPE.STUDENT,
                                notiType: NOTIFICATION_TYPE.USER,
                                userId: user.id,
                                msg: reason,
                                redirectUrl: `/trang-chu/thong-tin`,
                            }).then(async (res) => {
                                const resListInvesment = await investmentApi.findAllByLoanId(loanId)
                                resListInvesment.data.map(async (item) => {
                                    await notificationApi.pushNotifToUser({
                                        type: USER_TYPE.INVESTOR,
                                        notiType: NOTIFICATION_TYPE.LOAN,
                                        userId: item.Investor.User.id,
                                        msg: `Hồ sơ vay của sinh viên ${user.firstName} ${user.lastName} không hoàn thành`,
                                        redirectUrl: `myapp://investmentDetail/${item.id}`,
                                    })
                                })
                                setLoading(false)
                            })
                        )
                    )
            } catch (e) {
                setLoading(false)
                handleClose()
                console.log(e)
            }
        } else {
            try {
                newHistory = {
                    ...clone,
                    description: null,
                    type: LOAN_STATUS.ONGOING,
                    adminId: admin.id,
                };
                handleClose()
                setOpenSnackBar(true)
                setTimeout(() => {
                    navigate("/dashboard/posts");
                }, 3000)
                loanHistoryApi.update(loanHistory.id, { ...loanHistory, isActive: false }).then(
                    loanHistoryApi.create(newHistory)
                )
                    .then(
                        notificationApi.pushNotifToUser({
                            type: USER_TYPE.STUDENT,
                            notiType: NOTIFICATION_TYPE.LOAN,
                            userId: user.id,
                            msg: "Hồ sơ vay của bạn được phép tiếp tục",
                            redirectUrl: `/trang-chu/ho-so/xem/${loanId}`,
                        })
                            // .then(
                            //     notificationApi.pushNotifToUser({
                            //         type: USER_TYPE.STUDENT,
                            //         notiType: NOTIFICATION_TYPE.USER,
                            //         userId: user.id,
                            //         msg: reason,
                            //         redirectUrl: `/trang-chu/thong-tin`,
                            //     })
                            .then(async (res) => {
                                const resListInvesment = await investmentApi.findAllByLoanId(loanId)
                                resListInvesment.data.map(async (item) => {
                                    await notificationApi.pushNotifToUser({
                                        type: USER_TYPE.INVESTOR,
                                        notiType: NOTIFICATION_TYPE.LOAN,
                                        userId: item.Investor.User.id,
                                        msg: `Hồ sơ vay của sinh viên ${user.firstName} ${user.lastName} đã được tiếp tục`,
                                        redirectUrl: `myapp://investmentDetail/${item.id}`,
                                    })
                                })
                                setLoading(false)
                            })
                        // )
                    )
            } catch (e) {
                setLoading(false)
                handleClose()
                console.log(e)
            }
        }
    }

    return (
        <Card
            sx={{
                padding: 1
            }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={handleCloseLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity='success'
                    sx={{ width: "100%" }}
                >
                    Đóng hồ sơ thành công! (Quay về trang trước sau 3 giây!)
                </Alert>
            </Snackbar>
            <Grid
                container
                spacing={1}
                justifyContent='space-between'
                alignItems='center'>

                <Grid
                    item
                >
                    <ListToolbar
                        target={"Tiến độ"}
                        filterName={filterType}
                        onFilterName={handleFilterByType}
                    />
                </Grid>

                {
                    isLate && loanHistory.type === LOAN_STATUS.ONGOING ? (<>
                        <Grid
                            item
                        >
                            <Button
                                sx={{ margin: 1 }}
                                onClick={() => handleOpen('close')}
                                type="submit"
                                color="error"
                                variant="contained"
                                startIcon={<CloseIcon />}
                            >
                                Đóng hồ sơ
                            </Button>
                        </Grid>
                    </>) : (<></>)
                }
                {
                    loanHistory.type === LOAN_STATUS.INCOMPLETE ? (<>
                        <Grid
                            item
                        >
                            <Button
                                sx={{ margin: 1 }}
                                onClick={() => handleOpen('continue')}
                                type="submit"
                                variant="contained"
                                endIcon={<CheckIcon />}
                            >
                                Tiếp tục hồ sơ
                            </Button>
                        </Grid>
                    </>) : (<></>)
                }
            </Grid>

            <Dialog
                maxWidth='md'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ width: '900px' }}>
                    <DialogTitle id="alert-dialog-title">
                        {action === 'close' ? 'Xác nhận đóng hồ sơ vay?' : 'Xác nhận tiếp tục hồ sơ vay?'}
                    </DialogTitle>
                    <DialogContent>
                        {action === 'close' ? (<>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Xin cho biết lí do:
                            </Typography>
                            <TextField multiline onChange={(event) => setReason(event.target.value)} value={reason} fullWidth id="dialog-description-colse" sx={{ mt: 2 }} />
                        </>) : (<>
                            <DialogContentText id="alert-dialog-description-continue1">
                                Thay đổi sẽ được cập nhật vào hệ thống!
                            </DialogContentText>
                            <DialogContentText id="alert-dialog-description-continue2">
                                Bạn có chắc chắn về quyết định này không?
                            </DialogContentText>
                        </>)}

                    </DialogContent>
                    <DialogActions>
                        <Button endIcon={<CloseIcon />} color='error' onClick={handleClose}>Hủy</Button>
                        <Button endIcon={<CheckIcon />} onClick={() => actionButton()} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <ListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={listSchedule.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredschedules
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const { id,
                                        money,
                                        startAt,
                                        endAt,
                                        type,
                                        status,
                                        // loanId,
                                        // transactionId,
                                        penaltyMoney,
                                    } = row;
                                    return (
                                        <TableRow
                                            hover
                                            key={id}
                                            tabIndex={-1}
                                            role="checkbox"
                                        >
                                            <TableCell align="left">
                                                <Label
                                                    variant="ghost"
                                                    color={type === LOAN_SCHEDULE_TYPE.STP ? 'info' : 'primary'}
                                                >
                                                    {type === LOAN_SCHEDULE_TYPE.STP ? 'Còn học' : 'Đã đi làm'}
                                                </Label>
                                            </TableCell>
                                            <TableCell align="left">{convertCurrencyVN(money)}</TableCell>
                                            <TableCell align="left">{penaltyMoney ? convertCurrencyVN(penaltyMoney) : convertCurrencyVN(0)}</TableCell>
                                            <TableCell align="left">{fDate(startAt)}</TableCell>
                                            <TableCell align="left">{fDate(endAt)}</TableCell>
                                            <TableCell align="left">
                                                <Label
                                                    variant="ghost"
                                                    color={getColorBaseStatus(status)}
                                                >
                                                    {vietsubStatus(status)}
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
                        {isFilterNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                        <SearchNotFound searchQuery={filterType} />
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
                count={listSchedule.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}