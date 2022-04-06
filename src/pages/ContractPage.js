import React, { useEffect, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Box, Container, Divider, Grid, Button, TextField, Stack, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { imageApi } from '../apis/imageApi'

import DownloadIcon from '@mui/icons-material/Download'
import { contractApi } from '../apis/contractApi';
import { investmentApi } from '../apis/investmentApi';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
export default function App(props) {
    const { loanId } = props
    const [numPages, setNumPages] = useState(null)
    const [listContract, setListContract] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            var arrContract = []
            const resInvestment = await investmentApi.findAllByLoanId(loanId)
            resInvestment.data.map(async item => {
                const resContract = await contractApi.findByInvestmentId(item.id)
                arrContract.push(resContract.data)
            })
            setListContract(arrContract)
        }
        fetchData()
    }, [])


    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const onDownload = async () => {
        await imageApi
            .downloadFileURL(
                'https://res.cloudinary.com/larrytran/image/upload/v1648997077/pdf/hmq3b48dybfpn1mvfqsa.pdf'
            )
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `hopdong-${id}.pdf`) //or any other extension
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
    }

    const handleRenewalContract = async () => {
        console.log('renewal contract')
    }
    return (
        <Box>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    startIcon={<AccessTimeIcon />}
                    onClick={handleRenewalContract}
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 1 }}
                >
                    Gia hạn
                </Button>
            </div>


            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
            >
                {
                    listContract.map(item => {
                        return (
                            <div>
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button
                                        startIcon={<DownloadIcon />}
                                        onClick={onDownload}
                                        variant="contained"
                                        color="primary"
                                        sx={{ borderRadius: 1 }}
                                    >
                                        Tải xuống
                                    </Button>
                                </Stack>
                                <Container maxWidth="sm">
                                    <Grid container spacing={3}>
                                        <Grid item xs={4} md={4}>
                                            <Typography variant="h6">
                                                Mã hợp đồng
                                            </Typography>
                                            <TextField disabled value="1234567890" />
                                        </Grid>
                                        <Grid item xs={4} md={4}>
                                            <Typography variant="h6">
                                                Ngày bắt đầu
                                            </Typography>
                                            <TextField disabled value="12/05/2022" />
                                        </Grid>
                                        <Grid item xs={4} md={4}>
                                            <Typography variant="h6">
                                                Ngày kết thúc
                                            </Typography>
                                            <TextField disabled value="12/05/2022" />
                                        </Grid>
                                    </Grid>

                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        sx={{ width: { xs: '110%', md: '100%' } }}
                                    >
                                        <Document
                                            file={item.url}
                                            onLoadSuccess={onDocumentLoadSuccess}
                                        >
                                            {Array.from(new Array(numPages), (el, index) => (
                                                <>
                                                    <Page
                                                        key={`page_${index + 1}`}
                                                        pageNumber={index + 1}
                                                    />
                                                    <Divider />
                                                </>
                                            ))}
                                        </Document>
                                    </Box>
                                </Container>
                            </div>
                        )
                    }
                    )
                }
            </div>


        </Box>
    )
}