import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { CardMedia } from '@mui/material'

export default function ImageModal(props) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    return (
        <>
            <CardMedia {...props} onClick={handleOpen} />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableScrollLock
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        component="img"
                        src={props.image}
                        borderRadius={1}
                        maxWidth="1200px"
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            outline: 'none',
                            '@media (max-width: 1024px)': {
                                maxWidth: '400px',
                                maxHeight:'400px',
                            },
                        }}
                    />
                </Fade>
            </Modal>
        </>
    )
}
