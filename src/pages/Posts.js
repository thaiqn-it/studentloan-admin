// material
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Stack, Typography, Pagination, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { loanApi } from '../apis/loan';
import ErrorSection from '../components/errorSection';
// components
import Page from '../components/Page';
import { PostCard } from '../components/_dashboard/post';
import { LOAN_STATUS } from '../constants/enum';


// ----------------------------------------------------------------------

export default function Posts(props) {
  const navigate = useNavigate()
  const { orderByLastest, initalLimit, initalOffset, initalType } = props
  const [lastPage, setLastPage] = useState(0)
  const [limit, setLimit] = useState(initalLimit)
  const [order, setOrder] = useState(orderByLastest)
  const [type, setType] = useState(initalType)
  const [offset, setOffset] = useState(initalOffset)
  const [sortOption, setSortOption] = useState([
    { value: 'DESC', label: 'Gần nhất' },
    { value: 'ASC', label: 'Xa nhất' }
  ])
  const [typeOption, setTypeOption] = useState([
    { value: LOAN_STATUS.WAITING, label: 'Đang chờ' },
    { value: LOAN_STATUS.ONGOING, label: 'Đang trong tiến độ' },
    { value: LOAN_STATUS.INCOMPLETE, label: 'Không hoàn thành' }
  ])
  const [optionChoosen, setOptionChoosen] = useState('DESC')
  const [typeChoosen, setTypeChoosen] = useState(LOAN_STATUS.WAITING)
  const [loanList, setLoanList] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await loanApi.getAllWaiting({ limit, offset, order, type })
        const loanList = res.data.rows
        const lastPage = res.data.count / limit
        if (Number.isInteger(lastPage)) {
          setLastPage(lastPage)
        } else {
          var convertPage = Math.floor(lastPage) + 1
          setLastPage(convertPage)
        }
        setLoanList(loanList)
      } catch (e) {
        navigate('/404')
      }
    }
    fetchData()
  }, [limit, offset, order, loanList, type])

  const checkIsEmpty = (list) => {
    if (list.length <= 0) {
      return (
        <ErrorSection msg='Hiện tại không còn hồ sơ nào!' />
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <Page title='Danh sách các hồ sơ vay'>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Danh sách các hồ sơ vay
          </Typography>
        </Stack>
        <Stack mb={5} direction="row" spacing={2} justifyContent="flex-start">
          <div>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={1}
            >
              <Typography variant='h5'>Trạng thái:</Typography>
              <TextField select size="small" value={typeChoosen}
                onChange={(e) => {
                  setTypeChoosen(e.target.value)
                  setType(e.target.value)
                  setOffset(0)
                }}
              >
                {typeOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </div>
          <div>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={1}
            >
              <Typography variant='h5'>Sắp xếp theo thời gian:</Typography>
              <TextField select size="small" value={optionChoosen}
                onChange={(e) => {
                  setOptionChoosen(e.target.value)
                  setOrder(e.target.value)
                  setOffset(0)
                }}
              >
                {sortOption.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </div>
        </Stack>

        <Grid container spacing={3}>
          {loanList.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
        {checkIsEmpty(loanList)}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Pagination onChange={(e) => {
            var offsetNextPage = (Number.parseInt(e.target.textContent) - 1) * 8
            setOffset(offsetNextPage)
          }} count={lastPage} variant="outlined" color="primary" />
        </div>
      </Container>
    </Page>
  );
}
