import React, { useEffect, useState } from 'react'
import { Card, TableContainer, Table, TableBody, TableCell, TableRow, TablePagination, Link, Button } from '@mui/material'

import { notificationApi } from '../apis/notificationApi';
import { fDate } from '../utils/formatTime';
import { sentenceCase } from 'change-case';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';
import { convertCurrencyVN } from '../utils/formatNumber';
import { LOAN_SCHEDULE_STATUS, LOAN_SCHEDULE_TYPE, NOTIFICATION_TYPE } from '../constants/enum/index'
import { filter } from 'lodash';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = [
    { id: 'type', label: 'Tiến độ', alignRight: false },
    { id: 'description', label: 'Số tiền cần trả', alignRight: false },
    { id: 'createdAt', label: 'Ngày bắt đầu', alignRight: false },
    { id: 'isRead', label: 'Trạng thái', alignRight: false },
    { id: '', label: '', alignRight: false },
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
        return filter(array, (_noti) => _noti.type.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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

export default function ViewAllNoti(props) {
    const navigate = useNavigate()
    const [listNoti, setListNoti] = useState([])
    // const [totalUnread, setTotalUnread] = useState(0);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [filterType, setFilterType] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const res = await notificationApi.getAllByUserId()
            setListNoti(res.data.notifications)
            // setTotalUnread(res.data.countNotRead)
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listNoti.length) : 0;

    const filteredNoti = applySortFilter(listNoti, getComparator(order, orderBy), filterType);

    const isFilterNotFound = filteredNoti.length === 0;

    const setRead = (id) => {
        notificationApi.getOneById(id).then(res => {
            notificationApi.update(id, { ...res.data, isRead: true })
        })
    }
    return (
        <Card
            sx={{
                padding: 1
            }}>

            <ListToolbar
                target={"Loại"}
                filterName={filterType}
                onFilterName={handleFilterByType}
            />
            <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <ListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            rowCount={listNoti.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredNoti
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const { id,
                                        // userId,
                                        isRead,
                                        type,
                                        // status,
                                        redirectUrl,
                                        description,
                                        createdAt,
                                        // updatedAt,
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
                                                    color={type === NOTIFICATION_TYPE.LOAN ? 'info' : 'primary'}
                                                >
                                                    {type === NOTIFICATION_TYPE.LOAN ? 'Cần duyệt bài xin vay' : 'Cần xác thực người dùng'}
                                                </Label>
                                            </TableCell>
                                            <TableCell align="left">{description}</TableCell>
                                            <TableCell align="left">{fDate(createdAt)}</TableCell>
                                            <TableCell align="left">
                                                <Label
                                                    variant="ghost"
                                                    color={isRead ? 'success' : 'error'}
                                                >
                                                    {isRead ? 'Đã xem' : 'Chưa xem'}
                                                </Label>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    size="small"
                                                    type="submit"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        navigate(redirectUrl);
                                                        setRead(id)
                                                    }}
                                                    variant="contained"
                                                    endIcon={<VisibilityIcon />}
                                                >
                                                    Đến xem
                                                </Button>
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
                count={listNoti.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Card>
    )
}