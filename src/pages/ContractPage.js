import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Box, Container, Divider, Grid, Button, TextField, Typography } from '@mui/material'

import { imageApi } from '../apis/imageApi'

import DownloadIcon from '@mui/icons-material/Download'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
export default function App() {
    const [numPages, setNumPages] = useState(null)

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
    return (
        <>
            <Box>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        startIcon={<DownloadIcon />}
                        onClick={onDownload}
                        variant="contained"
                        color="primary"
                        sx={{ borderRadius: 0 }}
                    >
                        Tải xuống
                    </Button>
                </Box>

                <Container maxWidth="sm">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">
                                Mã hợp đồng
                            </Typography>
                            <TextField disabled value="1234567890" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h6">
                                Ngày bắt đầu
                            </Typography>
                            <TextField disabled value="12/05/2022" />
                        </Grid>
                        <Grid item xs={12} md={4}>
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
                            file="https://res.cloudinary.com/larrytran/image/upload/v1648997077/pdf/hmq3b48dybfpn1mvfqsa.pdf"
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
            </Box>
        </>
    )
}