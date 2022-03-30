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

export default function DetailStudent() {
    const navigate = useNavigate()
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


