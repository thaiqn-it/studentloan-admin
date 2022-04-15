import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Grid,
  CardHeader,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { ListHead, ListToolbar } from '../components/_dashboard/user';
//
import { transactionApi } from '../apis/transactionApi';
import { sentenceCase } from 'change-case';
import { TRANSACTION_STATUS, WALLET_TYPE } from '../constants/enum';
import { convertCurrencyVN } from '../utils/formatNumber';
import { fDate } from '../utils/formatTime';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

import moment from "moment";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Mã giao dịch', alignRight: false },
  { id: 'money', label: 'Số Tiền', alignRight: false },
  { id: 'transactionFee', label: 'Phí', alignRight: false },
  { id: 'createdAt', label: 'Vào lúc', alignRight: false },
  { id: 'type', label: 'Loại', alignRight: false },
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

    return filter(array, (_trans) => _trans.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ViewTransactions() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('createdAt');
  const [filterId, setFilterId] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [listYear, setListYear] = useState([])
  const [listTrans, setListTrans] = useState([])
  const [income, setIncome] = useState(0)

  const vietsubType = (type) =>{
    if (type===WALLET_TYPE.RECEIVE){
      return 'Nhận tiền'
    }
    else if (type===WALLET_TYPE.TOPUP){
      return 'Nạp tiền'
    }
    else if (type===WALLET_TYPE.TRANSFER){
      return 'Chuyển tiền'
    }
    else if (type===WALLET_TYPE.WITHDRAW){
      return 'Rút tiền'
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const currentYear = new Date().getFullYear()

      var arrYear = []
      for (let index = 0; index < 10; index++) {
        arrYear.push((currentYear - index).toString())
      }
      setListYear(arrYear)
      getListTransBaseYear(currentYear.toString())

    }
    fetchData()
  }, [])

  const changeYear = (e, v) => {
    getListTransBaseYear(v)
  }

  const calIncome = (listTrans) => {
    let income = 0
    for (let index = 0; index < listTrans.length; index++) {
      const element = listTrans[index];
      income = income + Number.parseInt(element.transactionFee)
    }
    setIncome(income)
  }

  const getListTransBaseYear = async (year) => {
    transactionApi.getAll({
      startDate: moment(year).startOf('year').format(),
      endDate: moment(year).endOf('year').format(),
    }).then(resTrans => {
      setListTrans(resTrans.data)
      calIncome(resTrans.data)
    })
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

  const handleFilterById = (event) => {
    setFilterId(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listTrans.length) : 0;

  const filteredTrans = applySortFilter(listTrans, getComparator(order, orderBy), filterId);

  const isTranNotFound = filteredTrans.length === 0;

  return (
    <Page title="Các Giao Dịch">
      <Card>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid
            item>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <CardHeader title="Tất cả giao dịch" sx={{ marginBottom: 1.8 }} subheader="của năm" />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                disableClearable={true}
                options={listYear}
                onChange={changeYear}
                defaultValue={new Date().getFullYear()}
                renderInput={(params) => <TextField {...params} style={{ width: 100 }} />}
              />
              <ListToolbar
                target={"Mã giao dịch"}
                filterName={filterId}
                onFilterName={handleFilterById}
              />
            </Grid>
          </Grid>
          <Grid
            item>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                startIcon={<PriceCheckIcon />}>
                Tổng danh thu năm nay: {convertCurrencyVN(income)}
              </Button>
            </div>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={listTrans.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredTrans
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, money, transactionFee, createdAt, type, status } = row;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell align="left" >
                          {id}
                        </TableCell>
                        <TableCell align="left">{convertCurrencyVN(money)}</TableCell>
                        <TableCell align="left">{convertCurrencyVN(transactionFee)}</TableCell>
                        <TableCell align="left">{fDate(createdAt)}</TableCell>
                        <TableCell align="left">{vietsubType(type)}</TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === TRANSACTION_STATUS.FAIL && 'error') || 'success'}
                          >
                            {status ===TRANSACTION_STATUS.FAIL?'Thất bại':'Thành công'}
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
              {isTranNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterId} />
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
          count={listTrans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>



    </Page>
  );
}
