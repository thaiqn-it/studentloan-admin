import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Page from "../components/Page";
import { Avatar, Card, CardHeader, Container, Grid, Typography, Badge, TextField, Divider } from "@mui/material";
import { studentApi } from "../apis/student";
import { styled } from '@mui/material/styles';

//Icon
import ArrowBack from '@mui/icons-material/ArrowBack';

//components
import StudentProfile from './StudentProfile'

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


export default function DetailStudent() {
    const navigate = useNavigate()
    // const [student, setStudent] = useState({});
    // const [archievements, setArchievements] = useState([]);
    // const [tutor, setTutor] = useState({});
    // const [user, setUser] = useState({});
    // const [schoolMajor, setSchoolMajor] = useState({});
    const { id } = useParams();

    const onBack = () => {
        navigate("/dashboard/user")
    }

    return (
        <Page title="Thông tin học sinh">
            <Container>
                <Typography variant='h4' onClick={onBack}>
                    <ArrowBack />
                </Typography>
                <StudentProfile userId={id} />
            </Container>
        </Page>
    )
}


