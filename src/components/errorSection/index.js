import { Typography } from '@mui/material'
import React from 'react'

function ErrorSection(props) {
    const { msg } = props
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
                color='error'
                variant='h4'
            >
                {msg}
            </Typography>
        </div>
    )
}

export default ErrorSection