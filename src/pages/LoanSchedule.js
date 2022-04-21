import React, { useEffect, useState } from 'react'
import { Card, TableContainer, Table, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'

import { loanScheduleApi } from '../apis/loanScheduleApi';
import { fDate } from '../utils/formatTime';
import { sentenceCase } from 'change-case';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';
import { convertCurrencyVN } from '../utils/formatNumber';
import {LOAN_SCHEDULE_STATUS, LOAN_SCHEDULE_TYPE} from '../constants/enum/index'
import { filter } from 'lodash';

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
    if(status===LOAN_SCHEDULE_STATUS.ONGOING){
        return 'warning'
    }else if(status===LOAN_SCHEDULE_STATUS.COMPLETED){
        return 'success'
    }else{
        return 'error'
    }
}

function vietsubStatus(status) {
    if(status===LOAN_SCHEDULE_STATUS.ONGOING){
        return 'đang trả'
    }else if(status===LOAN_SCHEDULE_STATUS.COMPLETED){
        return 'đã trả'
    }else{
        return 'đã trễ'
    }
}

export default function App(props) {
    const { loanId } = props
    const [listSchedule, setSchedule] = useState([])
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('startAt');
    const [filterType, setFilterType] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            const res = await loanScheduleApi.getAllByLoanId(loanId)
            setSchedule(res.data)
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
    return (
        <Card
            sx={{
                padding: 1
            }}>

            <ListToolbar
                target={"Tiến độ"}
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
                                                    color={type===LOAN_SCHEDULE_TYPE.STP?'info':'primary'}
                                                >
                                                    {type===LOAN_SCHEDULE_TYPE.STP?'Còn học':'Đã đi làm'}
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