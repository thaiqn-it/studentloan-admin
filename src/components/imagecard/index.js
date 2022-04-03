import { Box } from '@mui/material'
import ImageModal from '../imagemodal'
import React from 'react'

export default function ImageCard(props) {
    const { image } = props

    return (
        <>
            <Box {...props}>
                <Box
                    sx={{
                        px: 1.2,
                        pt: 1.2,
                        pb: 5,
                        boxShadow: '0 2px 6px 0 rgb(0 0 0 / 17%)',
                        width: 'fit-content',
                    }}
                >
                    <ImageModal
                        component="img"
                        image={image}
                        sx={{
                            borderRadius: 0,
                            margin: 0,
                            cursor: 'pointer',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}
