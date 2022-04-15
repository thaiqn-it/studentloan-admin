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

export const DeleteDialog = (props) => {
  const majorId = props.majorId

  return (
    <Dialog open={true} onClose={props.onClose}>
      <DialogTitle>Xác nhận xóa ?</DialogTitle>
      <DialogActions>
        <Button color="error" endIcon={<CloseIcon />} onClick={props.onClose}>Hủy</Button>
        <Button
          endIcon={<CheckIcon />}
          onClick={() => {
            majorApi.update(majorId ,{
                status : 'INACTIVE'
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
