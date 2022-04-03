import React, { useEffect, useRef, useState } from 'react'
import './DropFileZone.css'
import uploadImg from '../../assets/cloud-upload-regular-240.png'
// import { app } from "..//..//utils/Firebase";
import { Box, IconButton, Link, LinearProgress, Typography } from '@mui/material'
import { imageApi } from '../../apis/imageApi'

import DeleteIcon from '@mui/icons-material/Delete'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import ImageModal from '../imagemodal'
// import { Link } from 'react-router-dom'

const DropFileZone = (props) => {
    const {
        elementId,
        getMsg,
        elementName,
        onFileChangeURL,
        flexEnd,
        image,
        onDelete,
    } = props

    const [progress, setProgress] = useState(0)
    const [nameFile, setNameFile] = useState('')

    const wrapperRef = useRef(null)

    const onDragEnter = () => wrapperRef.current.classList.add('dragover')

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')

    const onDrop = () => wrapperRef.current.classList.remove('dragover')

    const onFileDrop = (e) => {
        const newFile = e.target.files
        connectUploadCloud(newFile, e)
    }

    function getName(url) {
        var splittedArr = url.split('/')
        var name = splittedArr[splittedArr.length - 1]
        var fileName = name.substring(name.indexOf('-') + 1, name.length)
        return fileName
    }

    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const percentage = Math.floor(
                ((loaded / 1000) * 100) / (total / 1000)
            )
            setProgress(percentage - 10)
        },
    }

    const connectUploadCloud = async (imageFile, event) => {
        setProgress(1)
        const formData = new FormData()
        for (let i = 0; i < imageFile.length; i++) {
            formData.append('file', imageFile[i])
        }
        await imageApi
            .uploadImageWithProg(formData, singleFileOptions)
            .then((res) => {
                let arr = [];
                if (Array.isArray(res.data)) {
                    arr = res.data
                } else {
                    arr.push({ url: res.data.url })
                }
                setProgress(100)
                onFileChangeURL(arr, event)
                setProgress(0)
            }).catch(e => {
                setProgress(0)
            })
    }

    const handleDelete = () => {
        setProgress(0)
        onDelete(elementName)
    }

    if (image !== '' && progress === 0) {
        return (
            <>
                <Box display="flex" justifyContent={flexEnd || 'flex-end'}>
                    <Box
                        sx={{
                            px: 1.2,
                            pt: 1.2,
                            boxShadow: '0 2px 6px 0 rgb(0 0 0 / 17%)',
                            width: '100%',
                            // width: 'fit-content',
                        }}
                    >
                        {image?.map(item =>
                        (
                                <>
                                    <Link
                                        href={item.url} underline="hover">
                                        {getName(item.url)}
                                    </Link>
                                    <IconButton
                                        aria-label="fileuploan"
                                        component="span"
                                        size="medium"
                                        onClick={handleDelete}
                                    >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                    <label htmlFor={elementId}>
                                        <input
                                            multiple
                                            type="file"
                                            accept="image/jpeg,image/png,application/pdf"
                                            id={elementId}
                                            name={elementName}
                                            onChange={onFileDrop}
                                            hidden
                                        />
                                        <IconButton
                                            aria-label="fileuploan"
                                            component="span"
                                            size="medium"
                                        >
                                            <FileUploadIcon fontSize="inherit" />
                                        </IconButton>
                                    </label>
                                </>
                        )
                        )}
                    </Box>
                </Box>
            </>
        )
    } else {
        return (
            <>
                {progress === 100 ? (
                    <Box display="flex" justifyContent={flexEnd || 'flex-end'}>
                        <Box
                            sx={{
                                px: 1.2,
                                pt: 1.2,
                                // pb: 4,
                                boxShadow: '0 2px 6px 0 rgb(0 0 0 / 17%)',
                                width: 'fit-content',
                            }}
                        >
                            {image.indexOf('.pdf') !== -1 ? (
                                <iframe
                                    src={image}
                                    style={{
                                        width: '100%',
                                        height: '360px',
                                        border: 'none',
                                    }}
                                ></iframe>
                            ) : (
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
                            )}
                            <>
                                <IconButton
                                    aria-label="fileuploan"
                                    component="span"
                                    size="medium"
                                    onClick={handleDelete}
                                >
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                <label htmlFor={elementId}>
                                    <input
                                        multiple
                                        type="file"
                                        accept="image/jpeg,image/png,application/pdf"
                                        id={elementId}
                                        name={elementName}
                                        onChange={onFileDrop}
                                        hidden
                                    />
                                    <IconButton
                                        aria-label="fileuploan"
                                        component="span"
                                        size="medium"
                                    >
                                        <FileUploadIcon fontSize="inherit" />
                                    </IconButton>
                                </label>
                            </>
                        </Box>
                    </Box>
                ) : progress === 0 ? (
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                    >
                        <div className="drop-file-input__label">
                            <img src={uploadImg} alt="" />
                            <p>Chọn tệp</p>
                        </div>
                        <input
                            multiple
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            value=""
                            id={elementId}
                            name={elementName}
                            onChange={onFileDrop}
                        />
                    </div>
                ) : (
                    <Box display="flex" flexDirection="column">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '300px',
                                marginTop: '1rem',
                                backgroundColor: '#fbfbfa',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    mr: 1,
                                }}
                            >
                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    color="primary"
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
            </>
        )
    }
}

export default DropFileZone
