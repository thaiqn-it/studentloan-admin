import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Page from "../components/Page";
import { Avatar, Card, CardHeader, Container, Grid, Typography, Badge, TextField } from "@mui/material";
import { studentApi } from "../apis/student";
import { styled } from '@mui/material/styles';

//Icon
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import EventIcon from '@mui/icons-material/Event';
import ArrowBack from '@mui/icons-material/ArrowBack';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));



const ColoredLine = () => (
    <hr
        style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 5,
            marginBottom: 5,
            width: "90%",
            color: "#0FF5A0",
            backgroundColor: "#0FF5A0",
            height: 0.5
        }}
    />
);

export default function DetailStudent() {
    const navigate = useNavigate()
    const [student, setStudent] = useState();
    const { id } = useParams();

    const onBack = () => {
        navigate("/dashboard/user")
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(id)
            const student = res.data.student
            setStudent(student)
            console.log(student)
        }
        fetchData()
    })

    return (
        <Page title="Thông tin học sinh">
            <Container>
                <Typography variant='h4' onClick={onBack}>
                    <ArrowBack />
                </Typography>
                <Typography variant='h3'>Thông tin học sinh</Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        padding: 2
                    }}>
                    <Grid
                        item
                        xs={8}
                    >
                        <Card>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar sx={{
                                    height: '150px',
                                    width: '150px',
                                    marginLeft: 10,
                                }}
                                    alt="Avatar Student"
                                    //  src={student.profileUrl} 
                                    src="https://i.pinimg.com/originals/e3/21/e3/e321e358926025096f639975c3392348.jpg"
                                />
                            </StyledBadge>
                            <Typography
                                sx={{
                                    marginLeft: 2,
                                }}
                                display="block" gutterBottom variant="h3">
                                {/* {student.firstName} {student.lastName} */}
                                Nguyễn Trường Phi
                            </Typography>


                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                }}
                                direction="row"
                            >
                                <Grid item>
                                    <EmailIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        phintse140595@fpt.edu.vn
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{ marginLeft: 2 }}
                                direction="row"
                            >
                                <Grid item>
                                    <LocalPhoneIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        0981223505
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{ marginLeft: 2 }}
                                direction="row"
                            >
                                <Grid item>
                                    <CakeIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        10-02-2000
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                }}
                                direction="row"
                            >
                                <Grid item>
                                    <MyLocationIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        Thành phố Hồ Chí Minh, Quận 1, Phường Đa Kao
                                    </Typography>
                                </Grid>
                            </Grid>

                            <ColoredLine />

                            <Typography variant="h6" sx={{ marginLeft: 2 }}>Thông tin về việc học</Typography>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                    marginTop: 1,
                                }}
                                direction={"row"}
                            >
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <SchoolIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                FPT
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <HistoryEduIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                SE
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                }}
                                direction={"row"}
                            >
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <MenuBookIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                7/9
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <CallToActionIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                SE140595
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <ColoredLine />

                            <Typography variant="h6" sx={{ marginLeft: 2 }}>Thông tin chứng minh thư</Typography>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                    marginTop: 1,
                                }}
                                direction={"row"}
                            >
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <CreditScoreIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                025995494
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <LocationOnIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                HCM
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                >
                                    <Grid item>
                                        <EventIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            sx={{ marginLeft: 0.5 }}
                                            variant="overline">
                                            {/* {student.firstName} {student.lastName} */}
                                            19-10-2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <ColoredLine />

                            <Typography variant="h6" sx={{ marginLeft: 2 }}>Mô tả bản thân</Typography>

                            <Typography variant="body1" sx={{ marginLeft: 2 }} gutterBottom>
                                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                                quasi quidem quibusdam.
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={4}>
                        <Typography sx={{ marginBottom: 1 }} variant="h4">Thông tin người bảo hộ</Typography>
                        <Card>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar sx={{
                                    height: '150px',
                                    width: '150px',
                                    marginLeft: 10,
                                }}
                                    alt="Avatar Student"
                                    //  src={student.profileUrl} 
                                    src="https://i.pinimg.com/originals/e3/21/e3/e321e358926025096f639975c3392348.jpg"
                                />
                            </StyledBadge>

                            <Typography
                                sx={{
                                    marginLeft: 2,
                                }}
                                display="block" gutterBottom variant="h4">
                                {/* {student.firstName} {student.lastName} */}
                                Trần Long
                            </Typography>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                }}
                                direction="row"
                            >
                                <Grid item>
                                    <EmailIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        phintse140595@fpt.edu.vn
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                sx={{ marginLeft: 2 }}
                                direction="row"
                            >
                                <Grid item>
                                    <LocalPhoneIcon />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{ marginLeft: 0.5 }}
                                        variant="overline">
                                        {/* {student.firstName} {student.lastName} */}
                                        0981223505
                                    </Typography>
                                </Grid>
                            </Grid>

                            <ColoredLine />

                            <Typography variant="h6" sx={{ marginLeft: 2 }}>Thông tin chứng minh thư</Typography>

                            <Grid
                                container
                                sx={{
                                    marginLeft: 2,
                                    marginTop: 1,
                                }}
                                direction={"row"}
                            >
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <CreditScoreIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                025995494
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid
                                    item
                                    xs={6}>
                                    <Grid
                                        container
                                        direction="row"
                                    >
                                        <Grid item>
                                            <LocationOnIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                sx={{ marginLeft: 0.5 }}
                                                variant="overline">
                                                {/* {student.firstName} {student.lastName} */}
                                                HCM
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction="row"
                                >
                                    <Grid item>
                                        <EventIcon />
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            sx={{ marginLeft: 0.5 }}
                                            variant="overline">
                                            {/* {student.firstName} {student.lastName} */}
                                            19-10-2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}


