// import { Icon } from '@iconify/react';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Container, Stack, Typography, Pagination, TextField, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { loanApi } from '../apis/loan';
// components
import Page from '../components/Page';
import { PostCard, PostsSort } from '../components/_dashboard/post';


// ----------------------------------------------------------------------

export default function WaitingPost(props) {
  const { orderByLastest, initalLimit, initalOffset } = props
  const [lastPage, setLastPage] = useState(0)
  const [limit, setLimit] = useState(initalLimit)
  const [order, setOrder] = useState(orderByLastest)
  const [offset, setOffset] = useState(initalOffset)
  const [sortOption, setSortOption] = useState([
    { value: 'DESC', label: 'Gần nhất' },
    { value: 'ASC', label: 'Xa nhất' }
  ])
  const [optionChoosen, setOptionChoosen] = useState('DESC')
  const [loanList, setLoanList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await loanApi.getAllWaiting({ limit, offset, order })
      const loanList = res.data.rows
      const lastPage = res.data.count / limit
      if (Number.isInteger(lastPage)) {
        setLastPage(lastPage)
      } else {
        var convertPage = Math.floor(lastPage) + 1
        setLastPage(convertPage)
      }
      setLoanList(loanList)
    }
    fetchData()
  }, [limit, offset, order,loanList])

  const checkIsEmpty = (list) => {
    if (list.length <= 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
          color='error'
            variant='h4'
          >
            Hiện tại không còn bài viết nào cần duyệt!
          </Typography>
        </div>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <Page title="Danh sách các bài xin vay đang chờ duyệt">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Các bài xin vay đang chờ duyệt
          </Typography>
        </Stack>
        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <div />
          <div>
            <TextField select size="small" value={optionChoosen}
              onChange={(e) => {
                setOptionChoosen(e.target.value)
                setOrder(e.target.value)
              }}
            >
              {sortOption.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
