import React, { useEffect, useState } from 'react'
import { pdfjs } from 'react-pdf'
import {Card, Button, TextField, Stack, Typography, Link, TableContainer, Table, TableBody, TableCell, TableRow, TablePagination } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { investmentApi } from '../apis/investmentApi';
import { fDate } from '../utils/formatTime';
import { sentenceCase } from 'change-case';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
import Scrollbar from '../components/Scrollbar';
import Label from '../components/Label';
import SearchNotFound from '../components/SearchNotFound';
import { filter } from 'lodash';
import { CONTRACT_STATUS } from '../constants/enum';

const TABLE_HEAD = [
    { id: 'contractCode', label: 'Mã hợp đồng', alignRight: false },
    { id: 'createdAt', label: 'Ngày tạo', alignRight: false },
    { id: 'updatedAt', label: 'Ngày cập nhật', alignRight: false },
    { id: 'status', label: 'Trạng thái', alignRight: false },
    { id: 'nameFile', label: 'Tên hợp đồng', alignRight: false }
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
        return filter(array, (_contract) => _contract.contractCode.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
export default function App(props) {
    const { loanId } = props
    const [numPages, setNumPages] = useState(null)
    const [duration, setDuration] = useState(0)
    const [listContract, setListContract] = useState([])
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('contractCode');
    const [filterCode, setFilterCode] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            var arrContract = []
            const resInvestment = await investmentApi.findAllByLoanId(loanId)
            resInvestment.data.map(item => {
                arrContract.push(item.Contract)
            })
            setListContract(arrContract)
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

    const handleFilterByCode = (event) => {
        setFilterCode(event.target.value);
    };

    function getFileName(url) {
        var splittedArr = url.split("/");
        var name = splittedArr[splittedArr.length - 1];
        // var fileName = name.substring(name.indexOf("-") + 1, name.length);
        return name;
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listContract.length) : 0;

    const filteredcontracts = applySortFilter(listContract, getComparator(order, orderBy), filterCode);

    const isContractNotFound = filteredcontracts.length === 0;

    const handleRenewalContract = async () => {
        console.log('renewal contract')
    }
    return (
        <>
            <div
                style={{
                    padding: 1,
                    direction: 'row',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                }}>
                <Typography margin={0.5}>Nhập số tháng để gia hạn:</Typography>
                <TextField sx={{margin:0.5}} type='number' onChange={(e) => setDuration(e.target.value)} value={duration} />
                <Button
                    startIcon={<AccessTimeIcon />}
                    onClick={handleRenewalContract}
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 1, margin:0.5 }}
                >
                    Gia hạn
                </Button>
            </div>
            <Card
                sx={{
                    padding: 1
                }}>

                <ListToolbar
                    target={"Mã hợp đồng"}
                    filterName={filterCode}
                    onFilterName={handleFilterByCode}
                />

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <ListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={listContract.length}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {filteredcontracts
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const { id, contractCode, createdAt, updatedAt, status, contractUrl } = row;

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
                                                            {contractCode}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{fDate(createdAt)}</TableCell>
                                                <TableCell align="left">{fDate(updatedAt)}</TableCell>
                                                <TableCell align="left">
                                                    <Label
                                                        variant="ghost"
                                                        color={(status === 'INACTIVE' && 'error') || 'success'}
                                                    >
                                                        {status === CONTRACT_STATUS.INACTIVE?'Không kích hoạt':'Đang kích hoạt'}
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Link href={contractUrl} underline="hover" color="black" target="_blank" rel="noopener noreferrer">
                                                        {getFileName(contractUrl)}
                                                    </Link>
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
                            {isContractNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterCode} />
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
                    count={listContract.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    )
}