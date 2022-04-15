import React, { useEffect, useState } from 'react'

import {
    Box,
    Grid,
    TextField,
    Paper,
    Typography,
} from '@mui/material'
import moment from "moment";
import { studentApi } from '../../../../apis/student';

export default function DetailAccountCard(props) {
    var userId = props.userId
    const [user, setUser] = useState({});
    const [major, setMajor] = useState({});
    const [school, setSchool] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(userId)
            const user = res.data.student.User
            const major = res.data.student.SchoolMajor.Major
            const school = res.data.student.SchoolMajor.School
            setMajor(major)
            setSchool(school)
            setUser(user)
        }
        fetchData()
    }, [])


    const formatDate = (date) => {
        var data = '';
        data = moment(date).format('DD/MM/YYYY')
        return data;
    }

    return (
        <>
            <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                <Box p={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Họ
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                placeholder="Họ"
                                value={user.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Tên
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                placeholder="Họ"
                                value={user.lastName}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Email
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="email"
                                placeholder="Email"
                                value={user.email}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Ngày sinh
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                value={formatDate(user.birthDate)}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Địa chỉ
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                value={user.address}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Số điện thoại
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                placeholder="phone number"
                                value={user.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Trường
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                placeholder="phone number"
                                value={school.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" fontWeight="regular">
                                Chuyên ngành
                            </Typography>
                            <TextField
                                fullWidth
                                disabled
                                type="text"
                                placeholder="phone number"
                                value={major.name}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
}