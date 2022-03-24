import { filter, set } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
//
import SYSTEMCONFIG_DATA from '../_mocks_/systemconfig';
import { setYear } from 'date-fns';
//api
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'yearFrom', label: 'Từ Năm', alignRight: false },
    { id: 'yearTo', label: 'Đến Năm', alignRight: false },
    { id: 'transactionFee', label: 'Phí rút', alignRight: false },
    { id: 'interest', label: 'Lãi', alignRight: false },
    { id: 'fixedMoney', label: 'Tiền lúc học', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
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

export default function Systemconfig() {
    const [page, setPage] = useState(0);
    const [yearFrom, setYearFrom] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SYSTEMCONFIG_DATA.length) : 0;

    const listSystemconfig = applySortFilter(SYSTEMCONFIG_DATA, getComparator(order, orderBy), filterName);

    const isSystemconfigNotFound = listSystemconfig.length === 0;

    return (
        <Page title="Quản lý | Trường Đại Học">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Danh Sách Các Hợp Đồng
                    </Typography>
                </Stack>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <ListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={SYSTEMCONFIG_DATA.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {listSystemconfig
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, yearFrom, yearTo, transactionFee, interest, fixedMoney, status } = row;
                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                >
                                                    <TableCell align="left">
                                                        <TextField maxLength="4"
                                                            value={yearFrom} />
                                                    </TableCell>
                                                    <TableCell align="left"><TextField value={yearTo} /></TableCell>
                                                    <TableCell align="left"><TextField value={transactionFee} /></TableCell>
                                                    <TableCell align="left">{interest}</TableCell>
                                                    <TableCell align="left">{fixedMoney}</TableCell>
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
                                                            href='/detailschool'
                                                            variant="contained"
                                                            endIcon={<VisibilityIcon />}
                                                        >
                                                            View
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
                                {isSystemconfigNotFound && (
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
                        count={SYSTEMCONFIG_DATA.length}
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
