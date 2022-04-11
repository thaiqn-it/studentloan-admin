import { Card, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from "moment";
import { studentApi } from '../../../../apis/student';
import ImageModal from '../../../../components/imagemodal';


export default function PaperCard(props) {
    var userId = props.userId
    const [student, setStudent] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(userId)
            const student = res.data.student
            setStudent(student)
        }
        fetchData()
    }, [])
    const formatDate = (date) => {
        var data = '';
        data = moment(date).format('DD/MM/YYYY')
        return data;
    }
    return (
        <Card>

            <Card
            sx={{
                padding:1,
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h6"
                                    fontWeight="regular"
                                >
                                    Số CMND/CCCD
                                </Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    type="text"
                                    // placeholder="Email"
                                    value={student.citizenId}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h6"
                                    fontWeight="regular"
                                >
                                    Ngày cấp CMND/CCCD
                                </Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formatDate(student.citizenCardCreatedDate)}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography
                                    variant="h6"
                                    fontWeight="regular"
                                >
                                    Nơi cấp CMND/CCCD
                                </Typography>
                                <TextField
                                    fullWidth
                                    disabled
                                    type="text"
                                    // placeholder="Email"
                                    value={student.citizenCardCreatedPlace}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
                            mb={1}
                        >
                            Mặt trước CMND/CCCD
                        </Typography>
                        <ImageModal
                            sx={{
                                borderRadius: 2
                            }}
                            component='img'
                            height="300px"
                            width="300px"
                            image={student.frontCitizenCardImageUrl} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
                            mb={1}
                        >
                            Mặt sau CMND/CCCD
                        </Typography>
                        <ImageModal
                            sx={{
                                borderRadius: 2
                            }}
                            component='img'
                            height="300px"
                            width="300px"
                            image={student.backCitizenCardImageUrl} />
                    </Grid>
                </Grid>
                <Grid
                marginTop={1}
                container 
                spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={4}>
                            <Typography
                                disabled
                                variant="h6"
                                fontWeight="regular"
                            >
                                Mã sinh viên
                            </Typography>
                            <TextField
                                type="text"
                                disabled
                                value={student.studentCardId}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
                            mb={1}
                        >
                            Mặt trước thẻ sinh viên
                        </Typography>
                        <ImageModal
                            sx={{
                                borderRadius: 2
                            }}
                            component='img'
                            height="300px"
                            width="300px"
                            image={student.frontStudentCardImageUrl} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="h6"
                            fontWeight="regular"
                            mb={1}
                        >
                            Mặt sau thẻ sinh viên
                        </Typography>
                        <ImageModal
                            sx={{
                                borderRadius: 2
                            }}
                            component='img'
                            height="300px"
                            width="300px"
                            image={student.backStudentCardImageUrl} />
                    </Grid>
                </Grid>
            </Card>
        </Card>
    )
}