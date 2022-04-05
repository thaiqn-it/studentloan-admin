import React, { useEffect, useRef, useState } from "react";
import "./DropFileZone.css";
import uploadImg from "../../assets/cloud-upload-regular-240.png";
// import { app } from "..//..//utils/Firebase";
import { Box, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { imageApi } from "../../apis/imageApi";

import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const DropFileZone = (props) => {
  const { getMsg, onFileChangeURL, image, onDelete } = props;

  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files;
    if (newFile && isValidInputFiles(newFile)) {
      connectUploadCloud(newFile, e);
    }else{
        getMsg("Tệp không hợp lệ", "errorDropFile", true);
    }
  };

  const isValidInputFiles = (files) => {
    var flag = true;
    if (files) {
      for (var i = 0; i < files.length; i++) {
        if (
          files[i].type !== "application/pdf" &&
          files[i].type !== "image/png" &&
          files[i].type !== "image/jpeg"
        ) {
          flag = false;
        }
      }
    }

    return flag;
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage - 10);
    },
  };

  const connectUploadCloud = async (imageFile, event) => {
    setProgress(1);
    const formData = new FormData();
    for (let i = 0; i < imageFile.length; i++) {
      formData.append("file", imageFile[i]);
    }
    await imageApi
      .uploadImageWithProg(formData, singleFileOptions)
      .then((res) => {
        let arr = [];
        if (Array.isArray(res.data)) {
          arr = res.data;
        } else {
          arr.push({ url: res.data.url });
        }
        setProgress(100);
        onFileChangeURL(arr, event);
        setProgress(0);
      })
      .catch((e) => {
        setProgress(0);
        getMsg("Thử lại", "errorDropFile", true);
      });
  };

  const handleDelete = () => {
    setProgress(0);
    onDelete();
  };

  if (image !== null && progress === 0) {
    return (
      <>
        <Box display="flex" justifyContent="flex-end">
          <Tooltip title="Delete all">
            <IconButton
              aria-label="fileuploan"
              component="span"
              size="medium"
              onClick={handleDelete}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <label htmlFor="add-more">
            <input
              multiple
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              id="add-more"
              name="MORE"
              onChange={onFileDrop}
              hidden
            />
            <Tooltip title="Add more">
              <IconButton
                aria-label="fileuploan"
                component="span"
                size="medium"
              >
                <FileUploadIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </label>
        </Box>
      </>
    );
  } else {
    return (
      <>
        {progress === 100 ? (
          <>
            <Box display="flex" justifyContent="flex-end">
              <Tooltip title="Delete all">
                <IconButton
                  aria-label="fileuploan"
                  component="span"
                  size="medium"
                  onClick={handleDelete}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <label htmlFor="add-more">
                <input
                  multiple
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  id="add-more"
                  name="MORE"
                  onChange={onFileDrop}
                  hidden
                />
                <Tooltip title="Add more">
                  <IconButton
                    aria-label="fileuploan"
                    component="span"
                    size="medium"
                  >
                    <FileUploadIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </label>
            </Box>
          </>
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
              id="add"
              name="ADD"
              onChange={onFileDrop}
            />
          </div>
        ) : (
          <Box display="flex" flexDirection="column">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "300px",
                marginTop: "1rem",
                backgroundColor: "#fbfbfa",
              }}
            >
              <Box
                sx={{
                  width: "100%",
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
    );
  }
};

export default DropFileZone;