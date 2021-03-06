import React, { useEffect, useState } from 'react'

import { Box, Grid, Typography, Card } from '@mui/material'
import { studentApi } from '../../../../apis/student';
import ImageModal from '../../../../components/imagemodal';


export default function AchievementCard(props) {
    var userId = props.userId
    const [archive, setArchievement] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await studentApi.getStudentByUserId(userId)
            const archives = res.data.student.Archievements
            setArchievement(archives)
        }
        fetchData()
    }, [])

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    {archive.map(item => {
                        return (
                            <Grid item key={item.id} xs={12} md={6}>
                                <Card>
                                    <Typography
                                        variant='h5'
                                        fontWeight="regular"
                                        sx={{
                                            margin: 1
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                    <ImageModal
                                        sx={{
                                            borderRadius: 2
                                        }}
                                        component='img'
                                        height="300px"
                                        width="300px"
                                        image={item.imageUrl} />
                                </Card>

                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </>
    )
}