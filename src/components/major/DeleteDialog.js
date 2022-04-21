import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { majorApi } from "../../apis/major";
import { schoolMajorApi } from "../../apis/schoolmajorApi";
import { SCHOOLMAJOR_STATUS, SCHOOL_STATUS } from "../../constants/enum";

export const DeleteDialog = (props) => {
  const {majorDelete} = props
  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Xác nhận xóa ?</DialogTitle>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          onClick={() => {
            schoolMajorApi.update(majorDelete.id,{
                status : SCHOOLMAJOR_STATUS.INACTIVE
            }).finally(props.onClose)
          }
          }
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};
