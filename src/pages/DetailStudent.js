import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Page from "../components/Page";
import { Avatar, Card, CardHeader, Container, Grid, Typography, Badge } from "@mui/material";
import { studentApi } from "../apis/student";
import { styled } from '@mui/material/styles';


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
    const [student, setStudent] = useState({
        id: "",
        userId: "",
        firstName: "",
        lastName: "",
        totalSemester: "",
        currentSemester: "",
        birthDate: "",
        studentCardId: "",
        profileUrl: "",
        frontCitizenCardImageUrl: "",
        backCitizenCardImageUrl: "",
        frontStudentCardImageUrl: "",
        backStudentCardImageUrl: "",
        citizenId: "",
        citizenCardCreatedDate: "",
        citizenCardCreatedPlace: "",
        parentId: "",
        status: "",
        address: "",
        createdAt: "",
        updatedAt: "",
        schoolMajorId: "",
        tutorId: ""
    });


    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(id)
            const student = res.data.student
            setStudent(student)
        }
        fetchData()
    }, [])

    function StudentDetails() {
        return (
            <Card>
                <CardHeader>
                    <Grid>
                        {/* <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                </StyledBadge> */}
                        {/* <Avatar alt="avtst" src={student.profileUrl} /> */}
                    </Grid>
                    {/* <h4 className="mb-0">{student.firstName} {student.lastName}</h4>
              <span className="text-muted d-block mb-2">Major is</span>
              <span className="text-muted d-block mb-2">SE</span> */}
                </CardHeader>

                {/* <ListGroup flush>
              <ListGroupItem className="px-4">
                <div>
      
                </div>
              </ListGroupItem>
              <ListGroupItem className="p-4">
                <strong className="text-muted d-block mb-2">
                  {userDetails.metaTitle}
                </strong>
                <span>{userDetails.metaValue}</span>
              </ListGroupItem>
            </ListGroup> */}
            </Card>
        )
    }

    return (
        <Page title="Thông tin học sinh">
            <Container>
                <Typography variant='h3'>Thông tin học sinh</Typography>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        padding: 5
                    }}>
                    <Grid
                        item
                        xs={4}>
                        <Card>
                            <CardHeader>
                                <Grid>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar alt="avtst" src={student.profileUrl} />
                                    </StyledBadge>
                                </Grid>
                                {/* <h4 className="mb-0">{student.firstName} {student.lastName}</h4>
        <span className="text-muted d-block mb-2">Major is</span>
        <span className="text-muted d-block mb-2">SE</span> */}
                            </CardHeader>

                            {/* <ListGroup flush>
        <ListGroupItem className="px-4">
          <div>

          </div>
        </ListGroupItem>
        <ListGroupItem className="p-4">
          <strong className="text-muted d-block mb-2">
            {userDetails.metaTitle}
          </strong>
          <span>{userDetails.metaValue}</span>
        </ListGroupItem>
      </ListGroup> */}
                        </Card>
                    </Grid>
                    <Grid
                        item
                        xs={8}>
                        {/* <StudentAccountDetails /> */}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}


